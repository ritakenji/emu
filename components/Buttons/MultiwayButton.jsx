import styled, { css } from "styled-components";

export default function MultiwayButton({
  onClick,
  $variant,
  buttonText,
  type,
}) {
  return (
    <StyledMultiwayButton onClick={onClick} type={type} $variant={$variant}>
      {buttonText}
    </StyledMultiwayButton>
  );
}
const StyledMultiwayButton = styled.button`
  padding: 8px 15px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  font-size: 16px;
  font-family: "Inter", sans-serif;

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      background-color: var(--color-primary);
      color: #fff;

      &:hover {
        border: 2px solid var(--color-primary-darker);
        background-color: var(--color-primary-darker);
      }
    `}

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      color: var(--color-primary);
      background-color: transparent;

      &:hover {
        color: #fff;
        background-color: var(--color-primary);
      }
    `}
`;
