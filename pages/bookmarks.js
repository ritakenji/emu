import EntryList from "@/components/EntryList";
import NavBar from "@/components/Navbar";
import useSWR from "swr";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

export default function Bookmarks() {
  const {
    data: entries,
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });
  const [bookmark] = useLocalStorageState("bookmark");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Sorry, we could not retrieve the entry data at the moment.</p>
        <p>Please try again later.</p>
      </>
    );
  }

  if (!entries) {
    return;
  }

  const bookmarkedEntries = entries.filter((entry) =>
    bookmark.includes(entry._id)
  );

  return (
    <StyledBody>
      <Head>
        <title>Bookmarks</title>
      </Head>

      <h2>Bookmarked entries</h2>
      {bookmark.length === 0 && <h3>Please bookmark an entry ...</h3>}
      <EntryList entries={bookmarkedEntries} />
      <NavBar />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  padding: 1rem 1.5rem 4rem;
`;
