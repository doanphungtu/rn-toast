/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

import type { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';
import { styles } from './BaseToast.styles';

function renderLeadingIcon() {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.iconCircle, { backgroundColor: '#87CEFA' }]}>
        <Text style={styles.iconText}>i</Text>
      </View>
    </View>
  );
}

export function InfoToast(props: BaseToastProps): React.ReactElement {
  return <BaseToast renderLeadingIcon={renderLeadingIcon} {...props} />;
}
