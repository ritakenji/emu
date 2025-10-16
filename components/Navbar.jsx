import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Heart, House, Plus } from "lucide-react";

export default function NavBar() {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const isBookmarks = pathname === "/bookmarks";
  const isCreate = pathname === "/create";

  return (
    <Navigation>
      <StyledNavLink
        href="/"
        aria-current={isHome ? "page" : undefined}
        $active={isHome}
        aria-label="Home"
      >
        <StyledHouse $active={isHome} />
      </StyledNavLink>
      <StyledNavButton
        href="/create"
        aria-current={isCreate ? "page" : undefined}
        $active={isCreate}
        aria-label="Create new entry"
      >
        <StyledCreate $active={isCreate} />
      </StyledNavButton>
      <StyledNavLink
        href="/bookmarks"
        aria-current={isBookmarks ? "page" : undefined}
        $active={isBookmarks}
        aria-label="Bookmarked entries"
      >
        <StyledBookmark $active={isBookmarks} />
      </StyledNavLink>
    </Navigation>
  );
}

const Navigation = styled.nav`
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const StyledNavLink = styled(Link)`
  padding: 0.7rem;
  flex-grow: 1;
  text-align: center;
`;

const StyledNavButton = styled(Link)`
  flex-grow: 0;
  margin-top: -36px;
`;

const iconCss = css`
  width: 30px;
  height: 30px;
  stroke: var(--color-dark);
`;

const StyledHouse = styled(House)`
  ${iconCss}
  stroke: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-medium)"};
  stroke-width: 1.8px;
`;

const StyledCreate = styled(Plus)`
  ${iconCss}
  background-color: var(--color-primary);
  box-sizing: unset;
  width: 40px;
  height: 40px;
  padding: 12px;
  stroke: #fff;
  stroke-width: 1.5px;
  border-radius: 32px;
  border: 6px solid var(--color-light);
`;

const StyledBookmark = styled(Heart)`
  ${iconCss}
  stroke: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-medium)"};
  stroke-width: 1.8px;
`;
