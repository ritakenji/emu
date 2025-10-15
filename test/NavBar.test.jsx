import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "@/components/Navbar";

// Mock router and provide a tiny helper to set pathname
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
const { useRouter } = require("next/router");
function setRouter(pathname = "/") {
  useRouter.mockReturnValue({ pathname });
}

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, onClick, ...props }) => {
    const url = typeof href === "string" ? href : href?.pathname;
    return (
      <a
        href={url}
        onClick={(e) => {
          onClick?.(e);
          e.preventDefault();
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
}));
describe("<NavBar /> — core behavior", () => {
  test("renders links with correct accessible names and hrefs", () => {
    setRouter("/");
    render(<NavBar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(
      screen.getByRole("link", { name: /create new entry/i })
    ).toHaveAttribute("href", "/create");
    expect(
      screen.getByRole("link", { name: /bookmarked entries/i })
    ).toHaveAttribute("href", "/bookmarks");
  });

  test("marks the current route as active via aria-current", () => {
    setRouter("/bookmarks");
    render(<NavBar />);

    expect(
      screen.getByRole("link", { name: /bookmarked entries/i })
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /home/i })).not.toHaveAttribute(
      "aria-current"
    );
  });

  test("clicking Create updates active link after a route change", async () => {
    const user = userEvent.setup();
    setRouter("/");
    const { rerender } = render(<NavBar />);

    await user.click(screen.getByRole("link", { name: /create new entry/i }));

    // simulate navigation finishing
    setRouter("/create");
    rerender(<NavBar />);

    expect(
      screen.getByRole("link", { name: /create new entry/i })
    ).toHaveAttribute("aria-current", "page");
  });

  test("keyboard (Tab → Enter) activates Create", async () => {
    const user = userEvent.setup();
    setRouter("/");
    const { rerender } = render(<NavBar />);

    await user.tab(); // Home
    await user.tab(); // Create
    await user.keyboard("{Enter}");

    setRouter("/create");
    rerender(<NavBar />);

    expect(
      screen.getByRole("link", { name: /create new entry/i })
    ).toHaveAttribute("aria-current", "page");
  });
});
