import styled from "styled-components";

export default function EntryCard({ type, intensity, dateTime }) {
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
      <p>Date and Time: {dateTime}</p>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
`;
