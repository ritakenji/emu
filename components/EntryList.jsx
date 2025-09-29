import EntryCard from "./EntryCard";
import styled from "styled-components";

export default function EntryList({ entries }) {
  return (
    <>
      <ListContainer>
        {entries.map((entry) => {
          return (
            <EntryCard
              key={entry._id}
              type={entry.emotion}
              intensity={entry.intensity}
              dateTime={entry.dateTime}
/*               id={entry._id} */
            />
          );
        })}
      </ListContainer>
      ;
    </>
  );
}

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;
