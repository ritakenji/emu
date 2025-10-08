import useSWR from "swr";
import { useRef } from "react";

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

  const formElement = useRef();
  function resetForm() {
    setSelectedFilterEmotionId("reset");
    formElement.current.reset();
  }

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
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("FilterForm data", data);
    onSubmit(data);
  }
  return (
    <form onSubmit={handleSubmit} ref={formElement}>
      <label htmlFor="emotions">Filter: </label>
      <select name="emotions" id="emotions">
        <option value="reset">Show All</option>
        {emotions.map(({ emotion, _id }) => (
          <option key={_id} value={_id}>
            {emotion}
          </option>
        ))}
      </select>
      <button name="apply" type="submit">
        Apply
      </button>
      {selectedFilterEmotionId && selectedFilterEmotionId !== "reset" && (
        <button type="reset" onClick={resetForm}>
          Reset
        </button>
      )}
    </form>
  );
}
