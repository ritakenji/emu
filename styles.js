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



  /* ---------------------emotion colours---------------------- */

  .anger {
    background-color: #ff8282;
  }

  .contempt {
    background-color: #cd97fc;
  } 
  
  .disgust {
    background-color: #cbfc97;
  }
  
  .fear {
    background-color: #bffff9;
  }

  .sadness {
    background-color: #849cb5;
  }

  .surprise {
    background-color: #fffa7f;
  }

  .enjoyment {
    background-color: #ffb27f;
  }


`;
