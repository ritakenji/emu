import styled from "styled-components";
import useSWR from "swr";
import { useState } from "react";

export default function EntryForm({ onSubmit, buttonText, initialValues }) {
  // Use a logical OR operator (||) to set the initial state.
  // It checks if initialValues.emotions exists and is truthy.
  // If it is, that value is used; otherwise, it uses the empty array [].
  const [selectedTypes, setSelectedTypes] = useState(
    initialValues.emotions || [] // first case -> for edit, second case -> for create
  );

  const {
    data: emotions,
    isLoading,
    error,
  } = useSWR("/api/emotions", {
    fallbackData: [],
  });

  const isSelected = (_id) => {
    // Use the Array.prototype.some() method to check if at least one element
    // in the selectedTypes array satisfies the condition.
    return selectedTypes.some((selectedEmotion) => selectedEmotion._id === _id);
  };

  const toLocalDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const tzOffset = date.getTimezoneOffset() * 60000; // in ms
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

  // if the user checks a type add it to the state, else remove it
  function handleCheckBox(event) {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((v) => v !== value));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // *************** START

    // Use destructuring to pull out the non-emotion properties and construct the new object

    /* Britta's idea of how to get the id of an emotion
    const idOfEmotion= emotions.filter((emotion)=>emotion.emotions.includes(${emotionKey}))
     const newObject = {
      emotions: [idOfEmotion], // Use the found id
      ...rest, // Spread the remaining properties
    };
    or we need to somehow change/add the type string to the entries schema for emotions

     */

    const newObject = {
      emotions: [...selectedTypes], // Use the found key
      ...data, // Spread the remaining properties
    };

    console.log("form data", data);

    // *************** END

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
      <Label>Type *</Label>
      <EmotionContainer>
        {emotions.map(({ emotion, _id }) => {
          return (
            <div key={_id}>
              <Input
                onChange={handleCheckBox}
                id={emotion}
                name="type"
                type="checkbox"
                value={_id}
                checked={isSelected(_id)} // if nr of items(emotions) is growing, use 3rd list(done only once), if constant, use tenerary condition(ask thr question every time) --> we decided to go for the list as its cleaner and effective
              />
              <Label htmlFor="type">{emotion}</Label>
            </div>
          );
        })}
      </EmotionContainer>

      <Label htmlFor="intensity">Intensity *</Label>
      <input
        type="range"
        min="1"
        max="10"
        name="intensity"
        step="1"
        defaultValue={initialValues.intensity}
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
        defaultValue={initialValues.notes}
      />

      <Label htmlFor="dateTime">Date and Time *</Label>
      <Input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        defaultValue={toLocalDateTime(initialValues.dateTime)}
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
