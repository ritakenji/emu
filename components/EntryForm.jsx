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

  const ticks = [];
  for (let i = 1; i <= 10; i += 1) {
    ticks.push(i);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      {emotions.map(({ emotion, _id }) => {
        return (
          <div key={_id}>
            <Label htmlFor={emotion}>{emotion}</Label>
            <Input id={emotion} name={emotion} type="checkbox" required />
          </div>
        );
      })}

      <Label htmlFor="intensity">Intensity</Label>

      {/* <StyledRange class="range">
        <input type="range" min="1" max="10" name="intensity" />
        <Ticks class="ticks">
          <Tick class="tick">1</Tick>
          <Tick class="tick">2</Tick>
          <Tick class="tick">3</Tick>
          <Tick class="tick">4</Tick>
          <Tick class="tick">5</Tick>
          <Tick class="tick">6</Tick>
          <Tick class="tick">7</Tick>
          <Tick class="tick">8</Tick>
          <Tick class="tick">9</Tick>
          <Tick class="tick">10</Tick>
        </Ticks>
      </StyledRange> */}

      <input type="range" min="1" max="10" name="intensity" step="1" />
      <StyledRange>
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </StyledRange>

      {/* <datalist id="tickmarks">
        <option value="1" label="1"></option>
        <option value="2" label="2"></option>
        <option value="3" label="3"></option>
        <option value="4" label="4"></option>
        <option value="5" label="5"></option>
        <option value="6" label="6"></option>
        <option value="7" label="7"></option>
        <option value="8" label="8"></option>
        <option value="9" label="9"></option>
        <option value="10" label="10"></option>
      </datalist> */}

      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        name="notes"
        type="textfield"
        placeholder="Today I feel ..."
      />

      <Label htmlFor="dateTime">Date and Time</Label>
      <Input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        defaultValue={defaultData?.mapURL}
        required
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

const StyledRange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
`;

// const Ticks = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const Tick = styled.span`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   width: 1px;
//   background: gray;
// `;
