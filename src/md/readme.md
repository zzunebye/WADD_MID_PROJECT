# WADD - Mid Project

## 


# Requirement
## What Features and Contents?
The webpage should able to deliver the blog articles of mine and some productivity features. This requires use of local storage.

## Feature List (Not all of them implemented)
#### UI
-   [x] Title
-   [x] In-App Navigation

#### Contents
-   [ ] Profile Picture
-   [ ] Introduction of myself
-   [ ] Contacts
-   [ ] resume
-   [ ] My blog posts - Markdown?

#### Productivity    
-   [ ] Task Management

#### Misc
-   [ ] Responsive web & Adapt to different viewport
-   [ ] Animation
-   [ ] Grid

# Design Logics
어떤 구조로 웹페이지를 만들 것인가?
    -   프론트엔드 단에서 웹페이지를 구성할때 크게 세가지 방식으로 디자인할 수 있다. 정적 페이지, 동적 페이지, 그리고 SPA
    -   [[SPA]]는 SIngle Page Application이라는 뜻으로, 한 html 페이지에서만 작동하는 웹페이지, 혹은 웹 어플리케이션이다. 한 html에서 모든 콘텐츠를 보여준다는 것은 반대로 다른 페이지를 load할 필요가 없다는 것이다. 서버와 데이터를 주고 받을 필요가 있을때는 전체 페이지가 아닌 데이터만 주고받는다.
        -   특히 웹사이트가 하나의 프로덕트를 다루고 있다면, SPA만큼 이를 컨텐츠로서 잘 전달할 수 있는 것은 없을 것이다. 반대로 포커스를 해야하는 여러 프로덕트들이 있다면, multi-page application이 이를 분산해 전달하며 각각의 제품에 포커싱하기 더 좋을 것이다.
        -   대표적인 SPA로 Gmail, Google Maps, Facebook, Trello 등이 있다.
        -   장점:: 콘텐츠를 화려하게 보여줄 수 있으며, 한 번에 미리 모든 콘텐츠를 로드해두기 때문에 유저가 navigating 하기에 편하다. Logic의 많은 부분을 서버가 아닌 웹브라우저가 하기에 트래픽이 상대적으로 적게 발생하는 기능/컨텐츠의 경우 속도가 빠르다. 또한 모바일 앱으로 이행하기에 편하다.
        -   단점:: SEO에 빈약한 모습을 보여주며, cross-site scripting등 보안과 관련해서는 덜 안전하다.
        -   SPA를 만드는데 필요한 기술들:
            -   [[AJAX]]는 사용자가 눈치채지 못하는 사이에 서버와 데이터를 주고받게 한며, 이 데이터는 필요할때 re-render한다.
            -   SPA의 벡엔드 로직을 위해 node.js, PHP와 관련 프레임워크를 많이 사용한다.
            -   DB로는 MySQL, MongoDB, 혹은 원하는 기술을 사용해도 좋다.
        -   What is the **workflow to follow for building** \[\[SPA\]\]?
            1.  list down the feature and functions you need in your web app
                -   어떤 기능을 넣을 것인가? 웹사이트가 graphics 중심인가 contents 중심인가? 아니면 둘 다 초점을 맞추나? 그럴 경우 어떻게 적절하게 그래픽과 컨텐츠를 배치할 것인가?
            2.  Choose which stack to build the website
            3.  Navigatable vs Internal State
                -   ![](https://blog.pshrmn.com/static/img/how-single-page-applications-work/url-parts.png)
                -   > Only three of the location object’s properties are important for an SPA: pathname, hash, and search (commonly called a query string)
                -   > Single-page application generally rely on a router. Routers are made up of routes, which describe the location that they should match. These can be static (/about) or dynamic (/album/:id, where the value of :id can be any number of possibilities) paths. The [path-to-regexp](https://github.com/pillarjs/path-to-regexp) package is a very popular solution for creating these paths.


# Logs
2021-02-19
- Sidebar 기초 완성
- 어떻게 JS 코드를 그리드 구조와 매칭시킬 것인가?
	- 우선 그리드에 컨텐츠가 들어갈 영역마다 특정한 id을 지정한다.
		- 

		