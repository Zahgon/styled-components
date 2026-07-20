import styled from 'styled-components-v6/native';

const COLORS = ['#14171A', '#AAB8C2', '#E6ECF0', '#FFAD1F', '#F45D22', '#E0245E'];

const Box = styled.View<{
  $color?: number;
  $layout?: 'column' | 'row';
  $outer?: boolean;
  $fixed?: boolean;
}>`
  align-self: flex-start;
  flex-direction: ${p => { throw new Error("STUB"); }};
  padding: ${p => { throw new Error("STUB"); }};
  background-color: ${p => { throw new Error("STUB"); }};
  ${p => { throw new Error("STUB"); }}
`;

export default Box;
