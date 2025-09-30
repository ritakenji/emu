import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import styles from "@/styles";

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
  background-color: var(--color-medium);
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;


const HomeLink = styled(Link)`
  padding: 0.7rem;
  flex-grow: 1;
  text-align: center;
`;

