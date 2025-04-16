import * as React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type CalendarProps = {
  // Optionally accept a date or onChange handler
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function Calendar({}: CalendarProps) {
  const [current, setCurrent] = React.useState(() => {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() };
  });

  const daysInMonth = getDaysInMonth(current.year, current.month);
  const firstDay = getFirstDayOfWeek(current.year, current.month);
  const weeks: (number | null)[][] = [];
  let day = 1 - firstDay;
  while (day <= daysInMonth) {
    const week: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }

  const handlePrev = () => {
    setCurrent((prev) => {
      const newMonth = prev.month - 1;
      if (newMonth < 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: newMonth };
    });
  };
  const handleNext = () => {
    setCurrent((prev) => {
      const newMonth = prev.month + 1;
      if (newMonth > 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: newMonth };
    });
  };

  const monthLabel = new Date(current.year, current.month).toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrev} style={styles.iconBtn}>
          <Feather name="chevron-left" size={20} color="#555" />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <TouchableOpacity onPress={handleNext} style={styles.iconBtn}>
          <Feather name="chevron-right" size={20} color="#555" />
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {daysShort.map((d) => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>
      {weeks.map((week, i) => (
        <View key={i} style={styles.weekRow}>
          {week.map((d, j) => (
            <View key={j} style={styles.dayCell}>
              {d ? (
                <Text style={[styles.dayText, isToday(new Date(current.year, current.month, d)) && styles.todayText]}>
                  {d}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
Calendar.displayName = "Calendar";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 16,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#222',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  weekDay: {
    width: 32,
    textAlign: 'center',
    color: '#888',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  dayCell: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    margin: 2,
  },
  dayText: {
    fontSize: 15,
    color: '#333',
  },
  todayText: {
    backgroundColor: '#007bff33',
    color: '#007bff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
});

export { Calendar };
