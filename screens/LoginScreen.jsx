import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Text, View} from 'react-native';
import {auth} from '../firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigation = useNavigation();
    const hostUrl = process.env.LINKZ_APP_API_URL || 'http://localhost:3000'
    const makeRequest = async (method, path, uid) => {
        return await fetch(`${hostUrl}/user/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid})
        });
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
    }, [])

    const handleSignUp = () => {
        if (email.trim() === "" || password.trim() === "") {
            setErrorMessage("Email or Password cannot be empty");
            return;
        }
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(async userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email, user.uid);
                const response = await makeRequest('POST', 'register', user.uid);
                if (!response.ok) {
                    const errorResponse = await response.json();
                    setErrorMessage(errorResponse.message || 'Registration failed');
                }
            })
            .catch(error => setErrorMessage(error.message));
    };

    const handleLogin = () => {
        if (email.trim() === "" || password.trim() === "") {
            setErrorMessage("Email or Password cannot be empty");
            return;
        }
        auth
            .signInWithEmailAndPassword(email, password)
            .then(async userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email, user.uid);
                const response = await makeRequest('POST', 'login', user.uid);
                if (!response.ok) {
                    const errorResponse = await response.json();
                    setErrorMessage(errorResponse.message || 'Login failed');
                }
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.headerText}>Welcome!</Text>

            {errorMessage && <Text style={styles.errorText}>Error: {errorMessage}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholderTextColor='#b0c4de'
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={[styles.input, {marginTop: 20}]}
                    secureTextEntry
                    placeholderTextColor='#b0c4de'
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.outlinedButton]}>
                    <Text style={[styles.buttonText, styles.outlinedButtonText]}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6f0fa'
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#1a528a',
        marginBottom: 30,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 40,
    },
    input: {
        fontSize: 16,
        borderColor: '#1a528a',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal:10,
        color: '#000',
        height: 50,
    },
    buttonContainer: {
        width: '60%',
    },
    button: {
        backgroundColor: "#1a87f0",
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: '100%'
    },
    outlinedButton: {
        backgroundColor: '#e6f0fa',
        borderColor: '#1a87f0',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    outlinedButtonText: {
        color: '#1a87f0',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
});