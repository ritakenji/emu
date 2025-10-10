import { SWRConfig } from "swr";
import GlobalStyle from "../styles";

const fetcher = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const url = typeof input === "string" ? input : input?.url || "";
    throw new Error(
      `Fetch failed ${response.status} ${response.statusText} — ${url}`
    );
  }
  return response.json();
};

const swrConfig = { fetcher };

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={swrConfig}>
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
