import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import styled from "styled-components";

import Header from "@/components/Header";
import NavBar from "@/components/Navbar";
import EntryList from "@/components/Lists/EntryList";
import FilterForm from "@/components/Forms/FilterForm";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function HomePage() {
  const {
    data: entries = [],
    isLoading,
    error,
  } = useSWR("/api/entries", {
    fallbackData: [],
  });

  const [selectedFilterEmotionId, setSelectedFilterEmotionId] =
    useState("reset");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
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
    setSelectedFilterEmotionId(emotions);
  }

  return (
    <>
      <Main>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Emu App is a web application designed for users to track, analyse, and reflect on their emotional states over time. It facilitates personal emotional awareness and can be used in therapeutic settings or for individual self-reflection."
          ></meta>
          <title>Homepage</title>
        </Head>
        <Header />
        <h1>Emotion Entry List</h1>

        {entries.length !== 0 && (
          <FilterForm
            onSubmit={handleFilterSubmit}
            selectedFilterEmotionId={selectedFilterEmotionId}
            setSelectedFilterEmotionId={setSelectedFilterEmotionId}
          />
        )}

        {filteredEntries.length === 0 ? (
          <EmptyState as="h2">
            {entries.length === 0
              ? "Please add an entry …"
              : "No entries match this filter."}
          </EmptyState>
        ) : (
          <EntryList entries={filteredEntries} />
        )}
      </Main>
      <NavBar />
    </>
  );
}

const Main = styled.main`
  padding: 4rem 1.5rem;
`;
const EmptyState = styled.p`
  margin: 0.75rem 0 1rem;
`;
