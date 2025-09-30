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
  position: absolute;
  border: none;
  background-color: transparent;
  top: -10px;
  right: 5px;
`;

const PositionedBookmark = styled(BookmarkIcon)`
  width: 40px;
  height: 40px;
`;
