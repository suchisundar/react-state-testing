import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Helper function to move in the carousel
function clickArrow(container, direction) {
  const arrow = container.querySelector(`.bi-arrow-${direction}-circle`);
  fireEvent.click(arrow);
}

// Test if Carousel renders without crashing
test('should render without crashing', () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// Test if Carousel matches snapshot
test("matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

// Test right arrow functionality
it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Check first image and click right arrow
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  clickArrow(container, "right");
  
  // Check second image
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// Test left arrow functionality
it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move forward to the second image
  clickArrow(container, "right");
  
  // Check second image and click left arrow
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
  clickArrow(container, "left");

  // Check first image again
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
});

// Test arrow visibility on first and last images
it("back arrow missing on first image and forward arrow missing on last image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Check first image and arrow visibility
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-right-circle")).toBeInTheDocument();

  // Move to the last image and check arrow visibility
  clickArrow(container, "right");
  clickArrow(container, "right");
  
  expect(container.querySelector('img[alt="testing image 3"]')).toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
});
