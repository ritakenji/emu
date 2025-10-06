import styled from "styled-components";
import useSWR from "swr";

export default function EntryForm({ onSubmit }) {
  const {
    data: emotions,
    isLoading,
    error,
  } = useSWR("/api/emotions", {
    fallbackData: [],
  });

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

  console.log("emotions", emotions);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // START Here we are defining a variable which should contain all emotion names of the emotions that were selected --> We want to add a new entry in the same format as all the other objects in the entries collection
    const emotionKey = Object.keys(data).find((key) => data[key] === "on");

    // Use destructuring to pull out the non-emotion properties and construct the new object
    const {
      [emotionKey]: _, // Destructure and ignore the emotion property
      ...rest // Capture the rest of the properties
    } = data;

    /* Britta's idea of how to get the id of an emotion
    const idOfEmotion= emotions.filter((emotion)=>emotion.emotions.includes(${emotionKey}))
     */

    const newObject = {
      emotions: [emotionKey], // Use the found key
      ...rest, // Spread the remaining properties
    };

    console.log("form data", data);

    // END

    // Get the names of all possible emotions
    const emotionKeys = emotions.map((e) => e.emotion); //previously named 'selectedEmotionKeys' by Gemini

    // Check if any emotion key exists in the submitted 'data' object. Checked checkboxes are included in FormData; unchecked ones are not.
    const isAnyEmotionSelected = emotionKeys.some((key) => key in data);

    const isDateTimeSelected = data.dateTime;

    if (!isAnyEmotionSelected) {
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
              <Input id={emotion} name={emotion} type="checkbox" />
              <Label htmlFor={emotion}>{emotion}</Label>
            </div>
          );
        })}
      </EmotionContainer>

      <Label htmlFor="intensity">Intensity *</Label>
      <input type="range" min="1" max="10" name="intensity" step="1" />
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
      />

      <Label htmlFor="dateTime">Date and Time *</Label>
      <Input id="dateTime" name="dateTime" type="datetime-local" />

      <button type="submit"> Submit </button>
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
