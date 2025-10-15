import Bookmark from "./Bookmark";
import EmotionChips from "./Lists/EmotionChips";

import styled from "styled-components";

export default function EntryCard({ type, intensity, dateTime, id }) {
  const formattedDate = new Date(dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <EntryCardWrapper>
      <Bookmark id={id}></Bookmark>
      <section>
        <p>{formattedDate}</p>
        <p>Type:</p>
        <EmotionChips type={type} />
      </section>
      <p>Intensity: {intensity}</p>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0.7rem;
  background-color: var(--color-light);
`;
