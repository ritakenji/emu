<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield1]][linkedin-url1]
[![LinkedIn][linkedin-shield2]][linkedin-url2]
[![LinkedIn][linkedin-shield3]][linkedin-url3]

</br>
<div align="center">
  <a href="https://emu-ecru.vercel.app/">
    <img src="assets/emu-logo.png" alt="Logo">
  </a>

  <h2 align="center">⭐ EMU App ⭐</h2>

  <p align="center">
    A web application designed for users to track, analyse, and reflect on their emotional states over time. It facilitates personal emotional awareness and can be used in therapeutic settings or for individual self-reflection.
    </br>
    <a href="https://emu-ecru.vercel.app/">View Demo</a>
  </p>
    </br>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#learning-outcomes">Learning Outcomes</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
</br>

<!-- ******************************************************** OVERVIEW ************************************************* -->

<h2 id="overview">🌐 Overview</h2>

<p><a href="https://ritakenji.github.io/rita-quizapp/">Rita-quizapp</a> is an ongoing project created as part of the Web-Development Front-End bootcamp's Recap Projects at Neuefische. The main goal of this project is to apply all the learned material taught during the bootcamp's sessions.</p>

<p>In part 1, the task provided was simple: build the layout of a mobile web application (a quiz app) following the required design and behaviour specifications listed.</p>

<p>In part 2, we were tasked to create a whole new page and add interactability to some elements present through the entire application.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wd-bootcamp/web-exercises/refs/heads/main/sessions/recap-project-1/quiz-app/assets/homepage.png" alt="reference-image-1" height=375px width=400px><img src="https://raw.githubusercontent.com/wd-bootcamp/web-exercises/refs/heads/main/sessions/recap-project-2/quiz-app/wireframes/quiz-app-form-page.png" alt="reference-image-1" height=325px width=200px><img src="https://raw.githubusercontent.com/wd-bootcamp/web-exercises/refs/heads/main/sessions/recap-project-1/quiz-app/assets/profilepage.png" alt="reference-image-2" height=375px width=400px>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="notes">📝 Notes</h3>

<p>Part 1 of this project was creating the website's layout using only HTML and CSS. Part 2 was about implementing JavaScript to add interactivity between elements.</p>
<p>❗Some changes may apply from time to time, as this project will be continuously growing throughout the bootcamp to optimize functionality, design and showcase new learning outcomes.❗</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** FEATURES *************************************************

 List the key functionalities and features of your application. What can a user do with it? Think of this as a bullet-point summary of your project's capabilities.

 -->

<h2 id="features">🧩 Features</h2>

The application is optimized for mobile screen, but responsive CSS design has been applied, meaning it can be viewed and interacted without any issues, from any size of device (mobile, tablet, laptop or desktop).

</br>
<div align="center">
  <a href="https://ritakenji.github.io/rita-quizapp/">
    <img src="assets/mobile-preview.png" alt="web-preview">
  </a>
</div>
</br>

It consists of 4 pages:

- 🏠 **Home page**: Here, the user will have access to view all questions available on the platform.
  - Each card will have a question and upon clicking the button, the user unveils the correct answer. It is also possible to hide the answer once revealed, toggling back and forth;
  - By clicking on the bookmark icon, it is possible for the user to bookmark each question of their interest. <!--- which in the future part of the project will be stored in the _Bookmarks page_. --->
- 🔖 **Bookmarks page**: This is a exclusively dedicated space for the user to view the questions they've bookmarked on the homepage.
  <!---- Here the user may not just view, but also remove a card from their saved bookmark selection.--->
- ➕ **Add page**: On this page, the user can create new question cards.
  - These newly created question cards will be displayed on the Add page, below the form;
  - The main feature of this page is the form, consisting of 3 input areas and one button.
- 👤 **Profile page**: This section allows the user to view and manage their profile and settings.
  - '_About Me_' section displays the user's bio;
  - Present on this page are 2 _counters_ - number of questions created and number of saved bookmarks;
  - Last section is '_Settings_', which allows the user to toggle **Dark Mode**.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** LEARNING OUTCOMES *************************************************

 This is a great section to highlight what you've learned. What new concepts did you apply? Did you master a new technology or design principle? This shows off the skills you've gained during the project.

 -->

