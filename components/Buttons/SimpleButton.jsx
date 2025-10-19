import { useRouter } from "next/router";
import styled from "styled-components";

export default function SimpleButton({ onClick, ariaText, children }) {
  const router = useRouter();
  return (
    <StyledSimpleButton aria-label={ariaText} onClick={onClick}>
      {children}
    </StyledSimpleButton>
  );
}
const StyledSimpleButton = styled.button`
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
