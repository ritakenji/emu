import GlobalStyle from "../styles";
import NavBar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <NavBar />
    </>
  );
}
