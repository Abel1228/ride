import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import {
    Image, Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ProfileScreen() {
  // States
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isLangModalVisible, setLangModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("Abel");
  const [lastName, setLastName] = useState("Solomon");
  const [email, setEmail] = useState("abel@example.com");
  const [phone] = useState("+251 943075112"); // non-editable
  const [profileImage, setProfileImage] = useState<string | null>(null); // null = default avatar
  const [language, setLanguage] = useState("English");

  // Image picker handler
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditProfileImage = async () => {
    // Ask user to pick from gallery or take photo
    // For simplicity, show system dialog for now
    // You can replace with a custom action sheet if desired
    const options = [
      { text: 'Choose from Gallery', onPress: pickImage },
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Cancel', style: 'cancel' },
    ];
    // For web/desktop, just pick from gallery
    await pickImage();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Image + Edit */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={70} color="#aaa" />
          )}
          {/* Edit icon overlay on profile image */}
          <TouchableOpacity
            style={styles.editIcon}
            onPress={handleEditProfileImage}
          >
            <MaterialIcons name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{firstName}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setLangModalVisible(true)}
        >
          <Ionicons name="language" size={20} />
          <Text style={styles.menuText}>Language ({language})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications" size={20} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="call" size={20} />
          <Text style={styles.menuText}>Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="bookmark" size={20} />
          <Text style={styles.menuText}>Saved Places</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text" size={20} />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="reader" size={20} />
          <Text style={styles.menuText}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out" size={20} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="trash" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>
            Delete my account
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== EDIT PROFILE MODAL ===== */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImageLarge} />
              ) : (
                <Ionicons name="person" size={80} color="#aaa" />
              )}
              {/* Edit icon overlay on modal profile image */}
              <TouchableOpacity
                style={[styles.editIcon, { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'green' }]}
                onPress={handleEditProfileImage}
              >
                <MaterialIcons name="edit" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { backgroundColor: "#eee" }]}
              value={phone}
              editable={false} // phone is not editable
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ===== LANGUAGE MODAL ===== */}
      <Modal visible={isLangModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Language</Text>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => {
                setLanguage("English");
                setLangModalVisible(false);
              }}
            >
              <Ionicons
                name={
                  language === "English"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
              />
              <Text style={styles.radioText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => {
                setLanguage("Amharic");
                setLangModalVisible(false);
              }}
            >
              <Ionicons
                name={
                  language === "Amharic"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
              />
              <Text style={styles.radioText}>Amharic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerText: { fontSize: 20, fontWeight: "700", marginLeft: 10 },
  profileSection: { alignItems: "center", marginVertical: 20 },
  avatar: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: 'cover',
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  // uploadIcon removed
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "green",
    padding: 5,
    borderRadius: 20,
  },
  name: { fontSize: 22, fontWeight: "600", marginTop: 10 },
  phone: { color: "#555", marginTop: 5 },
  menu: { marginTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  menuText: { marginLeft: 10, fontSize: 16 },
  // Modals
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  radioButton: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  radioText: { marginLeft: 10, fontSize: 16 },
});
