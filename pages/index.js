import EntryList from "@/components/EntryList";
import useSWR from "swr";
import Head from "next/head";
import NavBar from "@/components/Navbar";
import Header from "@/components/Header";
import styled from "styled-components";
import FilterForm from "@/components/FilterForm";
import { useState } from "react";

export default function HomePage() {
  const {
    data: entries,
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });

  const [selectedFilterEmotionId, setSelectedFilterEmotionId] =
    useState("reset");

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
  const filteredEntries =
    !selectedFilterEmotionId || selectedFilterEmotionId === "reset"
      ? entries
      : entries.filter(
          (entry) =>
            Array.isArray(entry.emotions) &&
            entry.emotions.some((e) => e._id === selectedFilterEmotionId)
        );

  function handleFilterSubmit({ emotions }) {
    setSelectedFilterEmotionId(emotions); // "_id" or "reset"
  }

  return (
    <StyledBody>
      <Head>
        <title>Homepage</title>
      </Head>
      <Header />
      <h2>Emotion Entry List</h2>

      {entries.length !== 0 && (
        <>
          <FilterForm
            onSubmit={handleFilterSubmit}
            selectedFilterEmotionId={selectedFilterEmotionId}
            setSelectedFilterEmotionId={setSelectedFilterEmotionId}
          />{" "}
        </>
      )}

      {filteredEntries.length === 0 ? (
        <h3>
          {entries.length === 0
            ? "Please add an entry ..."
            : "No entries match this filter."}
        </h3>
      ) : null}
      <EntryList entries={filteredEntries} />
      <NavBar />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  padding: 4rem 1.5rem;
`;
