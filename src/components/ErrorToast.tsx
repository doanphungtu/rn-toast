/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

import type { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';
import { styles } from './BaseToast.styles';

function renderLeadingIcon() {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.iconCircle, { backgroundColor: '#FE6301' }]}>
        <Text style={styles.iconText}>!</Text>
      </View>
    </View>
  );
}

export function ErrorToast(props: BaseToastProps): React.ReactElement {
  return <BaseToast renderLeadingIcon={renderLeadingIcon} {...props} />;
}
