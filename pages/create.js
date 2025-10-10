import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";

import EntryForm from "@/components/EntryForm";
import NavBar from "@/components/Navbar";

export default function Create() {
  const router = useRouter();

  async function handleAddEntry(entry) {
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        console.error("Failed to create entry");
        return;
      }
      router.push("/");
    } catch (e) {
      console.error("Failed to add entry:", e);
    }
  }

  return (
    <>
      <Head>
        <title>Add Entry</title>
      </Head>
      <Header>
        <GoBackButton onClick={() => router.back()}>← Back</GoBackButton>
      </Header>
      <Main>
        <EntryForm
          onSubmit={handleAddEntry}
          buttonText={"Submit"}
          formTitle={"Add Entry"}
        />
      </Main>
      <NavBar />
    </>
  );
}

const GoBackButton = styled.button`
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: 700;
`;
const Header = styled.header`
  padding: 1rem 1.5rem 0;
`;
const Main = styled.main`
  padding: 0 1.5rem 4rem;
`;
