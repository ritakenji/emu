import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";

import EntryForm from "@/components/Forms/EntryForm";
import NavBar from "@/components/Navbar";
import BackButton from "@/components/Buttons/BackButton";

export default function Create() {
  const router = useRouter();

  async function handleAddEntry(formValues) {
    try {
      const payload = {
        // store only emotion IDs in DB
        emotions: (formValues.emotions || []).map((e) => e._id),
        intensity: Number(formValues.intensity),
        notes: formValues.notes?.trim() || "",
        dateTime: new Date(formValues.dateTime).toISOString(),
        // include image, if present
        ...(formValues.imageUrl ? { imageUrl: formValues.imageUrl } : {}),
        ...(formValues.imagePublicId
          ? { imagePublicId: formValues.imagePublicId }
          : {}),
      };
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Create a new emotion entry on Emu App."
        ></meta>
        <title>Add Entry</title>
      </Head>
      <Main>
        <FormContainer>
          <EntryForm
            onSubmit={handleAddEntry}
            buttonText={"Submit"}
            formTitle={"Create new entry"}
          />
        </FormContainer>
      </Main>
      <NavBar />
    </>
  );
}

const FormContainer = styled.div`
  background-color: #fff;
  padding: 36px 24px 44px;
  margin: 36px 0 48px;
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.08));
  border-radius: 20px;
`;

const Main = styled.main`
  padding: 0 24px 64px;
`;
