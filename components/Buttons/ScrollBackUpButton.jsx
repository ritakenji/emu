import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import styled from "styled-components";

export default function ScrollBackUpButton () {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for a smooth scrolling effect
    });
  };

    useEffect(() => {
    const handleScroll = () => {
      // Show button if page scroll is more than 300px
      if (window.scrollY > 300) { 
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollButton && (
        <ScrollButton onClick={scrollToTop}>
          <MoveUp aria-hidden="true"/>Back to Top
        </ScrollButton>
      )}
    </>
  );
}

const ScrollButton = styled.button`
  position: fixed; 
  bottom: 110px; /* Adjust based on NavBar height */
  right: 20px;
  background-color: var(--color-primary); /* Use a color from your theme */
  color: white;
  border: none;
  border-radius: 50%; /* Make it circular */
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000; 
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;