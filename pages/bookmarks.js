import EntryList from "@/components/EntryList";
import useSWR from "swr";
import Head from "next/head";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

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

  console.log("Bookmark", bookmark);
  const bookmarkedEntries = entries.filter((entry) =>
    bookmark.includes(entry._id)
  );
  console.log("bookmark entries", bookmarkedEntries);
  console.log("entries", entries);

  return (
    <>
      <Head>
        <title>Bookmarks</title>
      </Head>
      <h2>Bookmarked Emotion Entry List</h2>
      <EntryList entries={bookmarkedEntries} />
    </>
  );
}

/*  <ArtList>
          {bookmark.length === 0 && (
            <StyledH2>Please select a favorite art piece ...</StyledH2>
          )}
          {data
            .filter((image) => bookmark.includes(image.slug))
            .map((image) => (
              <ArtPiece
                key={image.slug}
                image={image}
                bookmark={bookmark}
                onToggleBookmark={onToggleBookmark}
              >
                <ArtTitle>&quot;{image.name}&quot;</ArtTitle>
                by {image.artist}
              </ArtPiece>
            ))}
        </ArtList> */
