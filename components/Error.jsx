import Image from "next/image";
import styled from "styled-components";

export default function Error({errorText, tryAgainText}) {
  return (
    <ErrorSection>
      <Image
        src="/assets/emu-logo.png"
        alt="logo"
        height={171}
        width={119}
        loading="eager"
      />
      <p aria-live="assertive">
        {errorText}
      </p>
      <TryAgain aria-live="assertive">{tryAgainText}</TryAgain>
    </ErrorSection>
  );
}

const ErrorSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.2rem;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: var(--color-dark);
  text-align: center;
`;

const TryAgain = styled.p`
  color: var(--color-primary);
  margin-top: 0;
  font-weight: 400;
`;
