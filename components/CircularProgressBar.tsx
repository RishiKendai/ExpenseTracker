import React from 'react'
import { View, Text } from 'react-native'
import { Svg, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import Colors from '../utils/colors';

export type circleProgressProp = {
    progress: number;
    size: number;
    strokeWidth: number;
    textColor: string;
};

function CircularProgressBar({ progress, size, strokeWidth, textColor }: circleProgressProp) {
    const gradientId = 'gradient';
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress * circumference);
    return (
        <View>
            <Svg width={size} height={size} style={{ borderRadius: 100, }}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke="#e6e6e64c"
                    fill="transparent"
                />
                <Defs>
                    <LinearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="50%" stopColor={Colors.dogerBlue500} />
                        <Stop offset="30%" stopColor={Colors.dogerBlue300} />
                    </LinearGradient>
                </Defs>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={`url(#${gradientId})`}
                    fill="transparent"
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                />
            </Svg>
            <Text style={{ position: 'absolute', top: size / 2 - 18, left: size / 2 - 22, color: textColor, fontSize: 26 }}>
                {`${Math.round(progress * 100)} %`}
            </Text>
        </View>
    );
};

export default CircularProgressBar;