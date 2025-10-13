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
    color: var(--color-dark);
    font-family: "Inter", sans-serif;
  }

  /* ---------------------theme colours---------------------- */

  :root {
    --main-bg-color: #EEF2FC;

    --color-primary: #4363ED;
    --color-primary-lighter: color-mix(in oklab, var(--color-primary), white 65%);
    --color-primary-darker: color-mix(in oklab, var(--color-primary), black 60%);

    --color-secondary: #DF0052;
    --color-secondary-lighter: color-mix(in oklab, var(--color-secondary), white 65%);
    --color-secondary-darker: color-mix(in oklab, var(--color-secondary), black 60%);

    --color-light: #EEF2FC;
    --color-dark: #12256E;
    --color-medium: #9C9C9C;

    --color-anger: #FFDFD9;
    --color-anger-dark: #E14700;

    --color-contempt: #FFF4AF;
    --color-contempt-dark: #8A6500;

    --color-disgust: #C1EBC5;
    --color-disgust-dark: #0E6E30;

    --color-fear: #D5D7FF;
    --color-fear-dark: ##4815CA;

    --color-sadness: #CCE8FF;
    --color-sadness-dark: #0041BA;

    --color-surprise: #FFE9BD;
    --color-surprise-dark: #DC6700;

    --color-enjoyment: #FFD9F4;
    --color-enjoyment-dark: #DF0052;


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



  /* ---------------------typo---------------------- */
  
  
  
  h1{
    font-family: "Jost", sans-serif;
    font-weight: 400;
     font-size: 24px;
    color: var(--color-dark);
  }
  
  h2 {
    font-family: "Jost", sans-serif;
    font-weight: 400;
    font-size: 32px;
    color: var(--color-dark);
  }
  
  h3 {
    font-size: 18px;
    color: var(--color-dark);
  }
  h2 {
    font-family: "Jost", sans-serif;
    font-size: 16px;
    color: var(--color-primary);
  }
`;
