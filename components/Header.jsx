import styled from "styled-components";
import Image from "next/image";

export default function Header() {
  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const hours = now.getHours();
  let greeting;
  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <HeaderContainer>
      <Image
        src="/assets/emu-logo.png"
        alt="logo"
        height={98}
        width={68}
        loading="eager"
      />
      <h5>{formattedDate}</h5>
      <h2>{greeting}, Rita</h2>
      <p>How are you feeling today?</p>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;

  * {
    font-family: "Jost", sans-serif;
    margin: 0;
  }

  h5 {
    color: var(--color-primary);
    font-weight: 500;
    font-size: 16px;
    margin-top: 24px;
  }

  h2 {
    font-weight: 350;
  }

  p {
    font-size: 24px;
    font-weight: 350;
  }
`;
