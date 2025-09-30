import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function NavBar() {
  return (
    <Navigation>
      <HomeLink href="/">
        <Image src={"/house.png"} alt="House image" height={30} width={30} />
      </HomeLink>
    </Navigation>
  );
}

const Navigation = styled.div`
  background-color: #8895c9;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

const HomeLink = styled(Link)``;
