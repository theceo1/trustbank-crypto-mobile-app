
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import { toast, useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const KycVerification = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("id-verification");
  const [idType, setIdType] = useState("passport");
  const [loading, setLoading] = useState(false);

  // Mock verification states
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);

  // Handle document type selection
  const handleIdTypeChange = (itemValue: string) => {
    setIdType(itemValue);
  };

  // Mock file upload handler
  const handleFileUpload = (type: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      switch(type) {
        case "selfie": setSelfieUploaded(true); break;
        case "front": setFrontUploaded(true); break;
        case "back": setBackUploaded(true); break;
        case "address": setAddressUploaded(true); break;
      }
      toast({
        title: "File uploaded",
        description: "Your document has been uploaded successfully.",
      });
    }, 1500);
  };

  // Submit verification
  const handleSubmitVerification = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (navigation && navigation.navigate) {
        navigation.navigate("VerificationPending");
      }
    }, 1500);
  };

  // Check if all required documents are uploaded
  const isVerificationComplete = () => {
    if (activeTab === "id-verification") {
      return selfieUploaded && frontUploaded && (idType === "national_id" ? backUploaded : true);
    } else {
      return addressUploaded;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation && navigation.goBack ? navigation.goBack() : null}>
          <Feather name="chevron-left" size={26} color="#3949ab" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Verification</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {/* Title */}
        <Text style={styles.pageTitle}>Complete KYC Verification</Text>
        <Text style={styles.pageSubtitle}>
          Please upload clear photos of your identification documents and proof of address.
        </Text>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'id-verification' && styles.tabBtnActive]}
            onPress={() => setActiveTab('id-verification')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'id-verification' && styles.tabBtnTextActive]}>Identity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'address-verification' && styles.tabBtnActive]}
            onPress={() => setActiveTab('address-verification')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'address-verification' && styles.tabBtnTextActive]}>Address</Text>
          </TouchableOpacity>
        </View>
        {/* Tab Content */}
        {activeTab === 'id-verification' && (
          <View>
            {/* Document Type Selection */}
            <View style={styles.card}>
              <Text style={styles.label}>Select ID Type</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={idType}
                  onValueChange={handleIdTypeChange}
                  style={styles.picker}
                  itemStyle={{ fontSize: 15 }}
                >
                  <Picker.Item label="Passport" value="passport" />
                  <Picker.Item label="Driver's License" value="drivers_license" />
                  <Picker.Item label="National ID Card" value="national_id" />
                </Picker>
              </View>
            </View>
            {/* Selfie Upload */}
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View>
                  <Text style={styles.cardTitle}>Selfie Verification</Text>
                  <Text style={styles.cardDesc}>Take a clear photo of yourself</Text>
                </View>
                {selfieUploaded && <Feather name="check" size={20} color="#4caf50" />}
              </View>
              <View style={styles.btnRow}>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('selfie')} disabled={loading || selfieUploaded}>
                  <Feather name="camera" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Take Photo</Text>
                </Button>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('selfie')} disabled={loading || selfieUploaded}>
                  <Feather name="upload" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </Button>
              </View>
            </View>
            {/* Front of ID Upload */}
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View>
                  <Text style={styles.cardTitle}>{idType === 'passport' ? 'Passport' : 'ID Card'} (Front)</Text>
                  <Text style={styles.cardDesc}>Upload a clear photo of the front of your {idType.replace('_', ' ')}</Text>
                </View>
                {frontUploaded && <Feather name="check" size={20} color="#4caf50" />}
              </View>
              <View style={styles.btnRow}>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('front')} disabled={loading || frontUploaded}>
                  <Feather name="camera" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Take Photo</Text>
                </Button>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('front')} disabled={loading || frontUploaded}>
                  <Feather name="upload" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </Button>
              </View>
            </View>
            {/* Back of ID Upload (only for IDs, not passport) */}
            {idType !== 'passport' && (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <View>
                    <Text style={styles.cardTitle}>ID Card (Back)</Text>
                    <Text style={styles.cardDesc}>Upload a clear photo of the back of your {idType.replace('_', ' ')}</Text>
                  </View>
                  {backUploaded && <Feather name="check" size={20} color="#4caf50" />}
                </View>
                <View style={styles.btnRow}>
                  <Button style={styles.uploadBtn} onPress={() => handleFileUpload('back')} disabled={loading || backUploaded}>
                    <Feather name="camera" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                    <Text style={styles.uploadBtnText}>Take Photo</Text>
                  </Button>
                  <Button style={styles.uploadBtn} onPress={() => handleFileUpload('back')} disabled={loading || backUploaded}>
                    <Feather name="upload" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                    <Text style={styles.uploadBtnText}>Upload</Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
        )}
        {activeTab === 'address-verification' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View>
                  <Text style={styles.cardTitle}>Proof of Address</Text>
                  <Text style={styles.cardDesc}>Upload a utility bill, bank statement, or official letter (not older than 3 months)</Text>
                </View>
                {addressUploaded && <Feather name="check" size={20} color="#4caf50" />}
              </View>
              <View style={styles.btnRow}>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('address')} disabled={loading || addressUploaded}>
                  <Feather name="camera" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Take Photo</Text>
                </Button>
                <Button style={styles.uploadBtn} onPress={() => handleFileUpload('address')} disabled={loading || addressUploaded}>
                  <Feather name="upload" size={16} color="#3949ab" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </Button>
              </View>
            </View>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: '#ffe082' }]}> 
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Feather name="alert-triangle" size={20} color="#ff9800" style={{ marginTop: 2, marginRight: 10 }} />
                <Text style={[styles.cardDesc, { color: '#b8860b', flex: 1 }]}>The document must clearly show your full name, current address, and issue date (within the last 3 months).</Text>
              </View>
            </View>
          </View>
        )}
        {/* Submit Button */}
        <View style={{ marginTop: 32, marginBottom: 32 }}>
          <Button
            style={styles.submitBtn}
            onPress={handleSubmitVerification}
            disabled={!isVerificationComplete() || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Submit Verification</Text>}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 18,
    shadowColor: '#3949ab',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#5c5e6b',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  picker: {
    height: 44,
    width: '100%',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03a9f4',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 2,
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitBtn: {
    backgroundColor: '#3949ab',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 18,
    
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  headerBack: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a237e',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 6,
    marginTop: 10,
    textAlign: 'left',
  },
  pageSubtitle: {
    color: '#666',
    fontSize: 15,
    marginBottom: 22,
    textAlign: 'left',
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 18,
    backgroundColor: '#e8eaf6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#3949ab',
  },
  tabBtnText: {
    color: '#3949ab',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabBtnTextActive: {
    color: '#fff',
  },
});

export default KycVerification;

