import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


/* ---------------------global styling---------------------- */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  

  body {
    margin: 0;
    font-family: system-ui;
    padding: 4rem 1.5rem;
  }

  /* ---------------------theme colours---------------------- */

  :root {
    --main-bg-color: #fff;

    --color-primary: #0c2faf;
    --color-primary-lighter: color-mix(in oklab, var(--color-primary), white 65%);
    --color-primary-darker: color-mix(in oklab, var(--color-primary), black 60%);

    --color-secondary: #64f1ab;
    --color-secondary-lighter: color-mix(in oklab, var(--color-secondary), white 65%);
    --color-secondary-darker: color-mix(in oklab, var(--color-secondary), black 60%);

    --color-light: #eaeaea;
    --color-dark: #373842ff;
    --color-medium: #9da0bfff;

    --color-anger: #ff8282;
    --color-contempt: #cd97fc;
    --color-disgust: #cbfc97;
    --color-fear: #bffff9;
    --color-sadness: #849cb5;
    --color-surprise: #fffa7f;
    --color-enjoyment: #ffb27f;


  }




  /* ---------------------emotion colours---------------------- */

  .anger {
    background-color: var(--color-anger);
  }

  .contempt {
    background-color: var(--color-contempt)
  } 
  
  .disgust {
    background-color: var(--color-disgust)
  }
  
  .fear {
    background-color: var(--color-fear)
  }

  .sadness {
    background-color: var(--color-sadness)
  }

  .surprise {
    background-color: var(--color-surprise)
  }

  .enjoyment {
    background-color: var(--color-enjoyment)
  }


`;
