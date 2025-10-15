import { useRouter } from "next/router";
import styled from "styled-components";
import { MoveLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <StyledBackButton aria-label="Go back" onClick={() => router.back()}>
      <MoveLeft aria-hidden="true" /> &nbsp; Back{" "}
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
  display: flex;
  align-items: center;
  color: var(--color-dark);
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: var(--color-primary);
  }
`;
