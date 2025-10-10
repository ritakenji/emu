import Head from "next/head";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

import EntryList from "@/components/EntryList";
import NavBar from "@/components/Navbar";

export default function Bookmarks() {
  const {
    data: entries = [],
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });
  const [bookmark] = useLocalStorageState("bookmark", {
    defaultValue: [],
  });

  if (isLoading) {
    return <p aria-live="polite">Loading...</p>;
  }

  if (error) {
    return (
      <>
        <p aria-live="assertive">
          Sorry, we could not retrieve the entry data at the moment.
        </p>
        <p aria-live="assertive">Please try again later.</p>
      </>
    );
  }

  const bookmarkedEntries = entries.filter((entry) =>
    bookmark.includes(entry._id)
  );

  return (
    <Main>
      <Head>
        <title>Bookmarks</title>
      </Head>

      <h1>Bookmarked entries</h1>
      {bookmark.length === 0 ? (
        <h2>No bookmarks yet</h2>
      ) : bookmarkedEntries.length === 0 ? (
        <h2>No matches found</h2>
      ) : (
        <EntryList entries={bookmarkedEntries} />
      )}
      <NavBar />
    </Main>
  );
}

const Main = styled.main`
  padding: 1rem 1.5rem 4rem;
`;
