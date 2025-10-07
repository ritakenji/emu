import styled from "styled-components";
import Bookmark from "./Bookmark";

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
        <p>
          Type:
          {type.map(({ _id, emotion }) => (
            <Emotionchips key={_id} className={emotion.toLowerCase()}>
              {emotion}
            </Emotionchips>
          ))}
        </p>
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
