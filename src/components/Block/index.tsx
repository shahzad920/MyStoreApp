import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

interface BlockProps {
  row?: boolean | string;
  flex?: number | boolean;
  center?: boolean;
  middle?: boolean;
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  space?: 'around' | 'between' | 'evenly';
  width?: boolean | number | string;
  height?: boolean | number;
  safe?: boolean;
  padding?: number;
  pHorizontal?: boolean | number;
  pVertical?: boolean | number;
  margin?: number;
  mHorizontal?: boolean | number;
  mVertical?: boolean | number;
  mRight?: number; 
  mLeft?: number;  
  mTop?: number;  
  mBottom?: number; 
  bColor?: string;
  style?: any;
  card?: boolean;
  round?: number;
  children?: any;
}

function Block({
  row,
  flex,
  center,
  middle,
  top,
  bottom,
  right,
  left,
  space,
  width,
  height,
  safe,
  children,
  padding,
  pHorizontal,
  pVertical,
  margin,
  mLeft,
  mRight,
  mTop,
  mBottom,
  mHorizontal,
  mVertical,
  bColor,
  card,
  style,
  round,
  ...rest
}: BlockProps) {
  const getSpacing = (
    value: number | [number, number, number, number] | undefined,
    type: 'margin' | 'padding',
  ) => {
    if (typeof value === 'number') {
      return {[type]: value};
    }
    if (Array.isArray(value)) {
      const [top, right, bottom, left] = value;
      return {
        [`${type}Top`]: top,
        [`${type}Right`]: right,
        [`${type}Bottom`]: bottom,
        [`${type}Left`]: left,
      };
    }
    return undefined;
  };
  const styleBlock = [
    styles.block,
    card && styles.card,
    row && styles.row,
    flex && {flex: flex === true ? 1 : flex},
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    padding && getSpacing(padding, 'padding'),
    margin && getSpacing(margin, 'margin'),
    mLeft && {marginLeft: mLeft},
    mRight && {marginRight: mRight},
    mTop && {marginTop: mTop},
    mBottom && {marginBottom: mBottom},
    margin && {margin: margin},
    pHorizontal && {paddingHorizontal: pHorizontal},
    pVertical && {paddingVertical: pVertical},
    mHorizontal && {marginHorizontal: mHorizontal},
    mVertical && {marginVertical: mVertical},
    bColor && {backgroundColor: bColor},
    space && {justifyContent: `space-${space}`},
    round && {width: round, height: round, borderRadius: round / 2},
    height && {height},
    width && {width},

    style,
  ];

  if (safe) {
    return (
      <SafeAreaView style={styleBlock} {...rest}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styleBlock} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  bottom: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    // Android shadow
    elevation: 1,
    // iOS shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 16,
  },
});

export default Block;
