import styled from "styled-components";
import useSWR from "swr";
import { useState } from "react";

export default function EntryForm({
  onSubmit,
  buttonText,
  initialValues,
  formTitle,
}) {
  const [selectedTypes, setSelectedTypes] = useState(
    initialValues?.emotions || []
  );

  const {
    data: emotions,
    isLoading,
    error,
  } = useSWR("/api/emotions", {
    fallbackData: [],
  });

  const isSelected = (_id) => {
    return selectedTypes.some((selectedEmotion) => selectedEmotion._id === _id);
  };

  const toLocalDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISO = new Date(date.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);
    return localISO;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Sorry, we could not retrieve the entry data at the moment.</p>
        <p>Please try again later.</p>
      </>
    );
  }

  if (!emotions) {
    return;
  }

  function handleCheckBox(event) {
    const { value: _id, checked } = event.target;

    const selectedEmotionObject = emotions.find((e) => e._id === _id);

    if (
      checked &&
      selectedEmotionObject &&
      !selectedTypes.some((e) => e._id === _id)
    ) {
      setSelectedTypes((prev) => [...prev, selectedEmotionObject]);
    } else if (!checked) {
      setSelectedTypes((prev) => prev.filter((e) => e._id !== _id));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newObject = {
      emotions: [...selectedTypes],
      ...data,
    };

    const isDateTimeSelected = data.dateTime;

    if (selectedTypes.length === 0) {
      alert("Please select at least one emotion.");
      return;
    }

    if (!isDateTimeSelected) {
      alert("Please select date and time.");
      return;
    }

    onSubmit(newObject);
    console.log("newObject:", newObject);
  }

  const ticks = [];
  for (let i = 1; i <= 10; i += 1) {
    ticks.push(i);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{formTitle}</h2>
      <Label>Type *</Label>
      <EmotionContainer>
        {emotions.map(({ emotion, _id }) => (
          <div key={_id}>
            <Input
              onChange={handleCheckBox}
              id={emotion}
              name="type"
              type="checkbox"
              value={_id}
              checked={isSelected(_id)}
            />
            <Label htmlFor="type">{emotion}</Label>
          </div>
        ))}
      </EmotionContainer>

      <Label htmlFor="intensity">Intensity *</Label>
      <input
        type="range"
        min="1"
        max="10"
        name="intensity"
        step="1"
        defaultValue={initialValues?.intensity}
      />
      <StyledRange>
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </StyledRange>

      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        name="notes"
        type="textfield"
        placeholder="Today I feel ..."
        defaultValue={initialValues?.notes}
      />

      <Label htmlFor="dateTime">Date and Time *</Label>
      <Input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        defaultValue={toLocalDateTime(initialValues?.dateTime)}
      />

      <button type="submit"> {buttonText} </button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const EmotionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 20px;
  }
`;

const StyledRange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
`;
