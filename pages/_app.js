import GlobalStyle from "../styles";
import NavBar from "@/components/Navbar";
import Header from "@/components/Header";
import { SWRConfig } from "swr";
import useSWR from "swr";

export default function App({ Component, pageProps }) {
  const {
    data: entries,
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });

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
