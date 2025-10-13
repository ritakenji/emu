import { useRouter } from "next/router";
import styled from "styled-components";

export default function BackButton() {
  const router = useRouter();
  return (
    <StyledBackButton aria-label="Go back" onClick={() => router.back()}>
      {" "}
      ← Back{" "}
    </StyledBackButton>
  );
}
const StyledBackButton = styled.button`
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: 700;
`;
