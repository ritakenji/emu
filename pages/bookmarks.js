import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

import EntryList from "@/components/Lists/EntryList";
import NavBar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

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
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        errorText="Sorry, we could not retrieve the entry data at the moment."
        tryAgainText="Please try again later."
      />
    );
  }

  const bookmarkedEntries = entries.filter((entry) =>
    bookmark.includes(entry._id)
  );

  return (
    <Main>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="View your bookmarked entries on Emu App."
        ></meta>
        <title>Bookmarks</title>
      </Head>

      <BookmarkHeader>Bookmarked entries</BookmarkHeader>
      {bookmark.length === 0 ? (
        <NoBookmarksWrapper>
          
          <h2>No bookmarks yet.</h2>
          <p>Please bookmark an entry.</p>
        </NoBookmarksWrapper>
      ) : bookmarkedEntries.length === 0 ? (
        <NoBookmarksWrapper>
          <Image src="/assets/emu-logo-bookmark.png" alt="logo" height={171} width={119} loading="eager" />
          <h2>No bookmarks yet.</h2>
          <p>Please bookmark an entry.</p>
        </NoBookmarksWrapper>
      ) : (
        <EntryList entries={bookmarkedEntries} />
      )}
      <NavBar />
    </Main>
  );
}

const Main = styled.main`
  padding: 1rem 1.5rem 6rem;
`;

const BookmarkHeader = styled.h1`
  text-align: center;
  padding: 2.5rem;
`;

const NoBookmarksWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    margin: 0;
  }
`;
