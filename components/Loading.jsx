import Image from "next/image";
import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingSection>
      <Image src="/assets/emu-logo.png" alt="logo" height={171} width={119} />
      <p aria-live="polite">Loading...</p>
    </LoadingSection>
  );
}

const LoadingSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 32px;
  color: var(--color-primary);
`;
