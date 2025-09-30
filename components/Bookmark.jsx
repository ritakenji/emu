import { BookmarkIcon } from "lucide-react";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";

export default function Bookmark({ id }) {
  const [bookmark, setBookmark] = useLocalStorageState("bookmark", {
    defaultValue: [],
  });
  console.log("Bookmark", bookmark);
  function handleToggleBookmark() {
    setBookmark((prevState) =>
      prevState.includes(id)
        ? prevState.filter((bookmarkId) => bookmarkId !== id)
        : [...prevState, id]
    );
  }
  return (
    <StyledButton
      type="button"
      onClick={(event) => {
        event.preventDefault();
        handleToggleBookmark();
      }}
    >
      {bookmark.includes(id) ? (
        <PositionedBookmark fill="black" />
      ) : (
        <PositionedBookmark />
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
`;

const PositionedBookmark = styled(BookmarkIcon)`
  position: absolute;
`;
