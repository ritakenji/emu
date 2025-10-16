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
    --color-primary-darker: color-mix(in oklab, var(--color-primary), black 20%);

    --color-secondary: #DF0052;
    --color-secondary-lighter: color-mix(in oklab, var(--color-secondary), white 65%);
    --color-secondary-darker: color-mix(in oklab, var(--color-secondary), black 20s%);

    --color-light: #EEF2FC;
    --color-dark: #12256E;
    --color-medium: #9C9C9C;

    --color-anger: #ffd9d9ff;
    --color-anger-dark: #e10000ff;

    --color-stress: #c6c6c6ff;
    --color-stress-dark: #343434ff;

    --color-disgust: #C1EBC5;
    --color-disgust-dark: #0E6E30;

    --color-fear: #D5D7FF;
    --color-fear-dark: #4815CA;

    --color-sadness: #CCE8FF;
    --color-sadness-dark: #0041BA;

    --color-surprise: #FFE9BD;
    --color-surprise-dark: #cd6000ff;

    --color-enjoyment: #FFD9F4;
    --color-enjoyment-dark: #DF0052;

    --color-confidence: #FFF4AF;
    --color-confidence-dark: #8A6500;


  }




  /* ---------------------emotion colours---------------------- */

  .anger, .frustration, .humiliation, .jealousy {
    background-color: var(--color-anger);
    color: var(--color-anger-dark);
  }

  .tiredness, .stress, .boredom, .overwhelm {
    background-color: var(--color-stress);
    color: var(--color-stress-dark);
  } 
  
  .disgust, .disappointment, .embarrassment, .judgement {
    background-color: var(--color-disgust);
    color: var(--color-disgust-dark);
  }
  
  .fear, .rejection, .insecurity, .anxiety, .confusion {
    background-color: var(--color-fear);
    color: var(--color-fear-dark);
  }

  .sadness, .guilt, .loneliness, .shame {
    background-color: var(--color-sadness);
    color: var(--color-sadness-dark);
  }

  .surprise, .excitement, .amazement {
    background-color: var(--color-surprise);
    color: var(--color-surprise-dark);
  }

  .enjoyment, .happiness, .peace, .trust, .optimism, .hope, .gratitude, .love, .curiosity  {
    background-color: var(--color-enjoyment);
    color: var(--color-enjoyment-dark);
  }

  .pride, .power, .courage, .confidence, .respect, .inspiration {
      background-color: var(--color-confidence);
      color: var(--color-confidence-dark);
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
