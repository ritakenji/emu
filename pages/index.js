import EntryList from "@/components/EntryList";
import useSWR from "swr";
import Head from "next/head";
import NavBar from "@/components/Navbar";
import Header from "@/components/Header";
import styled from "styled-components";

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
    <StyledBody>
      <Head>
        <title>Homepage</title>
      </Head>
      <Header />
      <h2>Emotion Entry List</h2>
      <EntryList entries={entries} />
      <NavBar />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  padding: 4rem 1.5rem;
`;
