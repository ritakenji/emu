import { BookmarkIcon } from "lucide-react";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";

export default function Bookmark({ id }) {
  const [bookmark, setBookmark] = useLocalStorageState("bookmark", {
    defaultValue: [],
  });

  const isBookmarked = bookmark.includes(id);

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
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      onClick={(event) => {
        event.preventDefault();
        handleToggleBookmark();
      }}
    >
      {bookmark.includes(id) ? (
        <StyledBookmark fill="black" />
      ) : (
        <StyledBookmark fill="white" />
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledBookmark = styled(BookmarkIcon)`
  /* width: 40px;
  height: 40px; */
`;
