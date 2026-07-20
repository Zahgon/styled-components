import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Benchmark, { type BenchmarkResult, forceGc, startProfile, stopProfile } from './Benchmark';
import implementations, { type Implementation } from '../impl';
import tests, { type BenchCase } from '../tests';

const RECEIVER_URL = 'http://127.0.0.1:9999';
const HEALTH_TIMEOUT_MS = 1500;

interface Result {
  caseName: string;
  implName: string;
  result: BenchmarkResult;
  ts: number;
}

interface Job {
  caseName: string;
  impl: Implementation;
}

interface State {
  selectedCase: string;
  selectedImpl: string;
  status: 'idle' | 'running' | 'cooldown';
  results: Result[];
  queue: Job[];
  autoMode: 'pending' | 'on' | 'off';
}

const COOLDOWN_MS = 250;

const checkReceiverHealth = async (): Promise<boolean> => {
    throw new Error("STUB");
};

interface RunConfig {
  tag: string;
  libs: string[]; // empty = all libs
  cases?: string[]; // when set, only run these cases; empty = all
  profile?: boolean; // when true, sample-profile each (matching) case
  profileCases?: string[]; // when set, only profile these cases; empty = all
}

const fetchRunConfig = async (): Promise<RunConfig> => {
    throw new Error("STUB");
};

const postReceiver = async (path: string, body: unknown): Promise<void> => {
    throw new Error("STUB");
};

export default class App extends React.Component<{}, State> {
  private benchRef = React.createRef<Benchmark>();
  private cooldownTimer: ReturnType<typeof setTimeout> | null = null;

  private runConfig: RunConfig = { tag: 'combined', libs: [] };

  state: State = {
    selectedCase: Object.keys(tests)[0],
    selectedImpl: implementations[0].name,
    status: 'idle',
    results: [],
    queue: [],
    autoMode: 'pending',
  };

  async componentDidMount() {
      throw new Error("STUB");
  }

  componentWillUnmount() {
      throw new Error("STUB");
  }

  private profilingActive = false;

  private shouldProfileCase = (caseName: string): boolean => {
      throw new Error("STUB");
  };

  private runJob = (job: Job) => {
      throw new Error("STUB");
  };

  private handleRunOne = () => {
      throw new Error("STUB");
  };

  private handleRunAll = () => {
      throw new Error("STUB");
  };

  private handleStop = () => {
      throw new Error("STUB");
  };

  private handleClear = () => {
      throw new Error("STUB");
  };

  private handleComplete = (result: BenchmarkResult) => {
      throw new Error("STUB");
  };

  private getActiveCase(): { caseName: string; testCase: BenchCase; impl: Implementation } | null {
      throw new Error("STUB");
  }

  render() {
      throw new Error("STUB");
  }
}

// Bucket results by caseName, then sort each bucket by median ascending so
// the fastest implementation per case is at the top. Cases preserve the
// order they were first run in (insertion order of caseName encounter).
function groupResultsByCase(results: Result[]): Record<string, Result[]> {
    throw new Error("STUB");
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0b0d10' },
  scroll: { padding: 16, paddingBottom: 80 },
  title: { color: '#fff', fontSize: 22, fontWeight: '600' },
  subtle: { color: '#7a8390', fontSize: 12, marginTop: 4 },
  sectionLabel: {
    color: '#a0a8b4',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#1a1f26',
    borderWidth: 1,
    borderColor: '#2a313b',
  },
  chipActive: { backgroundColor: '#2a3a5e', borderColor: '#3b5489' },
  chipPressed: { opacity: 0.6 },
  chipDisabled: { opacity: 0.5 },
  chipText: { color: '#cbd2dd', fontSize: 12 },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  controls: { flexDirection: 'row', gap: 8, marginTop: 16 },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#1a1f26',
    borderWidth: 1,
    borderColor: '#2a313b',
  },
  buttonPrimary: { backgroundColor: '#2563eb', borderColor: '#3b82f6' },
  buttonDanger: { backgroundColor: '#b91c1c', borderColor: '#dc2626' },
  buttonPressed: { opacity: 0.7 },
  buttonText: { color: '#cbd2dd', fontSize: 13, fontWeight: '500' },
  buttonTextPrimary: { color: '#fff', fontSize: 13, fontWeight: '600' },
  status: { color: '#cbd2dd', fontSize: 12 },
  previewFrame: {
    height: 240,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a313b',
    backgroundColor: '#0f1318',
    overflow: 'hidden',
  },
  previewClip: { flex: 1 },
  resultGroup: { marginBottom: 12 },
  resultGroupHeader: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  result: { backgroundColor: '#161a20', padding: 10, borderRadius: 6, marginBottom: 4 },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  resultLib: { color: '#cbd2dd', fontSize: 12, fontWeight: '600' },
  resultMedian: { color: '#22c55e', fontSize: 13, fontWeight: '700', fontFamily: 'Menlo' },
  resultBody: { color: '#9aa5b3', fontSize: 11, fontFamily: 'Menlo' },
});
