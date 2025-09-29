import styled from "styled-components";

export default function EntryCard({ type, intensity, dateTime}) {
  return (
    <EntryCardWrapper>
      <span>Type: {type}</span>
      <p>Intensity: {intensity}</p>
      <p>Date and Time: {dateTime}</p>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`

`;
