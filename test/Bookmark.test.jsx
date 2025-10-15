// test/Bookmark.core.test.jsx
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookmark from "@/components/Bookmark";

/** ---------- Refactored Mock State Control ---------- **/

let mockBookmarkState = []; // The state the component "reads"
let mockSetBookmarkState; // The jest function to spy on the component's state updates

/**
 * Refactored Mock: Controls the state read and spies on the state writes.
 */
jest.mock("use-local-storage-state", () => ({
  __esModule: true,
  // The default export is a hook that returns [state, setState]
  default: () => [mockBookmarkState, mockSetBookmarkState],
}));

/** ---------- Mocks (Unchanged) ---------- **/

// Mock lucide-react so StyledBookmark renders a simple svg we can assert on
jest.mock("lucide-react", () => ({
  __esModule: true,
  BookmarkIcon: ({ fill, ...rest }) => (
    <svg data-testid="bookmark-icon" fill={fill} {...rest} />
  ),
}));

/** ---------- Setup/Teardown ---------- **/

beforeEach(() => {
  // 1. Reset the internal state for each test
  mockBookmarkState = [];

  // 2. Initialize the setter as a spy function that also updates the mock state
  mockSetBookmarkState = jest.fn((newStateOrFn) => {
    if (typeof newStateOrFn === "function") {
      // If a function is passed (e.g., prevState => newState), execute it
      mockBookmarkState = newStateOrFn(mockBookmarkState);
    } else {
      // Otherwise, just set the new state
      mockBookmarkState = newStateOrFn;
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

/** ---------- Tests (Refactored) ---------- **/

describe("<Bookmark /> — core behavior", () => {
  test("initially unbookmarked with correct aria + icon fill", () => {
    // mockBookmarkState starts as [] (unbookmarked)
    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");

    // No assertion on persistence, adhering to teacher feedback
  });

  test("click toggles to bookmarked: aria + icon update; setter called correctly", async () => {
    const user = userEvent.setup();
    // Capture the 'rerender' function
    const { rerender } = render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");

    await act(async () => {
      await user.click(btn);
      // CRITICAL FIX: Manually force a re-render to pick up the updated mockBookmarkState
      rerender(<Bookmark id="abc" />);
    });

    const icon = screen.getByTestId("bookmark-icon");

    // UI Assertions
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(icon).toHaveAttribute("fill", "black");

    // Mock Setter Assertion
    expect(mockSetBookmarkState).toHaveBeenCalledTimes(1);
    expect(mockBookmarkState).toEqual(["abc"]);
  });

  test("second click removes bookmark: aria + icon revert; setter called correctly", async () => {
    const user = userEvent.setup();
    // Capture the 'rerender' function
    const { rerender } = render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");

    await act(async () => {
      await user.click(btn); // 1. Add
      rerender(<Bookmark id="abc" />); // Update UI after first click

      await user.click(btn); // 2. Remove
      rerender(<Bookmark id="abc" />); // Update UI after second click
    });

    const icon = screen.getByTestId("bookmark-icon");

    // UI Assertions
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");

    // Mock Setter Assertion: Two clicks means two calls
    expect(mockSetBookmarkState).toHaveBeenCalledTimes(2);

    // Verify the state was updated back to empty in our mock environment
    expect(mockBookmarkState).toEqual([]);
  });

  test("starts bookmarked when id exists in mock state", () => {
    // Manually set the mock state to simulate a bookmarked item
    mockBookmarkState = ["abc", "xyz"];

    render(<Bookmark id="abc" />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    // UI Assertions
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(icon).toHaveAttribute("fill", "black");

    // State should be unchanged
    expect(mockBookmarkState).toEqual(["abc", "xyz"]);
  });
});
