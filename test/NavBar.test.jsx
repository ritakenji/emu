import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import NavBar from "@/components/Navbar";

// Mock next/router so we can control pathname per test
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const { useRouter } = require("next/router");

// (Optional) Next.js Link renders <a>, nothing special needed here.

describe("<NavBar />", () => {
  function setPath(pathname) {
    useRouter.mockReturnValue({ pathname });
  }

  test("renders three nav links with accessible names", () => {
    setPath("/");
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create new entry/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /bookmarked entries/i })
    ).toBeInTheDocument();
  });

  test("marks Home as current when pathname === '/'", () => {
    setPath("/");
    render(<NavBar />);
    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toHaveAttribute("aria-current", "page");

    const create = screen.getByRole("link", { name: /create new entry/i });
    const bookmarks = screen.getByRole("link", { name: /bookmarked entries/i });
    expect(create).not.toHaveAttribute("aria-current");
    expect(bookmarks).not.toHaveAttribute("aria-current");
  });

  test("marks Create as current when pathname === '/create'", () => {
    setPath("/create");
    render(<NavBar />);
    expect(
      screen.getByRole("link", { name: /create new entry/i })
    ).toHaveAttribute("aria-current", "page");
  });

  test("marks Bookmarks as current when pathname === '/bookmarks'", () => {
    setPath("/bookmarks");
    render(<NavBar />);
    expect(
      screen.getByRole("link", { name: /bookmarked entries/i })
    ).toHaveAttribute("aria-current", "page");
  });

  // Optional: assert active background style with jest-styled-components
  test("applies active background style to current link", () => {
    setPath("/");
    const { container } = render(<NavBar />);
    const home = screen.getByRole("link", { name: /home/i });
    // The StyledLink applies background when $active=true
    // This checks the computed CSS rule from styled-components
    expect(home).toHaveStyleRule("background", "var(--color-medium)", {
      // because the rule is conditional, styled-components tracks it at the element level
    });
  });
});
