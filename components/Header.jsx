import styled from "styled-components";

export default function Header() {
  return <Title>Emu App</Title>;
}

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  background-color: #e8e8e8;
  margin: 0;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
