import styled from "styled-components";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";

export default function Bookmark({
  id,
  initialBookmarked = false,
  disabled = false,
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    setBookmarked(Boolean(initialBookmarked));
  }, [initialBookmarked]);

  const toggle = async () => {
    if (disabled || loading) return;
    const next = !bookmarked;

    // optimistic UI
    setBookmarked(next);
    setLoading(true);

    mutate(
      "/api/entries",
      (prev = []) =>
        prev.map((e) => (e._id === id ? { ...e, bookmarked: next } : e)),
      { revalidate: false, populateCache: true, rollbackOnError: true }
    );

    try {
      const res = await fetch(`/api/entries/${id}/bookmark`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmarked: next }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const serverValue = data?.entry?.bookmarked ?? next;

      setBookmarked(serverValue);

      // 4) Revalidate to pull the truth from server
      mutate("/api/entries");
      mutate(`/api/entries/${id}`);
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
        <StyledBookmark fill="white" stroke="var(--color-dark)" />
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
