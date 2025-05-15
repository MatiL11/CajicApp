import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#5F4DEE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
    letterSpacing: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22223B",
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#8D8D8D",
    textAlign: "center",
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    color: "#22223B",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 48,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    fontSize: 15,
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 4,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    backgroundColor: "transparent",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 2,
    marginBottom: 18,
  },
  forgotPasswordText: {
    color: "#5F4DEE",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#5F4DEE",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#8D8D8D",
    fontWeight: "600",
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  signUpText: {
    color: "#8D8D8D",
    fontSize: 14,
  },
  signUpLink: {
    color: "#5F4DEE",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 2,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    fontSize: 14,
  },
});

export default styles;