import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import UserAccess from "@/components/UserAccess";

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
  const { session, ...rest } = pageProps;
  return (
    <SessionProvider session={session}>
      <SWRConfig value={swrConfig}>
        <GlobalStyle />
        <header style={{ padding: "5rem 0" }}>
          <UserAccess />
        </header>
        <Component {...rest} />
      </SWRConfig>
    </SessionProvider>
  );
}
