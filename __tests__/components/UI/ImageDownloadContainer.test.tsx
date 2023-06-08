import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { saveAs } from "file-saver";
import ImageDownloadContainer from "@/components/UI/ImageDownloadContainer";

// Mock the saveAs function from file-saver
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

test("calls saveAs function with correct parameters when download button is clicked", () => {
  const imageData = {
    byte64Uri: "base64Uri",
    fileName: "example",
  };

  render(
    <ImageDownloadContainer downloadImageData={imageData}>
      <img src={`data:image/jpeg;base64,123`} alt={"text alt"} />
    </ImageDownloadContainer>
  );

  const downloadButton = screen.getByRole("button");
  fireEvent.click(downloadButton);

  expect(saveAs).toHaveBeenCalledWith("data:image/jpeg;base64,base64Uri", "example.jpeg");
});
