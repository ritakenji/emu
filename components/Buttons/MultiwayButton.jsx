import styled, { css } from "styled-components";

export default function MultiwayButton({ onClick, $variant, buttonText }) {
  return (
    <StyledMultiwayButton onClick={onClick} type="button" $variant={$variant}>
      {buttonText}
    </StyledMultiwayButton>
  );
}
const StyledMultiwayButton = styled.button`
  padding: 0.8rem;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  font-size: 16px;
  font-family: "Inter", sans-serif;

  ${({ $variant }) =>
    $variant === "edit" &&
    css`
      background-color: var(--color-primary);
      color: #fff;

      &:hover {
        border: 2px solid var(--color-primary-darker);
        background-color: var(--color-primary-darker);
      }
    `}

  ${({ $variant }) =>
    $variant === "deleteAndCancel" &&
    css`
      color: var(--color-primary);
      background-color: transparent;

      &:hover {
        color: #fff;
        background-color: var(--color-primary);
      }
    `}
`;
