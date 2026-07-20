'use client';

import Link from 'next/link';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  generateActivity,
  generateStats,
  mulberry32,
  type ActivityItem,
  type DashboardStat,
} from '../lib/data-generators';
import { TimerDisplay } from '../lib/timer-display';
import { useAutoRun, useRenderTimer } from '../lib/use-render-timer';
import theme from '../../lib/theme';

const NAV_ITEMS = [
  { href: '/perf/dashboard', label: 'Overview', icon: '⬡' },
  { href: '/perf/dashboard#analytics', label: 'Analytics', icon: '▲' },
  { href: '/perf/dashboard#users', label: 'Users', icon: '◎' },
  { href: '/perf/dashboard#deploy', label: 'Deployments', icon: '◈' },
  { href: '/perf/dashboard#infra', label: 'Infrastructure', icon: '◰' },
  { href: '/perf/dashboard#logs', label: 'Logs', icon: '≡' },
  { href: '/perf/dashboard#alerts', label: 'Alerts', icon: '◬' },
  { href: '/perf/dashboard#settings', label: 'Settings', icon: '⚙' },
];

const TABLE_HEADERS = [
  'Service',
  'Version',
  'Region',
  'Status',
  'Req/s',
  'P99 (ms)',
  'Error %',
  'Updated',
];

function makeTableRows(count: number, seed?: number) {
  const services = [
    'api-gateway',
    'auth-service',
    'user-service',
    'billing',
    'notifications',
    'search',
    'cdn',
    'db-proxy',
    'cache',
    'queue',
  ];
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
  const rowStatuses = ['healthy', 'degraded', 'deploying', 'offline'] as const;
  const rand = seed !== undefined ? mulberry32(seed) : Math.random;
  return Array.from({ length: count }, (_, i) => { throw new Error("STUB"); });
}

interface DashboardData {
  stats: DashboardStat[];
  activity: ActivityItem[];
  tableRows: ReturnType<typeof makeTableRows>;
}

function freshData(seed?: number): DashboardData {
  return {
    stats: generateStats(8, seed),
    activity: generateActivity(15, seed !== undefined ? seed + 100 : undefined),
    tableRows: makeTableRows(20, seed !== undefined ? seed + 200 : undefined),
  };
}

const initialData = freshData(42);

export default function DashboardPage() {
    throw new Error("STUB");
}

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${p => { throw new Error("STUB"); }};
  font-family: ${p => { throw new Error("STUB"); }};
  margin: calc(-1 * ${theme.spacing.large});
`;

const Sidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;
  background: ${p => { throw new Error("STUB"); }};
  border-right: 1px solid ${p => { throw new Error("STUB"); }};
  display: flex;
  flex-direction: column;
`;

const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 16px;
  border-bottom: 1px solid ${p => { throw new Error("STUB"); }};
`;

const BrandIcon = styled.span`
  font-size: 20px;
  color: ${p => { throw new Error("STUB"); }};
`;

const BrandName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${p => { throw new Error("STUB"); }};
  letter-spacing: -0.02em;
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavItem = styled(Link).attrs<{ $active: boolean }>(({ $active }) => { throw new Error("STUB"); })`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: ${p => { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
  background: ${p => { throw new Error("STUB"); }};
  text-decoration: none;
  transition:
    background 0.12s,
    color 0.12s;

  &:hover {
    background: ${p => { throw new Error("STUB"); }};
    color: ${p => { throw new Error("STUB"); }};
  }

  &[aria-current='page'] {
    border-left: 2px solid ${p => { throw new Error("STUB"); }};
    padding-left: 8px;
  }
`;

const NavIcon = styled.span`
  font-size: 14px;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
`;

const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid ${p => { throw new Error("STUB"); }};
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${p => { throw new Error("STUB"); }};
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 11px;
  color: ${p => { throw new Error("STUB"); }};
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  min-width: 0;
  overflow-x: auto;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
`;

const HeaderLeft = styled.div``;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${p => { throw new Error("STUB"); }};
  margin: 0 0 4px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BreadcrumbItem = styled.span<{ $current?: boolean }>`
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
`;

const BreadcrumbSep = styled.span`
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetaItem = styled.span`
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
`;

const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${p => { throw new Error("STUB"); }};
`;

const RefreshButton = styled.button`
  background: ${p => { throw new Error("STUB"); }};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.12s;

  &:hover {
    opacity: 0.88;
  }

  &:active {
    opacity: 0.75;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const statusColors = {
  ok: 'success',
  warning: 'warning',
  critical: 'danger',
  inactive: 'textMuted',
} as const;

const StatCard = styled.div<{ $status: string }>`
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 8px;
  padding: 16px;
  position: relative;
  overflow: hidden;
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${p => { throw new Error("STUB"); }};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${p => { throw new Error("STUB"); }};
  margin-bottom: 6px;
  letter-spacing: -0.02em;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${p => { throw new Error("STUB"); }};
`;

const StatIndicator = styled.div<{ $status: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background: ${p => {
    throw new Error("STUB");
}};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  align-items: start;
`;

const TableSection = styled.div`
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 8px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${p => { throw new Error("STUB"); }};
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
  margin: 0;
`;

const SectionCount = styled.span`
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const TableRow = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${p => { throw new Error("STUB"); }};

  &:last-child {
    border-bottom: none;
  }

  ${p =>
    { throw new Error("STUB"); }}
`;

const TableHead = styled.th`
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: ${p => { throw new Error("STUB"); }};
  white-space: nowrap;
`;

const TableCell = styled.td<{ $numeric?: boolean }>`
  padding: 10px 12px;
  color: ${p => { throw new Error("STUB"); }};
  white-space: nowrap;
  text-align: ${p => { throw new Error("STUB"); }};
  font-variant-numeric: ${p => { throw new Error("STUB"); }};
`;

const ServiceName = styled.span`
  font-weight: 500;
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 12px;
`;

const VersionTag = styled.span`
  font-size: 11px;
  font-family: ui-monospace, 'SF Mono', monospace;
  color: ${p => { throw new Error("STUB"); }};
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 4px;
  padding: 1px 5px;
`;

const rowStatusStyles = {
  healthy: css`
    background: ${(p: any) => { throw new Error("STUB"); }}22;
    color: ${(p: any) => { throw new Error("STUB"); }};
  `,
  degraded: css`
    background: ${(p: any) => { throw new Error("STUB"); }}22;
    color: ${(p: any) => { throw new Error("STUB"); }};
  `,
  deploying: css`
    background: ${(p: any) => { throw new Error("STUB"); }}22;
    color: ${(p: any) => { throw new Error("STUB"); }};
  `,
  offline: css`
    background: ${(p: any) => { throw new Error("STUB"); }}22;
    color: ${(p: any) => { throw new Error("STUB"); }};
  `,
};

const RowStatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 6px;
  text-transform: capitalize;
  ${p => { throw new Error("STUB"); }}
`;

const ActivitySection = styled.div`
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 8px;
  overflow: hidden;
`;

const ActivityList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ActivityEntry = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid ${p => { throw new Error("STUB"); }};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${p => { throw new Error("STUB"); }};
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityText = styled.div`
  font-size: 13px;
  color: ${p => { throw new Error("STUB"); }};
  margin-bottom: 2px;
`;

const ActivityUser = styled.span`
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
`;

const ActivityTime = styled.div`
  font-size: 11px;
  color: ${p => { throw new Error("STUB"); }};
`;

const StatusBadge = styled.span.attrs<{ $status: string }>(({ $status }) => { throw new Error("STUB"); })`
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  align-self: center;
  ${p => {
        throw new Error("STUB");
    }}
`;
