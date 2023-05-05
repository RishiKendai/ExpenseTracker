import React from 'react';

import { StyleSheet, View } from 'react-native';

function SpaceMaker({ custom }: { custom: any }) {
// function SpaceMaker({ custom }: { custom: ViewStyle }) {

    return <View style={{ ...custom }}></View>;
}

export default SpaceMaker;

