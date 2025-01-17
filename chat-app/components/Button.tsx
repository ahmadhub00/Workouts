import { Pressable, PressableProps, Text, ViewStyle } from "react-native";

export function Button({ children, style, ...props }: PressableProps) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          width: "100%",
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={{ textAlign: "center", fontWeight: "500" }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}