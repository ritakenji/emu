import Bookmark from "./Bookmark";
import EmotionChips from "./Lists/EmotionChips";
import IntensityScale from "./IntensityScale";

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
        <IntensityScale intensity={intensity} />
        <EmotionChips type={type} />
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

