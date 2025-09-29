import EntryList from "@/components/EntryList";
import useSWR from "swr";

export default function HomePage() {
  const { data:entries, isLoading } = useSWR("/api/entries", { fallbackData: [] });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!entries) {
    return;
  }

  return (
    <>
      <EntryList entries={entries} />
    </>
  );
}
