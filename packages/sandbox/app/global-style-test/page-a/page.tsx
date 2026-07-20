import styled from 'styled-components';
import { HintText } from '../../components/test-ui';

export default function PageA() {
    throw new Error("STUB");
}

const Card = styled.div`
  background: var(--sc-colors-surface, #f9fafb);
  border-radius: 10px;
  padding: 24px;
  border: 1px solid var(--sc-colors-border, #e5e7eb);
`;

const Text = styled.p`
  line-height: 1.7;
  margin-bottom: 16px;
  color: var(--sc-colors-textMuted, #6b7280);
  font-size: 14px;
`;
