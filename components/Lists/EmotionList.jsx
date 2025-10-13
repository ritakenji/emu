import styled, { css } from "styled-components";

export default function EmotionList({ entry }) {
  return (
    <StyledEmotionList>
      {entry.emotions?.map(({ _id, emotion }) => (
        <EmotionItem key={_id}>
          <EmotionChip className={emotion.toLowerCase()}>{emotion}</EmotionChip>
        </EmotionItem>
      ))}
    </StyledEmotionList>
  );
}
const StyledEmotionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* space between chips */
  margin: 0.25rem 0 1rem;
  padding: 0;
  list-style: none;
`;

const EmotionItem = styled.li`
  list-style: none;
`;

const EmotionChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06),
    /* subtle outer */ inset 0 0 0 1px rgba(0, 0, 0, 0.06); /* hairline border */
  /* default look */
  background: #eee;
  color: #222;
`;
