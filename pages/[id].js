import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled, { css } from "styled-components";
import Bookmark from "@/components/Bookmark";
import EntryForm from "@/components/EntryForm";

export default function EntryPage() {
  const router = useRouter();
  const { isReady } = router;
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

  if (!isReady || isLoading) return <h2 aria-live="polite">Loading...</h2>;
  if (error) return <h2 aria-live="assertive">Failed to load entry</h2>;

  async function editEntry(entry) {
    console.log("Editing entry ...");

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

  const formattedDate = new Date(entry.dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <HeaderWrapper className={entry.emotions?.[0]?.emotion?.toLowerCase()}>
        <GoBackButton aria-label="Go back" onClick={() => router.back()}>
          {" "}
          ← Back{" "}
        </GoBackButton>
        {formattedDate && <h2>{formattedDate}</h2>}
      </HeaderWrapper>
      <DetailWrapper>
        <Bookmark id={id} />
        <section aria-labelledby="emotion-types">
          <h3 id="emotion-types">Type:</h3>
          <EmotionList>
            {entry.emotions?.map(({ _id, emotion }) => (
              <EmotionItem key={_id}>
                <EmotionChip className={emotion.toLowerCase()}>
                  {emotion}
                </EmotionChip>
              </EmotionItem>
            ))}
          </EmotionList>
        </section>
        <p>Intensity: {entry.intensity}</p>
        <p>Notes: {entry.notes}</p>
      </DetailWrapper>
      <ButtonContainer>
        {mode === "default" && (
          <>
            <StyledButtonEdit
              onClick={() => setMode("edit")}
              type="button"
              $variant="edit"
            >
              Edit
            </StyledButtonEdit>

            <StyledButton
              onClick={() => setMode("delete")}
              type="button"
              $variant="delete"
            >
              Delete
            </StyledButton>
          </>
        )}
      </ButtonContainer>
      {mode === "delete" && (
        <>
          <ModalContainer aria-labelledby="delete-title">
            <h2 id="delete-title">Delete entry</h2>
            <p>Are you sure you want to delete the entry?</p>
            <ButtonBox>
              <StyledButton
                onClick={deleteEntry}
                type="button"
                $variant="delete"
              >
                Delete
              </StyledButton>
              <StyledButton
                onClick={() => setMode("default")}
                type="button"
                $variant="delete"
              >
                Cancel
              </StyledButton>
            </ButtonBox>
          </ModalContainer>
          <Overlay aria-hidden="true" onClick={() => setMode("default")} />
        </>
      )}
      {mode === "edit" && (
        <>
          <ModalContainer aria-labelledby="edit-title">
            <h2 id="edit-title">Edit Entry</h2>
            <EntryForm
              buttonText={"Update"}
              initialValues={entry}
              onSubmit={editEntry}
              formTitle={"Edit Entry"}
            ></EntryForm>
            <StyledButton
              onClick={() => setMode("default")}
              type="button"
              $variant="delete"
            >
              Cancel
            </StyledButton>
          </ModalContainer>
          <Overlay aria-hidden="true" onClick={() => setMode("default")} />
        </>
      )}
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

const HeaderWrapper = styled.header`
  padding: 1.5rem 1.5rem;
`;

const DetailWrapper = styled.article`
  position: relative;
  padding: 1.5rem;
`;

/* const Emotionchips = styled.span`
  padding: 5px 8px;
  border-radius: 5px;
  margin: 0 5px;
`; */
const EmotionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* space between chips */
  margin: 0.25rem 0 1rem;
  padding: 0;
  list-style: none;
`;

const EmotionItem = styled.li`
  list-style: none;
`;

const EmotionChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06),
    /* subtle outer */ inset 0 0 0 1px rgba(0, 0, 0, 0.06); /* hairline border */
  /* default look */
  background: #eee;
  color: #222;
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

const StyledButton = styled.button`
  background-color: white;
  padding: 0.8rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  text-align: center;
  cursor: pointer;

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      background-color: lightgray;
      color: red;
    `}
`;

const StyledButtonEdit = styled.button`
  background-color: lightblue;
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: 1px solid black;
  color: yellow;
  text-decoration: none;
  font-weight: bold;
  font-size: inherit;
  text-align: center;
  cursor: pointer;
`;

const Overlay = styled.div.attrs({ "aria-hidden": "true" })`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.3;
  z-index: 999;
  cursor: pointer;
`;

const ModalContainer = styled.div.attrs({
  role: "dialog",
  "aria-modal": "true",
})`
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1em;
`;
