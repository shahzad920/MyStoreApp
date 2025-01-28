import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { Icon } from "..";

interface ButtonProps {
  title?: string; 
  onPress: () => void;
  loading?: boolean; 
  disabled?: boolean; 
  iconFamily?:
  | "zocial"
  | "octicon"
  | "material"
  | "material-community"
  | "ionicon"
  | "foundation"
  | "evilicon"
  | "entypo"
  | "font-awesome"
  | "font-awesome-5"
  | "simple-line-icon"
  | "feather"
  | "antdesign"; 
  icon?: string; 
  iconPosition?: "left" | "right"; 
  color?: string;
  textColor?: string;
  loadingColor?: string; 
  size?: "small" | "medium" | "large"; 
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; 
  onlyIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  iconFamily,
  icon,
  iconPosition = "left",
  color = "#007BFF",
  textColor = "#FFF",
  loadingColor = "#FFF",
  size = "medium",
  style,
  textStyle,
  onlyIcon = false, e
}) => {
  const isDisabled = disabled || loading;

  // Dynamic styles for size
  const buttonSizeStyles: ViewStyle =
    size === "small"
      ? { padding: onlyIcon ? 10 : 8, minWidth: onlyIcon ? 36 : undefined }
      : size === "large"
      ? { padding: onlyIcon ? 16 : 12, minWidth: onlyIcon ? 56 : undefined }
      : { padding: onlyIcon ? 12 : 10, minWidth: onlyIcon ? 44 : undefined };

  // Button styles
  const buttonStyles: StyleProp<ViewStyle> = [
    styles.button,
    buttonSizeStyles,
    { backgroundColor: isDisabled ? "#A9A9A9" : color },
    style,
  ];

  // Text styles
  const textStyles: StyleProp<TextStyle> = [
    styles.text,
    { color: textColor },
    textStyle,
  ];

  // Render content
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={loadingColor} />;
    }

    if (onlyIcon && icon) {
      return (
        <Icon
          family={iconFamily}
          name={icon}
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          color={textColor}
        />
      );
    }

    return (
      <>
        {icon && iconPosition === "left" && (
          <Icon
            family={iconFamily}
            name={icon}
            size={16}
            color={textColor}
            style={styles.iconLeft}
          />
        )}
        {title && <Text style={textStyles}>{title}</Text>}
        {icon && iconPosition === "right" && (
          <Icon
            family={iconFamily}
            name={icon}
            size={16}
            color={textColor}
            style={styles.iconRight}
          />
        )}
      </>
    );
  };

  return (
    <Pressable
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
      android_ripple={{ color: "#00000020" }}
    >
      {renderContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
