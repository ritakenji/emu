import styled from "styled-components";
import { useRouter } from "next/router";
import EntryForm from "@/components/EntryForm";
import NavBar from "@/components/Navbar";
import Link from "next/link";

const StyledBackLink = styled(Link)`
  justify-self: flex-start;
`;

export default function Create() {
  const router = useRouter();

  async function addEntry(entry) {
    // We need to send the info from the form to the BKEND
    console.log("adding entry", entry);

    const response = await fetch("api/entries", {
      //need to sent this newEntry to the BKEND to b save in the DB
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      router.push("/"); // using push instead because we dont want to rerender the create page, we want to direct the user to homepage
    }
  }

  return (
    <>
      <h2>Add entry</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <EntryForm onSubmit={addEntry} />
      <NavBar />
    </>
  );
}
