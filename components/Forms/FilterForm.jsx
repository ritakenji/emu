import useSWR from "swr";
import { useRef } from "react";

import MultiwayButton from "../Buttons/MultiwayButton";
import { Funnel } from "lucide-react";
import styled from "styled-components";

export default function FilterForm({
  onSubmit,
  selectedFilterEmotionId,
  setSelectedFilterEmotionId,
}) {
  const {
    data: emotions,
    isLoading,
    error,
  } = useSWR("/api/emotions", {
    fallbackData: [],
  });

  const formRef = useRef();
  function resetForm() {
    setSelectedFilterEmotionId("reset");
    formRef.current.reset();
  }

  if (isLoading) {
    return <p aria-live="polite">Loading...</p>;
  }

  if (error) {
    return (
      <div aria-live="assertive">
        <p>Sorry, we could not retrieve the entry data at the moment.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!emotions) {
    return;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("FilterForm data", data);
    onSubmit(data);
  }
  return (
    <StyledForm onSubmit={handleSubmit} ref={formRef}>
      <StyledLabel htmlFor="emotions">
        <Funnel aria-label="filter entries" />{" "}
      </StyledLabel>
      <StyledDropdown
        name="emotions"
        id="emotions"
        aria-label="Filter entries by emotion"
      >
        <option value="reset">Show All</option>
        {emotions.map(({ emotion, _id }) => (
          <option key={_id} value={_id}>
            {emotion}
          </option>
        ))}
      </StyledDropdown>
      <MultiwayButton type="submit" $variant="primary" buttonText="Apply" />
      {selectedFilterEmotionId && selectedFilterEmotionId !== "reset" && (
        <MultiwayButton
          type="reset"
          $variant="secondary"
          buttonText="Reset"
          onClick={resetForm}
        />
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  align-content: center;
  gap: 8px;
  margin: 42px 0 24px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledDropdown = styled.select`
  border: 2px solid var(--color-dark);
  border-radius: 10px;
  padding: 8px;
  font-size: 16px;
  color: var(--color-dark);
  background-color: transparent;
  outline: none;

  &:focus-visible {
    border: 2px solid var(--color-dark);
  }
`;
