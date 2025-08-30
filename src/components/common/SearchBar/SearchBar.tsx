import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { spacing } from '@/src/styles/spacing';
import Input from '@/src/components/common/Input/Input';
import { Search, Filter, X } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilter?: () => void;
  onClear?: () => void;
  showFilter?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onFilter,
  onClear,
  showFilter = true,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          label=""
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          icon={<Search size={20} color={colors.gray[400]} />}
        />
        
        {value.length > 0 && onClear && (
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <X size={18} color={colors.gray[500]} />
          </TouchableOpacity>
        )}
      </View>

      {showFilter && onFilter && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
          <Filter size={20} color={colors.primary[600]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    padding: spacing.xs,
  },
  filterButton: {
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
});