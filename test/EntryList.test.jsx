// test/EntryList.core.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import EntryList from "../components/Lists/EntryList";

// ---- Router + Link mocks ----
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
const { useRouter } = require("next/router");

// Make <Link> a simple <a> and simulate SPA navigation by calling router.push
jest.mock("next/link", () => ({
  __esModule: true,
  default: React.forwardRef(function MockNextLink(
    { href, onClick, children, ...props },
    ref
  ) {
    const { useRouter } = require("next/router");
    const router = useRouter();
    const url = typeof href === "string" ? href : href?.pathname || "";
    function handleClick(e) {
      onClick?.(e);
      e?.preventDefault?.(); // avoid jsdom navigation
      router?.push?.(url, {}, {}); // observable navigation intent
    }
    return (
      <a ref={ref} href={url} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }),
}));
jest.mock("../components/EntryCard", () => ({
  __esModule: true,
  default: ({ id }) => <div data-testid={`entry-card-${id}`} />,
}));

function setRouter(overrides = {}) {
  const push = jest.fn();
  useRouter.mockReturnValue({ push, ...overrides });
  return { push };
}

// Sample data
const entries = [
  {
    _id: "a1",
    emotions: [{ _id: "e1", emotion: "Happy" }],
    intensity: 6,
    dateTime: "2025-10-15T10:30:00.000Z",
  },
  {
    _id: "b2",
    emotions: [{ _id: "e2", emotion: "Sad" }],
    intensity: 3,
    dateTime: "2025-09-01T08:00:00.000Z",
  },
];

describe("<EntryList /> — core behavior", () => {
  test("1) renders one list item/link per entry", () => {
    setRouter();
    render(<EntryList entries={entries} />);

    // There is a link wrapping each EntryCard
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(entries.length);

    // (Optional) list items count too
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(entries.length);
  });

  test("2) each link has correct href and accessible name (aria-label with en-GB date)", () => {
    setRouter();
    render(<EntryList entries={entries} />);

    const links = screen.getAllByRole("link");
    links.forEach((link, i) => {
      const { _id, dateTime } = entries[i];
      const expectedHref = `/${_id}`;
      const formatted = new Date(dateTime).toLocaleDateString("en-GB");
      const expectedLabel = `View details for entry on ${formatted}`;

      expect(link).toHaveAttribute("href", expectedHref);
      // Because you set aria-label on the Link, it becomes the accessible name
      expect(link).toHaveAccessibleName(expectedLabel);
    });
  });

  test("3) clicking a link triggers navigation intent to the correct detail page", async () => {
    const user = userEvent.setup();
    const { push } = setRouter();
    render(<EntryList entries={entries} />);

    const firstLink = screen.getAllByRole("link")[0];
    await user.click(firstLink);

    expect(push).toHaveBeenCalledWith(
      `/${entries[0]._id}`,
      expect.anything(),
      expect.anything()
    );
  });
});
