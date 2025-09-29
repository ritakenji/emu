import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading } = useSWR("/api/entries", { fallbackData: [] });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      <h1>Hello from Next.js</h1>
    </div>
  );
}
