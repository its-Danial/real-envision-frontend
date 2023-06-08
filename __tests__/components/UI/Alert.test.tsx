import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Alert, { AlertProps } from "@/components/UI/Alert";

describe("Alert", () => {
  const defaultProps: AlertProps = {
    message: "This is a test alert",
    type: "info",
    show: true,
    onHideClick: jest.fn(),
  };

  test("renders the alert message", () => {
    render(<Alert {...defaultProps} />);
    const alertMessage = screen.getByText(defaultProps.message);
    expect(alertMessage).toBeInTheDocument();
  });

  test("calls onHideClick when the hide button is clicked", () => {
    render(<Alert {...defaultProps} />);
    const hideButton = screen.getByText("Hide");
    fireEvent.click(hideButton);
    expect(defaultProps.onHideClick).toHaveBeenCalledTimes(1);
  });

  test("does not render the alert when show is false", () => {
    const props: AlertProps = {
      ...defaultProps,
      show: false,
    };
    render(<Alert {...props} />);
    const alertElement = screen.queryByTestId("alert");
    expect(alertElement).toBeNull();
  });
});
