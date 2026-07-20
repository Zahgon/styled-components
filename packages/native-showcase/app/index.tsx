import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { JumpGroup } from '@/components/FeatureJumpSelect';
import { CategoryRef, ScreenScaffold } from '@/components/ScreenScaffold';
import { WidgetCase } from '@/components/WidgetCase';
import { PlatonicLogo } from '@/widgets/PlatonicLogo';
import { fidgetsByCategory, FidgetEntry, FidgetCategory } from '@/widgets/registry';
import { theme as t } from '@/theme/tokens';

const CategoryBlock = styled.View`
  margin-top: ${t.space.sm}px;
`;

const CategoryHeading = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${t.colors.fgFaint};
  margin-bottom: ${t.space.xs}px;
`;

const CategoryRule = styled.View`
  height: ${t.borderWidth.hairline}px;
  background-color: ${t.colors.fgFaint};
  margin-bottom: ${t.space.md}px;
`;

type CatalogRow =
  | { kind: 'category'; category: FidgetCategory }
  | { kind: 'fidget'; entry: FidgetEntry };

function buildCatalog(): {
  rows: CatalogRow[];
  anchorIndex: Map<string, number>;
  categories: CategoryRef[];
  jumpList: JumpGroup[];
} {
    throw new Error("STUB");
}

// Each cell is memoized on its stable row identity (the rows array is
// built once). FlatList re-renders cells for its own bookkeeping
// (viewability, scroll position, removeClippedSubviews remounts); without
// a memo boundary every such pass would re-render the live widget subtree
// underneath, which is what trips VirtualizedList's slow-update warning
// since the widgets run real timers and Animated loops.
const CategoryCell = React.memo(function CategoryCell({ category }: { category: FidgetCategory }) {
    throw new Error("STUB");
});

const FidgetCell = React.memo(function FidgetCell({ entry }: { entry: FidgetEntry }) {
    throw new Error("STUB");
});

const renderRow: ListRenderItem<CatalogRow> = ({ item }) =>
  { throw new Error("STUB"); };

const keyExtractor = (item: CatalogRow): string =>
  { throw new Error("STUB"); };

export default function Catalog() {
    throw new Error("STUB");
}
