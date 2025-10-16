import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Head from "next/head";

import BackButton from "@/components/Buttons/BackButton";
import Bookmark from "@/components/Bookmark";
import EmotionList from "@/components/Lists/EmotionList";
import EntryForm from "@/components/Forms/EntryForm";
import Modal from "@/components/Modal";
import MultiwayButton from "@/components/Buttons/MultiwayButton";

export default function EntryPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: entry,
    isLoading,
    error,
  } = useSWR(id ? `/api/entries/${id}` : null, { fallbackData: {} });

  const [mode, setMode] = useState("default");

  if (!id) {
    return;
  }

  if (!router.isReady || isLoading)
    return <h2 aria-live="polite">Loading...</h2>;
  if (error) return <h2 aria-live="assertive">Failed to load entry</h2>;
  const formattedDate = new Date(entry.dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  async function editEntry(entry) {
    const response = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      router.push("/");
    }
  }

  async function deleteEntry() {
    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="View the details of an entry on the Emu App."
        ></meta>
        <title> Details Page</title>
      </Head>
      <HeaderWrapper>
        <BackButton />
        <h2>on {formattedDate}</h2>
        <h3>I was feeling...</h3>
      </HeaderWrapper>
      <DetailWrapper>
        <Bookmark id={id} />
        <section aria-labelledby="emotion-types">
          <h3 id="emotion-types">Type:</h3>
          <EmotionList entry={entry} />
        </section>
        <p>{entry.intensity}/10</p>
        <NotesCard>
          <h4>My notes: </h4>
          <p>{entry.notes}</p>
        </NotesCard>

        <ButtonContainer>
          {mode === "default" && (
            <>
              <MultiwayButton
                onClick={() => setMode("edit")}
                $variant="primary"
                buttonText="Edit"
              />
              <MultiwayButton
                onClick={() => setMode("delete")}
                $variant="secondary"
                buttonText="Delete"
              />
            </>
          )}
        </ButtonContainer>
      </DetailWrapper>

      {mode === "delete" && (
        <Modal title="Delete entry" onClose={() => setMode("default")}>
          <ModalText>Are you sure you want to delete the entry?</ModalText>
          <ButtonBox>
            <MultiwayButton
              onClick={() => setMode("default")}
              $variant="secondary"
              buttonText="Cancel"
            />
            <MultiwayButton
              onClick={deleteEntry}
              $variant="primary"
              buttonText="Delete"
            />
          </ButtonBox>
        </Modal>
      )}
      {mode === "edit" && (
        <Modal title="Edit Entry" onClose={() => setMode("default")}>
          <EntryForm
            buttonText={"Update"}
            initialValues={entry}
            onSubmit={editEntry}
            formTitle={"Edit Entry"}
            type="button"
          ></EntryForm>
          <MultiwayButton
            onClick={() => setMode("default")}
            $variant="secondary"
            buttonText="Cancel"
          />
        </Modal>
      )}
    </>
  );
}

const HeaderWrapper = styled.header`
  padding: 1.5rem 1.5rem;

  background-size: 100% 100%;
  background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px,
    0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  background-image: radial-gradient(
      30% 30% at 15% 32%,
      #ffd9d9ff 7%,
      #073aff00 100%
    ),
    radial-gradient(18% 28% at 18% 71%, #c6c6c6ff 6%, #073aff00 100%),
    radial-gradient(70% 53% at 36% 76%, #c1ebc5 20%, #073aff00 100%),
    radial-gradient(42% 53% at 15% 94%, #d5d7ff 7%, #073aff00 100%),
    radial-gradient(42% 53% at 27% 121%, #cce8ff 7%, #073aff00 100%),
    radial-gradient(18% 28% at 35% 87%, #ffe9bd 7%, #073aff00 100%),
    radial-gradient(31% 59% at 7% 98%, #ffd9f4 30%, #073aff00 100%),
    radial-gradient(21% 37% at 72% 23%, #fff4af 24%, #073aff00 100%),
    radial-gradient(35% 56% at 91% 74%, #cce8ff 9%, #073aff00 100%),
    radial-gradient(74% 86% at 67% 38%, #ffe9bdff 24%, #073aff00 100%),
    linear-gradient(125deg, #b7daffff 0%, #a996ffff 100%);

  h2 {
    text-align: center;
    font-weight: 500;
    margin: 36px 0 8px;
  }

  h3 {
    font-family: "Jost", sans-serif;
    font-size: 28px;
    font-weight: 350;
    text-align: center;
    margin: 0 0 36px;
  }
`;

const DetailWrapper = styled.article`
  position: relative;
  padding: 1.5rem;
`;

const NotesCard = styled.section`
  padding: 1.5rem;
  background-color: white;
  border-radius: 15px;
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.08));

  h4 {
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 0;
  }
`;

const ButtonContainer = styled.section.attrs({ "aria-label": "Entry actions" })`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ModalText = styled.p`
  font-weight: bold;
  color: var(--color-dark);
  text-align: center;
  font-size: 1.3em;
  margin: 0 0 2rem 0;
`;
