'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

export default function NavClient() {
    throw new Error("STUB");
}

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  color: ${p => { throw new Error("STUB"); }};
  background: ${p =>
    { throw new Error("STUB"); }};
  border: 1px solid
    ${p => { throw new Error("STUB"); }};
  transition: background 0.15s;

  &:hover {
    background: ${p =>
      { throw new Error("STUB"); }};
  }
`;
