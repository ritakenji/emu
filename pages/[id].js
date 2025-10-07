import { useRouter } from "next/router";
import useSWR from "swr";
import styled, { css } from "styled-components";
import Bookmark from "@/components/Bookmark";
import { useState } from "react";
import EntryForm from "@/components/EntryForm";

export default function EntryPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: entry,
    isLoading,
    error,
  } = useSWR(`/api/entries/${id ? id : ""}`, {
    fallbackData: {},
  });

  const [mode, setMode] = useState("default");

  if (!id) {
    return /*null*/;
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Failed to load entry</h2>;

  async function deleteEntry() {
    /*  const confirmed = confirm("Are you sure you want to delete the entry?");

    if (!confirmed) return; */

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
      <HeaderWrapper className={entry.emotions[0].emotion.toLowerCase()}>
        <GoBackButton onClick={() => router.back()}> ← Back </GoBackButton>
        <h2>{formattedDate}</h2>
      </HeaderWrapper>
      <DetailWrapper>
        <Bookmark id={id} />
        <section>
          <p>Type:</p>
          {entry.emotions.map(({ _id, emotion }) => (
            <Emotionchips key={_id} className={emotion.toLowerCase()}>
              {emotion}
            </Emotionchips>
          ))}
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
          <DeleteContainer>
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
          </DeleteContainer>
          <Overlay onClick={() => setMode("default")} />
        </>
      )}
      {mode === "edit" && (
        <>
          <EntryForm
            buttonText={"Update"}
            initialValues={entry} /* need to pass {onSubmit} at some point */
          ></EntryForm>
          {/*
          defaultValues --> same as the entry in question
          button text --> edit DONE
          new button --> cancel
          */}
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

const HeaderWrapper = styled.div`
  padding: 1.5rem 1.5rem;
`;

const DetailWrapper = styled.div`
  position: relative;
  padding: 1.5rem;
`;

const Emotionchips = styled.span`
  padding: 5px 8px;
  border-radius: 5px;
  margin: 0 5px;
`;

const ButtonContainer = styled.section`
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
  border: 1px solid black;
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
  border: none;
  font-size: inherit;
  text-align: center;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.3;
  z-index: 999;
`;

const DeleteContainer = styled.div`
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
