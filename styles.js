import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 400,
    height: 400,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    overflow: "hidden",
  },
  square: {
    width: 132,
    height: 132,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  squareText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  gameOver: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  newGameButton: {
    marginBottom: 20,
    backgroundColor: "dodgerblue",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
