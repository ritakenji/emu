// test/Bookmark.core.test.jsx
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookmark from "@/components/Bookmark";

const KEY = "bookmark";

/** ---------- Mocks ---------- **/

// Mock the ESM package with a hook that uses React state + localStorage
jest.mock("use-local-storage-state", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (key, options = {}) => {
      const getInitial = () => {
        const raw = global.localStorage.getItem(key);
        return raw != null ? JSON.parse(raw) : options.defaultValue;
      };
      const [state, setState] = React.useState(getInitial);
      React.useEffect(() => {
        global.localStorage.setItem(key, JSON.stringify(state));
      }, [key, state]);
      return [state, setState];
    },
  };
});

// Mock lucide-react so StyledBookmark renders a simple svg we can assert on
jest.mock("lucide-react", () => ({
  __esModule: true,
  BookmarkIcon: ({ fill, ...rest }) => (
    <svg data-testid="bookmark-icon" fill={fill} {...rest} />
  ),
}));

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("<Bookmark /> — core behavior", () => {
  test("initially unbookmarked with correct aria + icon fill; persists default []", async () => {
    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");

    // hook writes defaultValue [] on mount
    await waitFor(() =>
      expect(localStorage.getItem(KEY)).toBe(JSON.stringify([]))
    );
  });

  test("click toggles to bookmarked: aria + icon update; id is stored", async () => {
    const user = userEvent.setup();
    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");

    await act(async () => {
      await user.click(btn);
    });

    const icon = screen.getByTestId("bookmark-icon");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(icon).toHaveAttribute("fill", "black");

    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(KEY))).toEqual(["abc"])
    );
  });

  test("second click removes bookmark: aria + icon revert; storage updated", async () => {
    const user = userEvent.setup();
    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");

    await act(async () => {
      await user.click(btn); // add
      await user.click(btn); // remove
    });

    const icon = screen.getByTestId("bookmark-icon");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");

    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(KEY))).toEqual([])
    );
  });

  test("starts bookmarked when id exists in localStorage", async () => {
    localStorage.setItem(KEY, JSON.stringify(["abc", "xyz"]));
    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(icon).toHaveAttribute("fill", "black");

    // render shouldn't mutate the existing array
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual(["abc", "xyz"]);
  });
});
