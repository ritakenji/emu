import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { BookmarkIcon, House } from "lucide-react";

export default function NavBar() {
  const { pathname } = useRouter(); // e.g. "/" or "/bookmarks"
  const isHome = pathname === "/";
  const isBookmarks = pathname === "/bookmarks";

  return (
    <Navigation>
      <StyledLink
        href="/"
        aria-current={isHome ? "page" : undefined}
        $active={isHome}
      >
        <StyledHouse $active={isHome} />
      </StyledLink>
      <StyledLink
        href="/bookmarks"
        aria-current={isBookmarks ? "page" : undefined}
        $active={isBookmarks}
      >
        <StyledBookmark $active={isBookmarks} />
      </StyledLink>
    </Navigation>
  );
}

const Navigation = styled.div`
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
  stroke: ${({ $active }) => ($active ? "var(--color-primary)" : "black")};
`;

const StyledHouse = styled(House)`
  ${iconCss}
`;
const StyledBookmark = styled(BookmarkIcon)`
  ${iconCss}
`;
