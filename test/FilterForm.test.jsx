import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterForm from "@/components/Forms/FilterForm";

// --- Mocks ---

// Stable fake emotions from the API
const EMOTIONS = [
  { _id: "e1", emotion: "Happy" },
  { _id: "e2", emotion: "Sad" },
];

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({ data: EMOTIONS, isLoading: false, error: undefined }),
}));

// Render MultiwayButton as a plain <button> (and drop $variant to avoid DOM warnings)
jest.mock("../components/Buttons/MultiwayButton", () => ({
  __esModule: true,
  default: ({ buttonText = "Button", $variant, ...rest }) => (
    <button {...rest}>{buttonText}</button>
  ),
}));

describe("<FilterForm /> — core behavior", () => {
  test("1) renders options from SWR (includes 'Show All' and each emotion)", () => {
    render(
      <FilterForm
        onSubmit={jest.fn()}
        selectedFilterEmotionId="reset"
        setSelectedFilterEmotionId={jest.fn()}
      />
    );

    // The select exists (you can use the aria-label or the <label> text)
    const select = screen.getByLabelText(/filter entries by emotion/i);
    expect(select).toBeInTheDocument();

    // Default option
    expect(
      screen.getByRole("option", { name: /show all/i })
    ).toBeInTheDocument();

    // Options from mocked SWR
    expect(screen.getByRole("option", { name: "Happy" })).toHaveValue("e1");
    expect(screen.getByRole("option", { name: "Sad" })).toHaveValue("e2");
  });

  test("2) submitting calls onSubmit with the selected emotion id", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <FilterForm
        onSubmit={onSubmit}
        selectedFilterEmotionId="reset"
        setSelectedFilterEmotionId={jest.fn()}
      />
    );

    const select = screen.getByLabelText(/filter entries by emotion/i);
    // Choose "Sad" (value "e2")
    await user.selectOptions(select, "e2");

    // Submit via Apply
    await user.click(screen.getByRole("button", { name: /apply/i }));

    // The component builds { emotions: "<id>" } from the form
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ emotions: "e2" });
  });

  test("3) Reset button shows when a filter is active and resets UI and state", async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();

    render(
      <FilterForm
        onSubmit={jest.fn()}
        selectedFilterEmotionId="e1" // active filter => Reset button visible
        setSelectedFilterEmotionId={setSelected}
      />
    );

    const select = screen.getByLabelText(/filter entries by emotion/i);

    // Make sure the Reset button is visible
    const resetBtn = screen.getByRole("button", { name: /reset/i });
    expect(resetBtn).toBeInTheDocument();

    // Simulate the user had chosen something (not strictly required, but realistic)
    await user.selectOptions(select, "e2");
    expect(select).toHaveValue("e2");

    // Click Reset
    await user.click(resetBtn);

    // Parent state setter is called with "reset"
    expect(setSelected).toHaveBeenCalledWith("reset");

    // The form is reset to its initial value -> first option "reset" becomes selected
    expect(select).toHaveValue("reset");
  });
});
