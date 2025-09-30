import EntryList from "@/components/EntryList";
import useSWR from "swr";
import Head from "next/head";

export default function Bookmarks({ bookmark, onToggleBookmark }) {
  const {
    data: entries,
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });

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

  return (
    <>
      <Head>
        <title>Bookmarks</title>
      </Head>
      <h2>Bookmarked Emotion Entry List</h2>
      <EntryList entries={entries} />
    </>
  );
}
