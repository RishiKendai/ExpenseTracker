import React, { useContext, useReducer, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ScreenTitle from "../components/ScreenTitle";
import Input from "../components/Input";
import { CenterHorizontal, CenterVertical } from '../utils/GlobalStyles';
import SpaceMaker from "../components/SpaceMaker";
import Btn from "../components/Btn";
import Colors from "../utils/colors";
import { post } from "../utils/magicBox";
import Toast from "../components/Toast";
import { AuthContext } from "../store/authContext";
import { KeyboardTypeOptions, CapitalizeOptions } from '../utils/GlobalTypes'

interface LoginStateProp {
    email: string;
    password: string;
}

interface InputProp {
    label: string;
    onInput: (data: any) => void;
    data: string;
    inputType?: string;
    action: string;
    keyType: KeyboardTypeOptions;
    captialize?: CapitalizeOptions;
}

const loginState: LoginStateProp = {
    email: '',
    password: '',
};

type LoginActionProp = { type: 'setEmail'; payload: string } | { type: 'setPassword'; payload: string };


const loginReducer = (state: LoginStateProp, action: LoginActionProp) => {
    switch (action.type) {
        case 'setEmail':
            return { ...state, email: action.payload };
        case 'setPassword':
            return { ...state, password: action.payload };
        default:
            return state;
    }
};


function Login() {
    const authCtx = useContext(AuthContext);
    const [loginData, loginDispatch] = useReducer(loginReducer, loginState);
    const [showToast, setShowToast] = useState<{
        render: boolean;
        customProp: {
            type: string;
            text1: string;
            text2?: string;
        };
    }>({
        render: false,
        customProp: {
            type: '',
            text1: '',
            text2: '',
        }
    });

    async function handleLogin() {

        const data = await post(loginData, 'user/auth/login', {});
        console.log('data', data)
        if (data?.status) {
            authCtx.authenticate(data.token)
        } else {
            setShowToast({ render: true, customProp: { type: 'error', text1: data.msg } });
            setTimeout(() => {
                setShowToast({
                    render: false, customProp: {
                        type: '',
                        text1: '',
                        text2: '',
                    }
                });
            }, 5000);
        }
    }

    function handleSignup() {

    }
    function handleForgotPassword() {

    }
    return (
        // <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.Root}>
            {
                showToast.render ?
                    <Toast {...showToast.customProp} />
                    : ''
            }
            <Image style={[styles.Logo, CenterHorizontal]} source={require('../assets/images/Logo.png')} />
            <ScreenTitle center={true} size={38}>Expense Tracker</ScreenTitle>
            <SpaceMaker custom={{ height: 10, width: 0 }} />
            <Input keyType='email-address' onInput={loginDispatch} data={loginData.email} label='email' action='setEmail' />
            <SpaceMaker custom={{ height: 1, width: '100%' }} />
            <Input keyType='default' onInput={loginDispatch} inputType='password' data={loginData.password} label='password' action='setPassword' />
            <SpaceMaker custom={{ height: 10, width: '100%' }} />
            <Btn bg={Colors.accent700} txtSize={22} customStyle={{ width: '90%', height: 50, ...CenterHorizontal }} isLoading={false} label='Login' type='filled' onTap={handleLogin} />
            <SpaceMaker custom={{ height: 18, width: '100%' }} />
            <View style={[styles.Divider, CenterHorizontal]}>
                <View style={styles.Line} />
                <Text style={styles.DividerText}>OR</Text>
                <View style={styles.Line} />
            </View>
            <SpaceMaker custom={{ height: 12, width: '100%' }} />
            <View style={[styles.SignupWrapper, CenterHorizontal]}>
                <Text style={styles.SignupText}>Don't have an account?</Text>
                <Btn label='Sign up' bg={Colors.secondary500} type='none' txtSize={18} customStyle={{ width: 70, height: 'auto' }} onTap={handleSignup} />
            </View>
            <Btn label='Forgot Password' bg={Colors.secondary350} type='none' txtSize={18} customStyle={{ width: '90%', height: 'auto', ...CenterHorizontal }} onTap={handleForgotPassword} />
        </View>
        // </ScrollView>
    );
}
export default Login;

const styles = StyleSheet.create({
    Root: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap: 12,
    },
    Logo: {},
    Divider: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
    },
    Line: {
        height: 0.4,
        width: '50%',
        flex: 1,
        backgroundColor: '#ececef',
    },
    DividerText: {
        color: '#ececef',
        fontFamily: 'Poppins-Black',
        paddingHorizontal: 8,
    },
    SignupWrapper: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    SignupText: {
        fontFamily: 'Montserrat-Black',
        fontSize: 18,
        marginRight: 12,
        color: '#efefec',
    }
});