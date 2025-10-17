import styled from "styled-components";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Bookmark({
  id,
  initialBookmarked = false,
  disabled = false,
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookmarked(Boolean(initialBookmarked));
  }, [initialBookmarked]);

  const toggle = async () => {
    if (disabled || loading) return;
    const next = !bookmarked;

    // optimistic UI
    setBookmarked(next);
    setLoading(true);

    try {
      const res = await fetch(`/api/entries/${id}/bookmark`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmarked: next }),
      });

      if (!res.ok) {
        // revert on failure
        setBookmarked(!next);
        console.error(await res.text());
      }
      const data = await res.json();
      if (data?.entry?.bookmarked !== undefined) {
        setBookmarked(data.entry.bookmarked);
      }
    } catch (err) {
      setBookmarked(!next);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledButton
      type="button"
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Add "}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
      onClick={(event) => {
        event.preventDefault();
        toggle();
      }}
      disabled={loading || disabled}
    >
      {bookmarked ? (
        <StyledBookmark fill="var(--color-dark)" stroke="var(--color-dark)" />
      ) : (
        <StyledBookmark fill="white" stroke="var(--color-medium)" />
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
