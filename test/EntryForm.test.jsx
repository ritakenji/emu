// test/EntryForm.core.test.jsx
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EntryForm from "@/components/Forms/EntryForm";

// --- Mocks ---

// Provide stable emotion data to the form
const EMOTIONS = [
  { _id: "e1", emotion: "Happy" },
  { _id: "e2", emotion: "Sad" },
];
jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({ data: EMOTIONS, isLoading: false, error: undefined }),
}));

// Make the multiway button act like a normal submit button
jest.mock("../components/Buttons/MultiwayButton", () => ({
  __esModule: true,
  default: ({ buttonText = "Submit", $variant, ...rest }) => (
    <button type="submit" {...rest}>
      {buttonText}
    </button>
  ),
}));

// (Optional) keep alerts observable
const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<EntryForm /> — core behavior", () => {
  test("1) renders emotions and allows (de)selection", async () => {
    const user = userEvent.setup();
    render(
      <EntryForm
        onSubmit={jest.fn()}
        buttonText="Save"
        initialValues={{}}
        formTitle="New entry"
      />
    );

    const happy = screen.getByLabelText("Happy");
    const sad = screen.getByLabelText("Sad");

    // initially unchecked
    expect(happy).not.toBeChecked();
    expect(sad).not.toBeChecked();

    // select & deselect
    await user.click(happy);
    await waitFor(() => expect(happy).toBeChecked());
  });

  test("2) blocks submit when validation fails (no emotion OR no date)", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <EntryForm
        onSubmit={onSubmit}
        buttonText="Save"
        initialValues={{}}
        formTitle="New entry"
      />
    );

    // No emotion selected, no date → alert & no submit
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(alertSpy).toHaveBeenCalledWith(
      "Please select at least one emotion."
    );
    expect(onSubmit).not.toHaveBeenCalled();

    // Select one emotion, still no date → alert & no submit
    await user.click(screen.getByLabelText("Happy"));
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(alertSpy).toHaveBeenCalledWith("Please select date and time.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("3) submits correct payload when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <EntryForm
        onSubmit={onSubmit}
        buttonText="Save"
        initialValues={{ intensity: 5, notes: "" }}
        formTitle="New entry"
      />
    );

    // Select emotion
    await user.click(screen.getByLabelText("Happy"));

    // Change intensity (optional; default is 5)
    const intensity = screen.getByLabelText(/intensity/i, {
      selector: 'input[type="range"]',
    });
    fireEvent.change(intensity, { target: { value: "7" } });

    // Fill notes
    await user.type(screen.getByLabelText(/notes/i), "Feeling great");

    // Set a valid datetime-local value
    const dt = screen.getByLabelText(/date and time/i);
    await user.type(dt, "2025-10-10T12:30");

    // Submit
    await user.click(screen.getByRole("button", { name: /save/i }));

    // Expect onSubmit called with shape produced by the component:
    // { emotions: [full emotion object], intensity: "7", notes, dateTime }
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];

    expect(payload).toMatchObject({
      notes: "Feeling great",
      intensity: "7", // range input returns a string; server can coerce to number
      dateTime: "2025-10-10T12:30",
    });
    // Emotions contains the full object for "Happy"
    expect(payload.emotions).toEqual([EMOTIONS[0]]);
  });
});
