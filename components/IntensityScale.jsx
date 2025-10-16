import styled from "styled-components";

export default function IntensityScale({ intensity }) {
  return (
    <StyledIntensity>
      <span>{intensity}</span> / 10
    </StyledIntensity>
  );
}

const StyledIntensity = styled.div`
  color: var(--color-primary);
  font-weight: 700;
  flex-shrink: 0;
  margin-right: 20px;
  line-height: 0.65;

  span {
    font-size: 48px;
  }
`;
