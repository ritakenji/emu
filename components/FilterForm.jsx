import useSWR from "swr";

export default function FilterForm({ onSubmit }) {
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
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("FilterForm data", data);
    //onSubmit(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="emotions">Filter:</label>
      <select name="emotions" id="emotions">
        <option value="reset">Choose an emotion</option>
        {emotions.map(({ emotion, _id }) => {
          return (
            <option key={_id} value={_id}>
              {emotion}
            </option>
          );
        })}
      </select>
      <button name="apply" type="submit">
        Apply
      </button>
    </form>
  );
}
