import styled from "styled-components";

export default function EntryCard({ type, intensity, dateTime }) {
  const formattedDate = new Date(dateTime).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <EntryCardWrapper>
      <section>
        <p>Type:</p>
        {type.map(({ _id, emotion }) => (
          <span key={_id} className={emotion.toLowerCase()}>
            {emotion}
          </span>
        ))}
      </section>
      <p>Intensity: {intensity}</p>
      <p>Date and Time: {formattedDate}</p>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
`;
