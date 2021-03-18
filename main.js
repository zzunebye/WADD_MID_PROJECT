/* -------------------------------------------------------------------------- */
/*                                 Dependency                                 */
/* -------------------------------------------------------------------------- */

// import { LoremIpsum } from "lorem-ipsum";
// import fs from 'fs';
// const fs = require('fs')

// import marked from "marked";

/* -------------------------------------------------------------------------- */
/*                         define an object structure                         */
/* -------------------------------------------------------------------------- */

// Define html element references
// `{}` => Object Initializer로 여기서는 PAGES라는 객체를 생성함.
// 여기서 각 오브젝트 프로퍼티는 해당 콘텐츠를 insert할 공간(요소)의 id를 담는다.
PAGES = {};

PAGES.loading = {};
PAGES.loading.page = document.querySelector(".loader");

// Main page - Readme
PAGES.readme = {};
PAGES.readme.page = document.querySelector("#readme");
PAGES.readme.content = document.querySelector("#readme-page");
PAGES.readme.title = document.querySelector("#readme-head");
PAGES.readme.article = document.querySelector("#readme-content");

// Main page (Grid of articles)
PAGES.articles = {};
PAGES.articles.page = document.querySelector("#articleList");
PAGES.articles.grid = document.querySelector("#grid-blog");
PAGES.articles.content = document.querySelector("#grid-content-page");
PAGES.articles.title = document.querySelector("#article-head");
PAGES.articles.article = document.querySelector("#article-content");
PAGES.articles.cards = document.getElementsByClassName("card");
PAGES.articles.fetched;
PAGES.articles.images = document.querySelectorAll('img') ;

// Some other page
PAGES.portfolio = {};
PAGES.portfolio.page = document.querySelector("#portfolioPage");
PAGES.portfolio.content = document.querySelector("#tollstations");

PAGES.travel = {};
PAGES.travel.page = document.querySelector("#travel");;
PAGES.travel.cards = document.querySelector("#travel-cards");;

PAGES.tasks = {};
PAGES.tasks.page = document.querySelector("#tasks");
PAGES.tasks.cards = document.querySelector("#tasks-cards");

PAGES.about = {};
PAGES.about.page = document.querySelector("#about");
PAGES.about.profile = document.querySelector("#profile");
PAGES.about.picname = document.querySelector("#pic-name");
PAGES.about.bio = document.querySelector("#biography");


// 404 error page
PAGES.page404 = {};
PAGES.page404.page = document.querySelector("#page404");
PAGES.page404.error = document.querySelector("#page404-error");

// practice
PAGES.practice = {};
PAGES.practice.page = document.querySelector("#practice");
PAGES.practice.practice = document.querySelector("#markdownprac");
// PAGES.practice.content = document.querySelector("#");


/* -------------------------------------------------------------------------- */
/*                          Custom code for each page                         */
/* -------------------------------------------------------------------------- */

// Code to run for each page -> 각 페이지(PAGES 프로퍼티) 마다 고유의 추가 컨텐츠를 가지며, 이를 로딩하는 '코드'들을 담는 오브젝트를 선언한다.
pageFunctions = {};

// Custom code to run when showing the 404 page
pageFunctions.page404 = function () {
  PAGES.page404.error.innerHTML = `Page ${location.hash.substr(1)} not found!`;
};


/* ------------------------- Adding dynamic content ------------------------- */

// To add some dynamic content to the page, we create a new custom function for the page "toll" and add a REST call.
// fetch를 이용해 데이터를 불러온 후,tollInfo()를 실행한다.


