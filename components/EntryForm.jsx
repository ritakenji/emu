import styled from "styled-components";
import useSWR from "swr";

export default function EntryForm({ onSubmit, formName, defaultData }) {
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
    onSubmit(data);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      {emotions.map(({ emotion, _id }) => {
        return (
          <div key={_id}>
            <Label htmlFor={emotion}>{emotion}</Label>
            <Input id={emotion} name={emotion} type="checkbox" />
          </div>
        );
      })}
      <Label htmlFor="location">Location</Label>
      <Input
        id="notes"
        name="notes"
        type="textfield"
        defaultValue={defaultData?.location}
      />
      <Label htmlFor="dateTime">Date and Time</Label>
      <Input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        defaultValue={defaultData?.mapURL}
      />

      <button type="submit">
        {defaultData ? "Update entry" : "Add entry"}
      </button>
    </FormContainer>
  );
}

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;
