import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

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
    return null;
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Failed to load entry</h2>;

  const formattedDate = new Date(entry.dateTime).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <GoBackLink href="/"> ⬅️ Back </GoBackLink>
      <section>
        <p>Type:</p>
        {entry.emotion.map(({ _id, emotion }) => (
          <span key={_id} className={emotion.toLowerCase()}>
            {emotion}
          </span>
        ))}
      </section>
      <p>Intensity: {entry.intensity}</p>
      <p>Date and Time: {formattedDate}</p>
      <p>Notes: {entry.notes}</p>
    </>
  );
}

const GoBackLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
