<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Stargazers][stars-shield]][stars-url]
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
    A web application to reflect on your daily emotions.
    </br>
    <a href="https://emu-ecru.vercel.app/">View Demo</a>
  </p>
    </br>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li>
        <a href="#learning-outcomes">Learning Outcomes</a>
        <ul>
        <li><a href="#notes">Dataflow and File Structure</a></li>
      </ul>
    </li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#preview">Preview</a></li>
    <li>
      <a href="#contributors">Contributors</a></li>
      <ul>
        <li><a href="#reviewed-by">Reviewed By</a></li>
      </ul>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
</br>

<!-- ******************************************************** OVERVIEW ************************************************* -->

<h2 id="overview">🌐 Overview</h2>

<p>The <a href="https://ritakenji.github.io/emu/">EMU App</a> is designed for users to track, analyse, and reflect on their emotional states over time. It facilitates personal emotional awareness and can be used in therapeutic settings or for individual self-reflection.
</p>
<p>This application, built by Anna Schemmel, Britta Maier and Rita Macedo, is the final project of the Web-Development bootcamp, also known as Capstone Project. The main goal of this project was to show all the learned skills and technologies taught during the Frontend Web-Development bootcamp at Neuefische.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** FEATURES ************************************************* -->

<h2 id="features">🧩 Features</h2>

EMU app is optimized for mobile screen, but because responsive CSS design has been applied, it is possible to view and interact with the app without any issues, from any size of device (mobile, tablet, laptop or desktop).

</br>
<div align="center">
  <a href="https://emu-ecru.vercel.app/">
    <img src="assets/mobile-preview.jpg" alt="mobile preview">
  </a>
</div>
</br>

- Located on the bottom of the viewport, the Navigation Bar allows the user to intuitively explore the app and locate themselves within it.

- 🏠 **Home Page**: Browse a well-organised collection of emotion entries.

  - The collection is ordered chronologically with the newest entries starting from the top.
  - Each emotion entry shows the date and time it was created on, the emotions felt in that moment and their intensity.
  - Emotion types are visually distinct, using different colours to differentiate them.
  - A heart icon is present on each entry, which makes it possible for the user to toggle the entry's bookmark state.
  - The user can easily filter entries based on an emotion.
  - If collection is empty, user will be prompted to add some via Create Page.

