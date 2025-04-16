import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Tabs context to manage state
const TabsContext = React.createContext({ value: '', setValue: (v: string) => {} });

export const Tabs = ({ value, onValueChange, children }: { value: string, onValueChange: (v: string) => void, children: React.ReactNode }) => (
  <TabsContext.Provider value={{ value, setValue: onValueChange }}>
    <View>{children}</View>
  </TabsContext.Provider>
);

export const TabsList = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', marginBottom: 8 }}>{children}</View>
);

export const TabsTrigger = ({ tabValue, children, style }: { tabValue: string, children: React.ReactNode, style?: any }) => {
  const { value, setValue } = React.useContext(TabsContext);
  const active = value === tabValue;
  return (
    <TouchableOpacity
      style={[
        {
          flex: 1,
          padding: 12,
          backgroundColor: active ? '#10b981' : '#fff',
          borderColor: '#10b981',
          borderWidth: 1,
          alignItems: 'center',
        },
        style,
      ]}
      onPress={() => setValue(tabValue)}
    >
      <Text style={{ color: active ? '#fff' : '#10b981', fontWeight: 'bold' }}>{children}</Text>
    </TouchableOpacity>
  );
};

export const TabsContent = ({ tabValue, children }: { tabValue: string, children: React.ReactNode }) => {
  const { value } = React.useContext(TabsContext);
  if (value !== tabValue) return null;
  return <View>{children}</View>;
};
