import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

const Wrapper: React.FC<ViewProps> = ({ children, ...rest }) => { throw new Error("STUB"); };

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '100%',
    flex: 1,
  },
});

export default Wrapper;
