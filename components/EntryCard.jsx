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
        <EmotionContainer>
          {type.map(({ _id, emotion }) => (
            <Emotionchips key={_id} className={emotion.toLowerCase()}>
              {emotion}
            </Emotionchips>
          ))}
        </EmotionContainer>
        <IntensityScale>
          <span>{intensity}</span>/10
        </IntensityScale>
      </EntryCardBody>
    </EntryCardWrapper>
  );
}

const EntryCardWrapper = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;
const EntryCardTab = styled.div`
  padding: 0.7rem;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const EntryCardBody = styled.div`
  padding: 0.7rem;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const IntensityScale = styled.div`
  color: var(--color-primary);
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
