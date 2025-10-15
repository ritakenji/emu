import Bookmark from "./Bookmark";
import styled from "styled-components";

export default function EntryCard({ type, intensity, dateTime, id }) {
  const formattedDate = new Date(dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <EntryCardWrapper>
      <EntryCardTab>
        <Bookmark id={id}></Bookmark>
        {formattedDate}
      </EntryCardTab>
      <EntryCardBody>
        <IntensityScale>
          <span>{intensity}</span> / 10
        </IntensityScale>
        <EmotionContainer>
          {type.map(({ _id, emotion }) => (
            <Emotionchips key={_id} className={emotion.toLowerCase()}>
              {emotion}
            </Emotionchips>
          ))}
        </EmotionContainer>
      </EntryCardBody>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.08));
`;
const EntryCardTab = styled.div`
  padding: 12px 24px 0 12px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  font-weight: 700;

  button {
    margin-right: 6px;
  }
`;

const EntryCardBody = styled.div`
  padding: 36px 16px 40px 24px;
  border-radius: 0 20px 20px 20px;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  margin-top: -6px;
`;

const IntensityScale = styled.div`
  color: var(--color-primary);
  font-weight: 700;
  flex-shrink: 0;
  margin-right: 20px;
  line-height: 0.65;

  span {
    font-size: 48px;
  }
`;

const Emotionchips = styled.span`
  padding: 5px 8px;
  border-radius: 5px;
  margin: 0 5px;
`;

const EmotionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;
