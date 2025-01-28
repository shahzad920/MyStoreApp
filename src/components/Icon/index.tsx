import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import getIconType from './getIconType';

interface IconProps {
  name: string; 
  family?:
    | 'zocial'
    | 'octicon'
    | 'material'
    | 'material-community'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'font-awesome'
    | 'font-awesome-5'
    | 'simple-line-icon'
    | 'feather'
    | 'antdesign'; 
  size?: number; 
  color?: string;
  style?: StyleProp<ViewStyle>; 
}

const Icon: React.FC<IconProps> = ({ name, family, size = 24, color = '#000', style }) => {
  const IconComponent = getIconType(family);

  if (!IconComponent) {
    console.warn(`Icon family "${family}" not found!`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;
