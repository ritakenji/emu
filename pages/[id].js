import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
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
    </>
  );
}

const GoBackButton = styled.button`
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  border: none;
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