<h2 id="learning-outcomes">🧠 Learning Outcomes</h2>

- Using correct **HTML semantics** to structure the page and make it more accessible to anyone visiting it;
- Learning how to correctly use the **BEM** method to classify the page's elements;
- Understanding the **CSS box-model**, **flexbox** and **positioning** principles to achieve a clean and **responsive design** that works seamlessly;
- **DOM** (Document Object Model) reading and manipulation.
- Combining HTML with JavaScript via **click**, **change** and **submit** events, in order to trigger actions that allow certain elements to change appearance and others to be created or even fully erased;
- All in all, integrating a wide set of JavaScript **statements**, **expressions**, **methods**, **functions**, and more to: <!-- , as well as data structures such as **arrays** and **objects**; -->
  - **Toggle** styling of elements, text values and **darkmode**;
  - **Submit forms**;
  - **Count** characters in **input fields**;
  - etc.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** TECHNOLOGIES *************************************************

Clearly list all the programming languages and frameworks you used. It's a good idea to include visuals like skill icons to make this section stand out.

 -->

<h2 id="technologies">💻 Technologies</h2>

<p>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/dusk/64/javascript-logo.png" alt="javascript" width="40" height="40"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"> <img src="https://img.icons8.com/dusk/64/css3.png" alt="html-5" width="40" height="40"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"> <img src="https://img.icons8.com/dusk/64/html-5.png" alt="html-5" width="40" height="40"/></a>
</p>
<p>✨ JavaScript ✨ CSS ✨ HTML ✨</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** ACKNOWLEDGEMENTS *************************************************
 -->

<h2 id="acknowledgments">🏅 Acknowledgments</h2>

This space lists resources I found helpful in the creation and development of this project, to which I would like to give credit to.
I am sure anyone could make great use of them for their own projects, especially if just now starting their coding journey!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [Othneildrewb's README template](https://github.com/othneildrew/Best-README-Template#readme)
- [Font Awesome](https://fontawesome.com)
- [Lucide Icons](https://lucide.dev/icons)
- [Icons 8](https://icons8.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Oh Shit Git](https://ohshitgit.com/)
- [Html-Css-Js](https://html-css-js.com/css/generator/box-shadow/)
- [Pokemon Palettes](http://pokepalettes.com/)
- [CSS Gradient](https://cssgradient.io/)
- [Get BEM](https://getbem.com/naming/)
- [CSS Tricks](https://css-tricks.com/guides/)
- [Web Active Learning Neuefisch](https://web-active-learning.vercel.app/documents/css-responsive)
- [Steve Ayo's Functions 101](https://www.steveayo.com/blog/function-declaration-function-expression-arrow-function/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ritakenji/emu.svg?style=for-the-badge
[contributors-url]: https://github.com/ritakenji/emu/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/ritakenji/emu.svg?style=for-the-badge
[stars-url]: https://github.com/ritakenji/emu/stargazers
[issues-shield]: https://img.shields.io/github/issues/ritakenji/emu.svg?style=for-the-badge
[issues-url]: https://github.com/ritakenji/emu/issues
[forks-shield]: https://img.shields.io/github/forks/ritakenji/emu.svg?style=for-the-badge
[forks-url]: https://github.com/ritakenji/emu/forks
<!-- Anna's Linkedin Shields -->
[linkedin-shield1]: https://img.shields.io/badge/-Anna's_LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url1]: https://www.linkedin.com/in/anna-lynn-schemmel/
<!-- Britta's Linkedin Shields -->
[linkedin-shield2]: https://img.shields.io/badge/-Britta's_LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url2]: https://www.linkedin.com/in/britta-maier-38a913236/
<!-- Rita's Linkedin Shields -->
[linkedin-shield3]: https://img.shields.io/badge/-Rita's_LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url3]: https://www.linkedin.com/in/rita-macedo-557864103/

