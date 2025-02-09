import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const Calculator: React.FC = () => {
  const [input, setInput] = useState("0");

  const handlePress = (value: string) => {
    if (value === "C") {
      setInput("0"); 
    } else if (value === "⌫") {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0")); 
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => (prev === "0" || prev === "Error" ? value : prev + value));
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["C", "0", "=", "+"],
    ["⌫"],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{input}</Text>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.button,
                item === "=" ? styles.equalsButton : null,
                item === "C" ? styles.clearButton : null,
                item === "⌫" ? styles.backspaceButton : null,
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const buttonSize = screenWidth / 4 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 10,
  },
  display: {
    fontSize: 64,
    color: "#FFFFFF", 
    marginBottom: 20,
    textAlign: "right",
    width: "90%",
    backgroundColor: "#2C2C2E",
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#505050",
    width: buttonSize,
    height: buttonSize,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: buttonSize / 2,
    elevation: 5,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  equalsButton: {
    backgroundColor: "#FF9500",
  },
  clearButton: {
    backgroundColor: "#FF3B30",
  },
  backspaceButton: {
    backgroundColor: "#FF9500", 
    width: buttonSize * 2 + 20, 
  },
});

export default Calculator;