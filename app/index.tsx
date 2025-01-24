import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '../components/nativewindui/Text';
import { useColorScheme } from '../lib/useColorScheme';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from '@/components/nativewindui/ActivityIndicator';
import FullPageLoader from '@/components/FullPageLoader';
import ScreenWrapper from '@/components/ScreenWrapper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/utils';
import ArchBorder from '@/components/ArchBorder';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

export default function index() {
  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={COMPONENTS}
      estimatedItemSize={200}
      contentContainerClassName="py-4"
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}
//feat/splash-screen

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  const { t } = useTranslation();
  return (
    <ScreenWrapper>
      <ArchBorder>
        <></>
      </ArchBorder>
    </ScreenWrapper>
  );
}

type ComponentItem = { name: string; component: React.FC };

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <Card title={item.name}>
      <item.component />
    </Card>
  );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View className="px-4">
      <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
        {children}
      </View>
    </View>
  );
}

const COMPONENTS: ComponentItem[] = [];
