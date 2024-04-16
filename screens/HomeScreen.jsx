import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const HomeScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => setErrorMessage(error.message)) // show error messages inline
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Welcome!</Text>
            <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={[styles.button, styles.outlinedButton]}
            >
                <Text style={[styles.buttonText, styles.outlinedButtonText]}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6f0fa',
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#1a528a',
        marginBottom: 30,
    },
    text: {
        fontSize: 16,
        color: '#1a528a',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1a87f0",
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: '60%'
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
});