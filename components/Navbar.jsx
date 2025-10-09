import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { BookmarkIcon, House, PlusCircle } from "lucide-react";

export default function NavBar() {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const isBookmarks = pathname === "/bookmarks";
  const isCreate = pathname === "/create";

  return (
    <Navigation role="navigation" aria-label="Main navigation">
      <StyledLink
        href="/"
        aria-current={isHome ? "page" : undefined}
        $active={isHome}
        aria-label="Home"
      >
        <StyledHouse $active={isHome} />
      </StyledLink>
      <StyledLink
        href="/create"
        aria-current={isCreate ? "page" : undefined}
        $active={isCreate}
        aria-label="Create new entry"
      >
        <StyledCreate $active={isCreate} />
      </StyledLink>
      <StyledLink
        href="/bookmarks"
        aria-current={isBookmarks ? "page" : undefined}
        $active={isBookmarks}
        aria-label="Bookmarked entries"
      >
        <StyledBookmark $active={isBookmarks} />
      </StyledLink>
    </Navigation>
  );
}

const Navigation = styled.nav`
  background-color: var(--color-light);
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const StyledLink = styled(Link)`
  padding: 0.7rem;
  flex-grow: 1;
  text-align: center;
  ${({ $active }) =>
    $active &&
    css`
      background: var(--color-medium);
    `}
`;
const iconCss = css`
  width: 30px;
  height: 30px;
  stroke: var(--color-dark);
`;

const StyledHouse = styled(House)`
  ${iconCss}
`;

const StyledCreate = styled(PlusCircle)`
  ${iconCss}
`;

const StyledBookmark = styled(BookmarkIcon)`
  ${iconCss}
`;
