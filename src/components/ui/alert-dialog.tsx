import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";


// AlertDialog context for managing open/close state
const AlertDialogContext = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | undefined>(undefined);

const AlertDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) throw new Error("AlertDialogTrigger must be used within AlertDialog");
  return (
    <TouchableOpacity onPress={() => ctx.setOpen(true)}>{children}</TouchableOpacity>
  );
};

const AlertDialogContent = ({ children }: { children: React.ReactNode }) => {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) throw new Error("AlertDialogContent must be used within AlertDialog");
  return (
    <Modal
      visible={ctx.open}
      transparent
      animationType="fade"
      onRequestClose={() => ctx.setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.header}>{children}</View>
);
const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.title}>{children}</Text>
);
const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.description}>{children}</Text>
);

const AlertDialogAction = ({ onPress, children }: { onPress: () => void, children: React.ReactNode }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{children}</Text>
  </TouchableOpacity>
);
const AlertDialogCancel = ({ onPress, children }: { onPress: () => void, children: React.ReactNode }) => (
  <TouchableOpacity style={[styles.cancelButton, { marginTop: 8 }]} onPress={onPress}>
    <Text style={styles.cancelButtonText}>{children}</Text>
  </TouchableOpacity>
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  content: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 4,
    minWidth: 100,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 4,
    minWidth: 100,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
