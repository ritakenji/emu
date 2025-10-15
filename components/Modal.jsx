import { useEffect } from "react";
import styled from "styled-components";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <Container aria-labelledby="modal-title">{children}</Container>
      <Overlay onClick={onClose} aria-hidden="true" />
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #4363ED;
  opacity: 0.3;
  z-index: 999;
  cursor: pointer;
`;

const Container = styled.div.attrs({ role: "dialog", "aria-modal": "true" })`
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 2rem;
  border-radius: 0.75rem;
  max-width: 40rem;
  width: calc(100% - 2rem);
`;
