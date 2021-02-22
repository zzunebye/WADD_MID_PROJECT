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


// Main page - Readme
PAGES.readme = {};
PAGES.readme.page = document.querySelector("#readme");
PAGES.readme.content = document.querySelector("#readme-page");
PAGES.readme.title = document.querySelector("#readme-head");
PAGES.readme.article = document.querySelector("#readme-content");

// Main page (Grid of articles)
PAGES.articles = {};
PAGES.articles.page = document.querySelector("#articles");
PAGES.articles.grid = document.querySelector("#grid-blog");
PAGES.articles.content = document.querySelector("#grid-content-page");
PAGES.articles.title = document.querySelector("#article-head");
PAGES.articles.article = document.querySelector("#article-content");
PAGES.articles.cards = document.getElementsByClassName("card");
PAGES.articles.fetched;

// Some other page
PAGES.portfolio = {};
PAGES.portfolio.page = document.querySelector("#portfolio");
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




  // const url = `https://602f9901a1e9d20017af097d.mockapi.io/WADD/v1/articles/${id}`
  // fetch(url)
  // .then(response => response.json())
  // .then(json => {
  //     // console.log(PAGES.articles.fetched[id-1].title);
  //     // console.log(json)
  //     // PAGES.articles.content.classList.add("active");
  //     PAGES.articles.title.innerHTML = `${json.title}`
  //     PAGES.articles.article.innerHTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus nulla ut ante tincidunt, vel cursus dolor luctus. Etiam semper, turpis non tristique varius, velit odio feugiat nisi, ut dignissim ante ligula vitae urna. Sed id cursus libero. Vivamus eget risus commodo, volutpat nisi eget, varius mauris. Pellentesque finibus dictum nunc, sit amet ultricies turpis mattis congue. Maecenas id convallis magna, sit amet tincidunt est. Sed a risus vehicula, sodales arcu euismod, porta neque. Aliquam vulputate, erat quis finibus sagittis, tellus augue molestie metus, sed auctor leo nulla vel libero. Nunc ante arcu, congue non nibh ac, gravida pellentesque turpis. Praesent velit magna, porttitor eu gravida non, bibendum nec lectus. Suspendisse feugiat ullamcorper risus, ac tempor lacus rhoncus sit amet. Nunc vel suscipit erat. Maecenas condimentum tempor erat eget dignissim. Nunc vehicula, tortor eu sollicitudin commodo, diam ligula hendrerit neque, sit amet hendrerit mauris magna nec enim. In hac habitasse platea dictumst. Sed nibh nulla, euismod vel vestibulum a, commodo non diam.

  //   Vestibulum sit amet lacus at enim scelerisque pharetra eget in nunc. Etiam in porttitor arcu. Praesent eu hendrerit turpis. Sed semper diam lectus, eleifend rhoncus tellus condimentum ultrices. Morbi aliquam velit tristique, gravida nisi ut, cursus mauris. Aenean congue, lacus commodo pulvinar convallis, ligula dolor suscipit orci, in iaculis arcu eros viverra tortor. Duis nec lobortis metus, vel elementum sem. Donec nec magna id augue tincidunt congue ut tempus augue. Etiam in aliquam neque.

  //   Etiam tempor tristique volutpat. Aenean interdum iaculis mauris et egestas. Vivamus libero sem, faucibus in hendrerit nec, finibus pulvinar erat. In at felis hendrerit magna fringilla scelerisque. Suspendisse potenti. Sed pretium, est eu dignissim fermentum, risus nunc maximus lacus, id accumsan massa risus eget lorem. Nulla vel ex sit amet eros dignissim pellentesque eget ac lacus. Phasellus lorem leo, mollis nec odio aliquet, commodo dictum turpis. Curabitur pellentesque urna non quam hendrerit, ac pulvinar metus varius. Maecenas nec nisi semper diam tempor tincidunt. Aliquam viverra finibus sem, eu dictum velit ultrices a. Mauris sit amet ante porttitor, tempus nulla in, consectetur nisi. Proin suscipit hendrerit quam, vel ullamcorper mauris facilisis non. In eu mollis odio.

  //   Nullam sem lorem, pharetra id nisi ornare, faucibus scelerisque nisl. Suspendisse eu pellentesque lectus, et tincidunt odio. In porttitor vulputate turpis quis fermentum. Nulla mollis vehicula arcu at dapibus. Nam non felis eget mi blandit pellentesque. Sed vel arcu ut eros maximus aliquam. Praesent ac scelerisque magna, ac vehicula lectus. Fusce bibendum, lectus et posuere sollicitudin, turpis dui euismod ante, id dictum urna nisi sit amet ligula. Sed a tortor ex. Pellentesque sagittis tincidunt orci, nec posuere felis faucibus finibus. Maecenas vitae urna dapibus, dapibus est eu, varius velit. Praesent vel porta erat, eu laoreet massa. Duis rhoncus tincidunt suscipit. Aenean pretium, nibh ut aliquam maximus, nulla tellus scelerisque est, a facilisis ipsum sem ac est.

  //   Praesent sit amet nisl eu lacus hendrerit vestibulum at at neque. Nulla vitae tristique metus. Mauris efficitur est ac erat elementum consequat. Ut molestie libero ut ultricies tempor. Sed risus dolor, varius quis ex non, cursus egestas nibh. Aliquam dapibus, eros vitae dapibus sodales, dui libero accumsan nibh, ultrices pharetra urna enim eu lacus. Phasellus euismod, turpis a consectetur varius, velit massa finibus purus, eu malesuada quam ante in augue. Sed non convallis odio. In hac habitasse platea dictumst.
  //   </p>`
  //   });

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
    });
}

function createTravelCard(location) {
  return `<div class="travelcard">
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
  console.log(count_done);
  console.log(count_undone);

  console.log(values);

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
  <div class="toll">
  <h2>${toll.title}</h2>
  <h4 id="">About: ${toll.about}</h4>
  <div id="p_a">
    <p>${toll.text}</p>
    <a href="${toll.link}">Link</a>
    
  </div>
  </div>
  `;
}

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

var path;

// Navigation
function navigate() {
  // Get the url path in a easy (The URL hash is easily accessible through location.hash)
  // => 위에서 선언한 path에 location으로 부터 파싱한 주소를 담는다.
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
}

/* -------------------------------------------------------------------------- */
/*                               Main Execution                               */
/* -------------------------------------------------------------------------- */

// First time loading the page
navigate();

// By using the function window.onhashchange, we can detect when the hash in the URL changes. Combining this with anchors, and we have a way detect when we should changing the content of the SPA.
window.onhashchange = navigate;

// 페이지가 로딩될때 생성된 PAGES를 출력한다.
console.log(PAGES);