import React from "react";
import { StyleSheet, Text } from "react-native";

interface TextProps {
  style?: any;
  children?: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  body?: boolean;
  small?: boolean;
  mini?: boolean;
  tiny?: boolean;
  size?: number;
  color?: string;
  opacity?: number;
  regular?:boolean,
  bold?: boolean;
  samiBold?: boolean;
  light?: boolean;
  medium?: boolean;
  italic?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  center?: boolean;
  flex?: boolean;
}

function Typography({
  style,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  body,
  small,
  mini,
  tiny,
  size,
  color,
  regular,
  bold,
  samiBold,
  light,
  medium,
  italic,
  center,
  opacity,
  children,
  top,
  bottom,
  left,
  right,
  flex,
  ...rest
}: TextProps) {
  return (
    <Text
    
      style={[
        styles.txt,
        h1 && { fontSize: 44 },
        h2 && { fontSize: 38 },
        h3 && { fontSize: 30 },
        h4 && { fontSize: 24 },
        h5 && { fontSize: 21 },
        h6 && { fontSize: 18 },
        p && { fontSize: 16 },
        body && { fontSize: 14 },
        small && { fontSize: 12 },
        mini && { fontSize: 10 },
        tiny && { fontSize: 8 },
        size && { fontSize: size },
        color && { color },
        opacity && { opacity },
        top && { marginTop: top },
        bottom && { marginBottom: bottom },
        left && { marginLeft: left },
        right && { marginRight: right },
        italic && { fontStyle: "italic" },
        regular && { fontWeight: 'regular' },
        bold && { fontWeight: "bold" },
        samiBold && { fontWeight: "semibold" },
        light && { fontWeight: "light" },
        medium && { fontWeight: "medium" },
        center && { textAlign: "center" },
        flex && { flex: 1 },
        style && style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: "#000000",
  },
});

export default Typography;
