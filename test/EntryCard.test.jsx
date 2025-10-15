import { render, screen } from "@testing-library/react";
import EntryCard from "../components/EntryCard";

jest.mock("../components/Bookmark", () => ({
  __esModule: true,
  default: ({ id }) => <button data-testid="bookmark" data-id={id} />,
}));

describe("<EntryCard /> core behavior", () => {
  const sample = {
    id: "abc123",
    intensity: 7,
    dateTime: "2025-10-10T12:30",
    type: [
      { _id: "e1", emotion: "Happy" },
      { _id: "e2", emotion: "Sad" },
    ],
  };

  test("1) shows the formatted date/time", () => {
    render(
      <EntryCard
        id={sample.id}
        intensity={sample.intensity}
        dateTime={sample.dateTime}
        type={sample.type}
      />
    );

    const expected = new Date(sample.dateTime).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  test("2) shows intensity as '<value> / 10'", () => {
    render(
      <EntryCard
        id={sample.id}
        intensity={sample.intensity}
        dateTime={sample.dateTime}
        type={sample.type}
      />
    );

    expect(screen.getByText(String(sample.intensity))).toBeInTheDocument();
    expect(screen.getByText("/ 10", { exact: false })).toBeInTheDocument();
  });

  test("3) renders emotion chips and applies lowercase class names", () => {
    render(
      <EntryCard
        id={sample.id}
        intensity={sample.intensity}
        dateTime={sample.dateTime}
        type={sample.type}
      />
    );

    const happy = screen.getByText("Happy");
    const sad = screen.getByText("Sad");

    expect(happy).toBeInTheDocument();
    expect(sad).toBeInTheDocument();

    expect(happy).toHaveClass("happy");
    expect(sad).toHaveClass("sad");
  });

  test("renders the Bookmark child and passes the id", () => {
    render(
      <EntryCard
        id={sample.id}
        intensity={sample.intensity}
        dateTime={sample.dateTime}
        type={sample.type}
      />
    );
    const bookmark = screen.getByTestId("bookmark");
    expect(bookmark).toBeInTheDocument();
    expect(bookmark).toHaveAttribute("data-id", sample.id);
  });
});
