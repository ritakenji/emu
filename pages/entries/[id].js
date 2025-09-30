import { useRouter } from "next/router";
import useSWR from "swr";
//import styled from "styled-components";

export default function EntryPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  console.log("id:", id);

  const { data: entry, isLoading, error } = useSWR(`/api/entries/${id}`);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Failed to load entry</h2>;

  return (
    <>
      <h2>{entry.emotion}</h2>
    </>
  );
}
