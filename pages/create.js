import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { useSession } from "next-auth/react";

import EntryForm from "@/components/Forms/EntryForm";
import NavBar from "@/components/Navbar";
import BackButton from "@/components/Buttons/BackButton";

export default function Create() {
  const router = useRouter();
  const { status } = useSession();

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
        let body = null;
        try {
          body = await response.json();
        } catch {}
        console.error("Failed to create entry", response.status, body);
        return;
      }
      router.push("/");
    } catch (e) {
      console.error("Failed to add entry:", e);
    }
  }
  if (status !== "authenticated") {
    return <h2>Access denied!</h2>;
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Create a new emotion entry on Emu App."
        ></meta>
        <title>Add Entry</title>
      </Head>
      <Header>
        <BackButton />
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

const Header = styled.header`
  padding: 1rem 1.5rem 0;
`;
const Main = styled.main`
  padding: 0 1.5rem 4rem;
`;
