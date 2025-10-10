import styled from "styled-components";

export default function Header() {
  return (
    <HeaderBar>
      <Title>Emu App</Title>
    </HeaderBar>
  );
}

const HeaderBar = styled.header`
  background-color: var(--color-medium);
  margin: 0;
  padding: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;
