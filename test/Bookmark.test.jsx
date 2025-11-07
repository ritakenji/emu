import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";

import Bookmark from "@/components/Bookmark";

jest.mock("lucide-react", () => ({
  __esModule: true,
  Heart: ({ "data-testid": dtid, ...rest }) => (
    <svg data-testid={dtid || "bookmark-icon"} {...rest} />
  ),
}));

// Simple fetch mock that echoes back the requested next state
beforeEach(() => {
  global.fetch = jest.fn(async (url, opts) => {
    const body = opts?.body ? JSON.parse(opts.body) : {};
    return {
      ok: true,
      json: async () => ({ entry: { bookmarked: !!body.bookmarked } }),
      text: async () => "ok",
    };
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

// Helper to render with isolated SWR cache
function renderWithSWR(ui) {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>{ui}</SWRConfig>
  );
}

describe("<Bookmark /> — core behavior", () => {
  test("initially unbookmarked with correct aria + icon fill", () => {
    renderWithSWR(<Bookmark id="abc" initialBookmarked={false} />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");
  });

  test("click toggles to bookmarked: aria + icon update", async () => {
    const user = userEvent.setup();
    renderWithSWR(<Bookmark id="abc" initialBookmarked={false} />);

    const btn = screen.getByRole("button");
    const iconBefore = screen.getByTestId("bookmark-icon");
    expect(iconBefore).toHaveAttribute("fill", "white");

    await act(async () => {
      await user.click(btn);
    });

    const iconAfter = screen.getByTestId("bookmark-icon");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(iconAfter).toHaveAttribute("fill", "var(--color-dark)");

    // fetch called once with PUT
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toMatch(
      /\/api\/entries\/abc\/bookmark$/
    );
    expect(global.fetch.mock.calls[0][1].method).toBe("PUT");
  });

  test("second click removes bookmark: aria + icon revert", async () => {
    const user = userEvent.setup();
    renderWithSWR(<Bookmark id="abc" initialBookmarked={false} />);

    const btn = screen.getByRole("button");

    // 1) First click => becomes bookmarked and sets loading (button disabled)
    +(await user.click(btn));
    +(
      // Ensure pressed state showed up
      (+(await screen.findByRole("button", { pressed: true })))
    );
    +(
      // Wait until loading clears so the 2nd click isn't ignored
      (+(await waitFor(() => expect(btn).not.toBeDisabled())))
    );
    +(
      // 2) Now the second click will be processed
      (+(await user.click(btn)))
    );
    +(
      // Wait for reverted state
      (+(await screen.findByRole("button", { pressed: false })))
    );

    const icon = screen.getByTestId("bookmark-icon");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveAttribute("aria-label", "Add bookmark");
    expect(icon).toHaveAttribute("fill", "white");

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("starts bookmarked when initialBookmarked=true", () => {
    renderWithSWR(<Bookmark id="abc" initialBookmarked={true} />);

    const btn = screen.getByRole("button");
    const icon = screen.getByTestId("bookmark-icon");

    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveAttribute("aria-label", "Remove bookmark");
    expect(icon).toHaveAttribute("fill", "var(--color-dark)");
  });
});
