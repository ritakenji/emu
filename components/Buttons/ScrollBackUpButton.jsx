import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import styled from "styled-components";

export default function ScrollBackUpButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollButton && (
        <ScrollButton onClick={scrollToTop} aria-label="Scroll back to top">
          <MoveUp aria-hidden="true" />
        </ScrollButton>
      )}
    </>
  );
}

const ScrollButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 25px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;
