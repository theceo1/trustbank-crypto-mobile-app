import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  maxButtons?: number;
  style?: any;
}

export function Pagination({ current, total, onChange, maxButtons = 5, style }: PaginationProps) {
  // Calculate page numbers to display
  const getPages = () => {
    const pages = [];
    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;
    if (end > total) {
      end = total;
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
  const pages = getPages();

  return (
    <View style={[styles.container, style]}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[styles.arrowBtn, current <= 1 && styles.disabledBtn]}
        onPress={() => current > 1 && onChange(current - 1)}
        disabled={current <= 1}
        accessibilityLabel="Go to previous page"
      >
        <Feather name="chevron-left" size={22} color={current <= 1 ? '#ccc' : '#333'} />
      </TouchableOpacity>

      {/* First Page & Ellipsis */}
      {pages[0] > 1 && (
        <>
          <PageBtn page={1} active={current === 1} onPress={onChange} />
          {pages[0] > 2 && <Ellipsis />}
        </>
      )}

      {/* Page Numbers */}
      {pages.map(page => (
        <PageBtn key={page} page={page} active={current === page} onPress={onChange} />
      ))}

      {/* Last Page & Ellipsis */}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && <Ellipsis />}
          <PageBtn page={total} active={current === total} onPress={onChange} />
        </>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.arrowBtn, current >= total && styles.disabledBtn]}
        onPress={() => current < total && onChange(current + 1)}
        disabled={current >= total}
        accessibilityLabel="Go to next page"
      >
        <Feather name="chevron-right" size={22} color={current >= total ? '#ccc' : '#333'} />
      </TouchableOpacity>
    </View>
  );
}

function PageBtn({ page, active, onPress }: { page: number; active: boolean; onPress: (page: number) => void }) {
  return (
    <TouchableOpacity
      style={[styles.pageBtn, active && styles.activePageBtn]}
      onPress={() => onPress(page)}
      accessibilityLabel={active ? `Current page, page ${page}` : `Go to page ${page}`}
      disabled={active}
      activeOpacity={0.7}
    >
      <Text style={[styles.pageText, active && styles.activePageText]}>{page}</Text>
    </TouchableOpacity>
  );
}

function Ellipsis() {
  return (
    <View style={styles.ellipsisBox} accessibilityElementsHidden>
      <Feather name="more-horizontal" size={20} color="#888" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  arrowBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  pageBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activePageBtn: {
    backgroundColor: '#e8f0fe',
    borderColor: '#007aff',
  },
  pageText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  activePageText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  ellipsisBox: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
