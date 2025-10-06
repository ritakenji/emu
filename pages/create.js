import styled from "styled-components";
import { useRouter } from "next/router";
import EntryForm from "@/components/EntryForm";
import NavBar from "@/components/Navbar";
import Link from "next/link";

const StyledBackLink = styled(Link)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  /* const { mutate } = useSWR("/api/places"); */

  async function addPlace(place) {
    // I need to send the info from the form to the BKEND
    console.log("adding place", place);

    const response = await fetch("api/places", {
      //need to sent this newPlace to the BKEND to b save in the DB
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    if (response.ok) {
      /* mutate(); //once i know the responsde is OK, I call mutate method of useSWR to re-render page */
      router.push("/"); // using push instead because we dont want to rerender the create page, we want to direct the user to homepage
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <EntryForm
      //   onSubmit={addPlace} formName={"add-place"}
      />
      <NavBar />
    </>
  );
}
