import styled, { css } from 'styled-components';

const Button = styled.button<{ $primary?: boolean }>`
  font-size: 16px;
  border-radius: 5px;
  padding: 0.25em 1em;
  margin: 1em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
  cursor: pointer;

  ${props =>
    { throw new Error("STUB"); }};
`;

export default function ButtonExample() {
    throw new Error("STUB");
}
