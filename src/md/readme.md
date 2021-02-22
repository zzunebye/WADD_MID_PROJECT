# WADD - Mid Project

# Requirement
## What Features and Contents?
The webpage should able to deliver the blog articles of mine and some productivity features. This requires use of local storage.

## Feature List (Not all of them implemented)
#### UI
-   [x] Title
-   [x] In-App Navigation

#### Contents
-   [x] Profile Picture
-   [x] Introduction of myself
-   [x] Contacts (Social Network)
-   [x] resume (or portfolio?)
-   [x] My blog posts - Markdown?

#### Productivity    
-   [x] Task Management

#### Misc
-   [x] Responsive web & Adapt to different viewport
-   [x] Animation
-   [x] Grid

## Wireframe of the website

![image info](./img/wireframe.png)

# Design Logics
## How am I going to build - SPA
SPA means Single Page Application, which refers to the web page or application that performs all the front-end logic in one html page. This means that there is no redirection occurs to show the content because the client fetches all the necessary data at the first request. When the client need additional data to update the components or content on the view, it just request json files to the server and update the view using JavaScript.
- Especially, if a website deals with a single product, nothing can deliver it as well as SPA. Conversely, if there are multiple products that need to be focused, a multi-page application distributes them and it will be better to focus on each product.
- The examples of SPAs include Gmail, Google Maps, Facebook, and Trello.
- Pros:: Content can be displayed colorfully, and it is convenient for users to navigate because all content is loaded in advance at once. Because a web browser does a lot of logic, not a server, the speed of the function/content that generates relatively little traffic, is fast. It is also easy to make transition to a mobile app.
- Cons:: Shows poor SEO ,and is less secure when it comes to security, such as cross-site scripting.
### Skills required to create an SPA:
 - [AJAX] allows the user to exchange data with the server without noticing it, and this data is re-rendered when necessary. In this project, I will use `fetch()` function of JS.
 - Node.js, PHP and related frameworks are used a lot for SPA backend logic. However, this project doesn't include server-side rendering.
 - For DB, you can use MySQL, MongoDB, or any technology you want.
## Stacks and Dependency
1. HTML
2. CSS
	1. Font Awesome
3. JS
	1. Marked - library to render markdown file/script
4. Miscellaneous
	1. I used Github Pages to host the page. For hosting the SPA application in Github, I referenced https://github.com/rafgraph/spa-github-pages.

## Designs
-   **HTML**
	-   DOM structure is based on the wireframe, where the vertical nav is located at the left side of the webpage.
-   **CSS**
	-   Using CSS Selector, all DOM elements except the main page(ReadMe) are hide as default.
	-   **CSS Selector + JS** can modify the `display:none` to `display:block`
-   **JS**
    -   When user clicks a link to a different page of the website, JS performs a logic to modify the contents on viewport. Thus, there are no acutal routing happening.
-   Others
	-   The Articles and Travel Note page display their content using `Grid`. 
	
## Logs & What I've Learned

2021-02-18
-   CSS position -> Decides on how to move the element based on the parents or window's position.
-   In the case of `display: block`, line breaks occur before and after the element. It can be seen as the exact opposite.
-   'display: Grid' is similar to Flex, but it is an extended concept. If Flex is one-dimensional, grid is two-dimensional.

2021-02-19
- Sidebar version 1 is finished

2021-02-20
- Modifying Article Page:
	-  All the cards in the grid is using the Unsplash API to fetch random image related to the topic, but the fetched images for each card (article) is same. 
	-  This is because the browser request the fetch in a batch at once. To fix this issue, I included pseudo-random number in the fetching address. i.e. `'https://source.unsplash.com/random?${article.about}?sig=${rand}'`
- Sidebar Issue addressed
	- part of the text (`<a>`) highlighted when the sidebar is hovered.
		- <a> was set to be have background color of #fff on hovering. It is disabled now
	- picture card being covers the sidebar when both objects are being hovered.
		- Added z-index to the Sidebar to have higher priority in the viewport.
	- Changed the Background color of the `body` with the css color setting from https://uigradients.com/#eXpresso.


		