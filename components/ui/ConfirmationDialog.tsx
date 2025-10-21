import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Reusable confirmation dialog modal
 * @param visible - Whether the dialog is visible
 * @param title - Dialog title
 * @param message - Dialog message/description
 * @param onConfirm - Function called when user confirms
 * @param onCancel - Function called when user cancels
 * @param confirmText - Custom text for confirm button (default: "Confirm")
 * @param cancelText - Custom text for cancel button (default: "Cancel")
 */
function ConfirmationDialog({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="alert-circle"
              size={48}
              color={mainColors.primary500}
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: mainColors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: mainColors.background,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  confirmButton: {
    backgroundColor: mainColors.primary500,
  },
  cancelButtonText: {
    color: mainColors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: mainColors.textOnPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConfirmationDialog;
