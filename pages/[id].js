import { useRouter } from "next/router";
import useSWR from "swr";
import styled, { css } from "styled-components";
import Bookmark from "@/components/Bookmark";

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

  if (!id) {
    return /*null*/;
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Failed to load entry</h2>;

  async function deleteEntry() {
    const confirmed = confirm("Are you sure you want to delete the entry?"); //const confirmed = alert --> message, nothing happens, user can simply close window --> check how to do wrapping

    if (!confirmed) return;

    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  const formattedDate = new Date(entry.dateTime).toLocaleString("de-DE", {
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
        <StyledButton onClick={deleteEntry} type="button" $variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
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

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      background-color: lightgray;
      color: red;
    `}
`;
