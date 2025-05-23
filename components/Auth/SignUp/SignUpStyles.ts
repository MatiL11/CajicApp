import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 10,
    marginLeft: -8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 48,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F8F8F8",
    fontSize: 15,
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 4,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    backgroundColor: "transparent",
  },
  passwordHint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
    marginLeft: 2,
  },
  accountTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 4,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  accountTypeButtonActive: {
    borderColor: "#5F4DEE",
    backgroundColor: "#F3F1FE",
  },
  accountTypeText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
  },
  accountTypeTextActive: {
    color: "#5F4DEE",
    fontWeight: "700",
  },
  createAccountButton: {
    backgroundColor: "#5F4DEE",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  createAccountButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    color: "#888",
    fontSize: 14,
  },
  loginLink: {
    color: "#5F4DEE",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 2,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default styles;