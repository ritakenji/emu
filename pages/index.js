import EntryList from "@/components/EntryList";
import useSWR from "swr";
import Head from "next/head";

export default function HomePage() {
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
        <title>Homepage</title>
      </Head>
      <h2>Emotion Entry List</h2>
      <EntryList entries={entries} />
    </>
  );
}