pageFunctions.readme = function () {
  // fetch("https://602f9901a1e9d20017af097d.mockapi.io/WADD/v1/articles")


  fetch(`./src/md/readme.md`).then(function (response) {
    // The API call was successful!
    return response.text();
  }).then(function (html) {
    // This is the HTML from our response as a text string
    // console.log(content.title);
    PAGES.readme.title.innerHTML = marked(html);

  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  // hideLoader();
}

pageFunctions.articles = function () {
  // fetch("https://602f9901a1e9d20017af097d.mockapi.io/WADD/v1/articles")
  // document.querySelector('#backBtArticle').classList.add('blur');

  fetch("./src/articles.json")
    .then(response => response.json())
    .then(json => {
      console.log(json);
      
      PAGES.articles.fetched = json;
      PAGES.articles.grid.innerHTML = json.reduce((acc, articles) => {
        return (acc += createArticles(articles));
      }, "");
      // const article_list = json.map((article) => {
        //   return (PAGES.articles.grid.appendChild(createArticles(articles)));
        // }, "");
        // PAGES.articles.grid.appendChild(article_list)
        // hideLoader();
    });
}

function createArticles(article) { // HTML을 생성하는 함수
  let rand = getRandomInt(6);
  let rand2 = getRandomInt(100000);
  if (rand < 4) {
    return `
      <div class="card" style="
                    background-image: url('https://source.unsplash.com/random?${article.about}?sig=${rand2}');
                  " id="${article.id}" onclick="open_article(this.id)">
                <span class="card-title">${article.title}</span>
              </div>
        `;
  } else if (rand == 4) {
    return `
      <div class="card card-tall" style="
                    background-image: url('https://source.unsplash.com/random?${article.about}?sig=${rand2}');
                  " id="${article.id}" onclick="open_article(this.id)">
                <span class="card-title">${article.title}</span>
              </div>
        `;
  } else {
    return `
      <div class="card card-tall card-wide" style="
                    background-image: url('https://source.unsplash.com/random?${article.about}?sig=${rand2}');
                  " id="${article.id}" onclick="open_article(this.id)">
                <span class="card-title"">${article.title}</span>
              </div>
        `;
  }
}

function backToArticles() {
  console.log("Back to Article List...");
  document.querySelector('#articles-title').classList.remove('blur');
  document.querySelector('#backBtArticle').classList.add('blur');
  PAGES.articles.grid.classList.remove("blur");
  PAGES.articles.title.classList.add("blur");
  PAGES.articles.article.classList.add("blur");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  // window.scrollTo(0,0);

}

function open_article(id) {

  console.log("Fetching Article...");
  PAGES.articles.title.classList.remove("blur");
  PAGES.articles.article.classList.remove("blur");
  document.querySelector('#backBtArticle').classList.remove('blur');
  document.querySelector('#articles-title').classList.add('blur');
  PAGES.articles.grid.classList.add("blur");
  let content = PAGES.articles.fetched[id - 1];
  PAGES.articles.title.innerHTML = content.title;
  // PAGES.artic

  fetch(`./src/md/${content.title}.md`).then(function (response) {
    // The API call was successful!
    return response.text();
  }).then(function (html) {
    // This is the HTML from our response as a text string
    console.log(content.title);
    PAGES.articles.title.innerHTML =
      marked(html);

  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

pageFunctions.travel = function () {
  console.log("travel page..")
  fetch("https://602f9901a1e9d20017af097d.mockapi.io/WADD/v1/travel")
    .then(response => response.json())
    .then(json => {
      PAGES.travel.cards.innerHTML = json.reduce((acc, place) => {
        return (acc += createTravelCard(place));
      }, "");
      // hideLoader();
    });
}

function createTravelCard(location) {
  return `<div class="travelcard travelcardAnimation">
    <div class="card-inner">
      <div class="card-front">
        <img src="https://source.unsplash.com/random?${location.place}" alt="" />
      </div>
      <div class="card-back">
        <h1>${location.place}</h1>
        <ul>
          <li>
            <strong>Date:</strong> ${location.date}
          </li>
          <li>
            <strong>Accompanided with:</strong> ${location.accompany}
          </li>
          <li>
            <strong>Comment:</strong> ${location.review}
          </li>
        </ul>
      </div>
    </div>
  </div>
  `
}

/* ----------------------------- Task Management ---------------------------- */

let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTasksHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

pageFunctions.tasks = function () {
  console.log("task page..")
  let count_done = 0;
  let count_undone = 0;

  var values = {},
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values[keys[i]] = localStorage.getItem(keys);
    console.log(values[keys[i]]);
    (values[keys[i]] ? count_done++ : count_undone++)
  }
  // console.log(count_done);
  // console.log(count_undone);
  // console.log(values);

  for (const value in values) {
    // if (Object.hasOwnProperty.call(object, value)) {
    //   const element = object[value];

    // }
    console.log(localStorage.getItem(value));
    const newTask = createNewTask(value, localStorage.getItem(value));
    if (localStorage.getItem(value) == 0) {
      incompleteTasksHolder.innerHTML += newTask;

    } else {
      completedTasksHolder.innerHTML += newTask;

    }
  }
  // hideLoader();
}


//New Task List Item
function createNewTask(value, flag) {
  if (flag == 0) {
    return `<li class="travelcard">
    <div class="task-head">
      <input type="checkbox" onchange="checkBoxHandler(this)">
      <label>${value}</label>
    </div>
    <input type="text">
    <div class="task-option">
      <button class="edit" onclick="editTask(this)">Edit</button>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
    </div>
  </li>`
  } else {
    return `<li class="travelcard">
    <div class="task-head">
      <input type="checkbox" onchange="checkBoxHandler(this)" checked>
      <label>${value}</label>
    </div>
    <input type="text">
    <div class="task-option">
      <button class="edit" onclick="editTask(this)">Edit</button>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
    </div>
  </li>`
  }


}

// function addTask

addTask = () => {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  const newTask = createNewTask(taskInput.value, 0);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.innerHTML += newTask;
  // bindTaskEvents(listItem, taskCompleted);

  // let temp = JSON.stringify(newTask.innerHTML);

  // arr = [taskInput.value, 0];
  // console.log(arr);
  localStorage.setItem(`${taskInput.value}`, 0);
  // console.log( localStorage.getItem(`${taskInput.value}`));

  taskInput.value = "";
}

// Edit an existing task
editTask = (obj) => {

  console.log("Edit Task...");

  let listItem = obj.parentNode.parentNode;

  let editInput = listItem.querySelector("input[type=text]")
  let label = listItem.querySelector("label");

  //if the class of the parent is .editMode 
  if (listItem.classList.contains("editMode")) {
    //switch from .editMode 
    //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }

  // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");

}


// Delete an existing task
deleteTask = (obj) => {
  console.log("Delete task...");
  let listItem = obj.parentNode.parentNode;
  let ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
  let temp = listItem.querySelector("label").innerHTML;
  // console.log(temp);
  console.log(localStorage.getItem(`${temp}`));
  localStorage.removeItem(`${temp}`);
}

// Mark a task as complete 
taskCompleted = (obj) => {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  let listItem = obj.parentNode.parentNode;

  completedTasksHolder.appendChild(listItem);
  listItem.classList.add("checked");
  let temp = listItem.querySelector("label").innerHTML;
  console.log("complete: ", temp);
  // console.log("complete: ", localStorage.getItem(`${temp}`));

  // arr = [temp, 1];
  // console.log(arr);
  localStorage.setItem(`${temp}`, JSON.stringify(1));
  // console.log( localStorage.getItem(`${taskInput.value}`));

}

// Mark a task as incomplete
taskIncomplete = (obj) => {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  let listItem = obj.parentNode.parentNode;
  let temp = listItem.querySelector("label").innerHTML;

  // arr = [temp, 0];
  localStorage.setItem(`${temp}`, JSON.stringify(0));

  incompleteTasksHolder.appendChild(listItem);
  listItem.classList.remove("checked");

}

checkBoxHandler = (obj) => {
  if (obj.checked) {
    taskCompleted(obj);
  } else {
    taskIncomplete(obj);
  }
}

/* -------------------------------- practice -------------------------------- */

pageFunctions.portfolio = function () {
  fetch("./src/projects.json")
    .then(response => response.json())
    .then(json => {
      console.log(json);
      PAGES.portfolio.content.innerHTML = json.reduce((acc, toll) => {
        return (acc += tollInfo(toll));
      }, "");
    });
};

function tollInfo(toll) { // HTML을 생성하는 함수
  return `
  <div class="toll tollanimation">
  <h2>${toll.title}</h2>
  <h4 id="">About: ${toll.about}</h4>
  <div id="p_a">
    <p>${toll.text}</p>
    <a href="${toll.link}">Link</a>
    
  </div>
  </div>
  `;
}


function delayElems(item, index) {
  console.log(item);
  item.style.animationDelay = 0.31*(1+index) +'s'
  // item.sheet.insertRule('# {color: darkseagreen}');
}

document.querySelectorAll("#tollStations.toll").forEach(delayElems)
console.log(document.querySelectorAll("#tollStations.toll"));

// document.querySelectorAll() fruits.forEach(myFunction);


/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

var path;

function unhideLoader() {
  document.querySelector('.loader-wrapper').classList.remove('blur')
  // document.querySelector('.loader-wrapper').style.zIndex = 5
}

function hideLoader() {
  document.querySelector('.loader-wrapper').classList.add('blur')
  document.querySelector('.loader-wrapper').style.zIndex = 0
}

function name(params) {
  
}


// Navigation
function navigate() {

  path = location.hash
    .substr(1)
    .toLowerCase()
    .split("/");

  // Find what page to show
  var currentPage = path[0];
  if (!PAGES.hasOwnProperty(currentPage)) {
    if (path[0] === "") {
      currentPage = "readme";
    } else {
      currentPage = "page404";
    }
  }

  // Hide the previous active page
  for (var page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove("active");
    }
  }

  // Show the active page and run its custom script
  PAGES[currentPage].page.classList.add("active");

  // currentPage와 동일한 이름을 가지는 코드가 pageFunctions에 있는 경우 이를 실행한다.
  if (pageFunctions.hasOwnProperty(currentPage)) {
    pageFunctions[currentPage]();
  }
  hideLoader();

}

/* -------------------------------------------------------------------------- */
/*                               Main Execution                               */
/* -------------------------------------------------------------------------- */


window.setTimeout(function () {
  hideLoader()
}, 1500);

// First time loading the page
navigate();

// By using the function window.onhashchange, we can detect when the hash in the URL changes. Combining this with anchors, and we have a way detect when we should changing the content of the SPA.
window.addEventListener("hashchange", function () {
  // unhideLoader();
  navigate();
});
window.onbeforeunload = function() { window.scrollTo(0,0); }


// 페이지가 로딩될때 생성된 PAGES를 출력한다.
console.log(PAGES);