import EntryCard from "./EntryCard";
import styled from "styled-components";
import Link from "next/link";
import Bookmark from "./Bookmark";

export default function EntryList({ entries }) {
  return (
    <ListContainer>
      {entries.map((entry) => (
        <EntryDetailsLink href={`/${entry._id}`} key={entry._id}>
          <EntryCard
            type={entry.emotion}
            intensity={entry.intensity}
            dateTime={entry.dateTime}
            id={entry._id}
          />
        </EntryDetailsLink>
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
const EntryDetailsLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
