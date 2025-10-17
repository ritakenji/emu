import EntryCard from "../EntryCard";
import styled from "styled-components";
import Link from "next/link";
import UserAccess from "../UserAccess";

export default function EntryList({ entries }) {
  return (
    <>
      <ListContainer>
        {entries.map((entry) => (
          <li key={entry._id}>
            <EntryDetailsLink
              href={`/${entry._id}`}
              aria-label={`View details for entry on ${new Date(
                entry.dateTime
              ).toLocaleDateString("en-GB")}`}
            >
              <EntryCard
                type={entry.emotions}
                intensity={entry.intensity}
                dateTime={entry.dateTime}
                id={entry._id}
                owner={entry.owner}
                bookmarked={entry.bookmarked}
              />
            </EntryDetailsLink>
          </li>
        ))}
      </ListContainer>
      <UserAccess />
    </>
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
