import styled from "styled-components";

export default function EmotionChips({ type }) {
  return (
    <ChipsContainer>
      {type.map(({ _id, emotion }) => (
        <EmotionChip key={_id} className={emotion.toLowerCase()}>
          {emotion}
        </EmotionChip>
      ))}
    </ChipsContainer>
  );
}

const ChipsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const EmotionChip = styled.span`
  padding: 10px 15px;
  border-radius: 50px;
  font-family: "Jost", sans-serif;
  font-weight: 500;
`;
