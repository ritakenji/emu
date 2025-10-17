import { useEffect } from "react";
import styled, { css } from "styled-components";

export default function Modal({ onClose, children, $variant }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const scrollY = window.scrollY || window.pageYOffset;

    const origBodyOverflow = document.body.style.overflow;
    const origBodyPosition = document.body.style.position;
    const origBodyTop = document.body.style.top;
    const origBodyWidth = document.body.style.width;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.body.style.position = origBodyPosition;
      document.body.style.top = origBodyTop;
      document.body.style.width = origBodyWidth;
      document.documentElement.style.overflow = origHtmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <>
      <Container aria-labelledby="modal-title" $variant={$variant}>
        {children}
      </Container>
      <Overlay onClick={onClose} aria-hidden="true" />
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--color-dark);
  opacity: 0.7;
  z-index: 999;
  cursor: pointer;
`;

const Container = styled.div.attrs({ role: "dialog", "aria-modal": "true" })`
  background: white;
  position: fixed;
  inset: 20px;
  z-index: 1000;

  max-width: calc(100vw - 40px);
  width: calc(100% - 2rem);
  max-height: calc(100vh - 40px);
  overflow: scroll;

  padding: 2rem;
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (min-width: 768px) {
    inset: 40px;
    max-width: 600px;
    margin: auto;
    border-radius: 1rem;
    padding: 3rem;
  }

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      inset: unset !important;
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%) !important;
    `}
`;
