import EntryCard from "./EntryCard";
import styled from "styled-components";

export default function EntryList({ entries }) {
  return (
    <ListContainer>
      {entries.map((entry) => (
        <EntryCard
          key={entry._id}
          type={entry.emotion}
          intensity={entry.intensity}
          dateTime={entry.dateTime}
        />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0;
`;