- 📊 **Details Page**: View detailed information on each emotion entry.

  - User is directed to ths page by clickling on a single entry, either on Homepage or Bookmarks page.
  - Each entry details page shows:
    - Date and time (as entry's title)
    - Emotion types
    - Emotion intensity
    - Notes
  - The user has the options to edit or delete the entry.
  - Clicking either option prompts a pop-up window allowing user to make the change (update/delete), as well as cancel the action.

- ➕ **Create Page**: Add new emotion entries, enriching the emotion catalogue.

  - The main feature of this page is the form, with the inputs:
    - Date and time (mandatory)
    - Emotion types (mandatory)
    - Emotion intensity (mandatory)
    - Notes
  - Date and time field is pre-set to show date and time format as DD-MM-YYYY, --:--, but adjustable by the user.
  - The emotions are selected from the existing emotions list via a checkbox.
  - The emotion intensity is selectable on a scale of 1 to 10.
  - Form submission with any empty mandatory fields is blocked, and clear validation messages indicate the fields that need completion.
  - Upon submission, the new emotion entry is added to the top of the emotion entries list.

- 🔖 **Bookmarks Page**: Save and showcase favourite emotion entries.
  - User can find all bookmarked entries in this page.
  - If there are no bookmarked emotion entries in the bookmarked list, a message is displayed to the user indicating that there are no bookmarks.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** LEARNING OUTCOMES ************************************************* -->

<h2 id="learning-outcomes">🧠 Learning Outcomes</h2>

- Using correct **HTML semantics** to structure the page and make it more accessible to anyone visiting it.
- Becoming familiarized with the **Agile methodology framework** for project management, specifically the **SCRUM** method.
- Applying basic **UX/UI principles** (hierarchy, consistency, contrast, etc) to the design of the application to achieve not only aesthetically pleasing, but also excellent accessibility for all users.
- Learned to **read, understand and review code of others**, strengthening our problem solving and attention to detail skills.
- Practicing and implementing the **DRY (Don’t Repeat Yourself) principle** as a refactoring method. We learned to reduce the repetition of code patterns, promoting reusability and maintainability, therefore creating more efficient, readable, and error-free code.
- Developed stronger problem solving skills by practicing understanding each tasks’ requirements, discussing potential different approaches, deciding on a final approach and doing **dry runs** before jumping straight to code.
- Learned how to present and keep our work in structured and understandable ways by using the right terminologies for naming and refering, creating concise file structures and dataflows.
- Practicing **Test-Driven Development (TDD) and component testing** to catch bugs early, make requirements clearer before writing code, and safely update complex features with confidence.
- Applying the **principles of The Testing Trophy** to structure our testing strategy, prioritizing highly reliable and quick integration and unit tests over slower end-to-end tests, which led to faster development cycles.
- Gained clarity on **Testing Classifications** (Unit, Integration, End-to-End, etc.) to ensure we selected the right type of test for validating every specific part and function of the application.
- Designing and building a scalable **backend architecture** on MongoDB.
- Mastering the fundamental **Create, Read, Update, Delete (CRUD) operations** to manage resources efficiently and enable seamless communication between the client and server.
- Using the **Next.js framework** to make the app fast by pre-rendering pages (SSR/SSG), and using its simple file structure to manage all the different web addresses (routing).
- Mastering the **React component model** to build reusable UI elements, which significantly improved development speed and made the frontend application much easier to maintain.
- Setting up **dynamic routing** to create clean URLs that automatically load different content (like a unique user profile or product page) based on the address.
- Effectively **managing application state** using React hooks (like useState and useLocalStorage), ensuring the UI remains reactive and synchronized with underlying data changes across different components.

<h3 id="notes">📁 Dataflow and File Structure</h3>
<p>[insert excalidraws here]</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** TECHNOLOGIES *************************************************  -->

<h2 id="technologies">💻 Technologies</h2>

<p>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="assets/html.png" alt="HTML logo"></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="assets/css.png" alt="CSS logo"></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="assets/JS.png" alt="JavaScript logo"></a>
    <a href="https://nodejs.org/" target="_blank"><img src="assets/nodejs.png" alt="NodeJS logo"></a>
    <a href="https://react.dev/" target="_blank"><img src="assets/react.png" alt="React logo"></a>
    <a href="https://nextjs.org/" target="_blank"><img src="assets/nextjs.png" alt="NextJS logo"></a>
    <a href="https://jestjs.io/" target="_blank"><img src="assets/jest.png" alt="Jest logo"></a>
    <a href="https://www.mongodb.com/" target="_blank"><img src="assets/mongo.png" alt="MongoDB logo"></a>
    <a href="https://www.figma.com/" target="_blank"><img src="assets/figma.png" alt="Figma logo"></a>
</p>
<p>✨ HTML ✨ CSS ✨ JavaScript ✨ Node.js ✨ React ✨ Next.js ✨ Jest ✨ MongoDB ✨ Figma ✨</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** PREVIEW ************************************************* -->
<h2 id="preview">🔍 Preview</h2>
<p>[Insert screenshots or a GIF of your application in action, this should include not just the "happy path" but edge cases as well (what happens when there's an error? Etc). Remember to add clear titles for each image.]</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** CONTRIBUTORS ************************************************* -->

<h2 id="contributors">👥 Contributors</h2>

<a href="https://github.com/ritakenji/emu/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ritakenji/emu" />
</a>

<h3 id="reviewed-by">✅ Reviewed By</h3>

<a href="https://github.com/EsraaQandel">
  <img width="55" height="55"src="https://github.com/EsraaQandel.png"></a>
<a href="https://github.com/Klausstille">
  <img width="55" height="55"src="https://github.com/Klausstille.png"></a>
<a href="https://github.com/F-Kirchhoff">
  <img width="55" height="55"src="https://github.com/F-Kirchhoff.png"></a>
<a href="https://github.com/roland-hufnagel">
  <img width="55" height="55"src="https://github.com/roland-hufnagel.png"></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ******************************************************** ACKNOWLEDGEMENTS *************************************************
 -->

<h2 id="acknowledgments">🏅 Acknowledgments</h2>

This space lists resources we found helpful in the creation and development of this project, to which we would like to give credit to.

- [Othneildrewb's README template](https://github.com/othneildrew/Best-README-Template#readme)
- [Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Shields.io](https://shields.io)
- [Lucide Icons](https://lucide.dev/icons)
- [Icons 8](https://icons8.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Web Active Learning Neuefisch](https://web-active-learning.vercel.app/documents/css-responsive)
- [Contrib.rocks](https://contrib.rocks/)
- [Excalidraw](https://excalidraw.com/)
- [VSCode](https://code.visualstudio.com/)
- [Gemni](https://gemini.google.com/app)
- [ChatGPT](https://chatgpt.com)
- [MDN](https://developer.mozilla.org/de/)
- [W3schools](https://www.w3schools.com/)
- [FreeCodeCamp](https://www.freecodecamp.org/learn)
- [NPM packages:](https://www.npmjs.com/)
  - [eslint](https://www.npmjs.com/package/eslint)
  - [lucide-react](https://www.npmjs.com/package/lucide-react)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [vercel](https://www.npmjs.com/package/vercel)
  - among others

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
