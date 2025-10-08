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
    const response = await fetch("api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <StyledBackLink href="/">back</StyledBackLink>
      <EntryForm
        onSubmit={addEntry}
        buttonText={"Submit"}
        formTitle={"Add Entry"}
      />
      <NavBar />
    </>
  );
}
