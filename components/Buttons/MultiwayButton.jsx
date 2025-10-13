import { useRouter } from "next/router";
import styled, { css } from "styled-components";

export default function MultiwayButton({ onClick, $variant, buttonText }) {
  // const router = useRouter();
  return (
    <StyledMultiwayButton onClick={onClick} type="button" $variant={$variant}>
      {buttonText}
    </StyledMultiwayButton>
  );
}
const StyledMultiwayButton = styled.button`
  background-color: white;
  padding: 0.8rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  text-align: center;
  cursor: pointer;

  ${({ $variant }) =>
    $variant === "deleteAndCancel" &&
    css`
      background-color: lightgray;
      color: red;
    `}
  ${({ $variant }) =>
    $variant === "edit" &&
    css`
      background-color: lightblue;
      border: 1px solid black;
      color: yellow;
    `}
`;
