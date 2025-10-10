import Bookmark from "./Bookmark";
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
        <EmotionContainer>
          {type.map(({ _id, emotion }) => (
            <Emotionchips key={_id} className={emotion.toLowerCase()}>
              {emotion}
            </Emotionchips>
          ))}
        </EmotionContainer>
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

const Emotionchips = styled.span`
  padding: 5px 8px;
  border-radius: 5px;
  margin: 0 5px;
`;

const EmotionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;
