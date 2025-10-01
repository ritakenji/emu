import GlobalStyle from "../styles";
import NavBar from "@/components/Navbar";
import Header from "@/components/Header";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  /* const [bookmark, setBookmark] = useLocalStorageState("bookmark", {
    defaultValue: [],
  });
  console.log("Bookmark", bookmark);
  function handleToggleBookmark(toggleId) {
    setBookmark((prevState) =>
      prevState.includes(toggleId)
        ? prevState.filter((id) => id !== toggleId)
        : [...prevState, toggleId]
    );
  } */
  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <NavBar />
      </SWRConfig>
    </>
  );
}
