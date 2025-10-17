import styled, { css } from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { Heart } from "lucide-react";

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
        <StyledBookmark fill="var(--color-dark)" stroke="var(--color-dark)"/>
      ) : (
        <StyledBookmark fill="white" stroke="var(--color-medium)"/>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledBookmark = styled(Heart)`
  stroke-width: 1.8px;
  cursor: pointer;
`;
