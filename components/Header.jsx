import styled from "styled-components";
import styles from "@/styles";

export default function Header() {
  return <Title>Emu App</Title>;
}

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  background-color: var(--color-medium);
  margin: 0;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
`;
