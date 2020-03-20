//
import React, { Component } from "react";
import {
    View,
    Button,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            given_name: "",
            family_name: "",
            email: "",
            password: "",
            loading: false,
            userData: []
        };
    }
    getUserData = async () => {
        const id = await AsyncStorage.getItem("id");
        if (id) {
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        loading: false,
                        userData: responseJson
                    });
                    console.log(this.state.userData);
                    this.setState({ given_name: this.state.userData.given_name });
                    this.setState({ family_name: this.state.userData.family_name });
                    this.setState({ email: this.state.userData.email });
                    this.setState({ password: this.state.userData.password });
                })
                .catch(error => {
                    console.log("error: " + error);
                });
        } else {
        }
    };
    componentDidMount() {
        this.getUserData();
    }

    handleGivenName = text => {
        this.setState({ given_name: text });
        console.log(this.state.given_name);
    };
    handleFamilyName = text => {
        this.setState({ family_name: text });
        console.log(this.state.family_name);
    };

    handleEmail = text => {
        this.setState({ email: text });
        console.log(this.state.email);
    };
    handlePassword = text => {
        this.setState({ password: text });
        console.log(this.state.password);
    };

    update = async () => {
        if (
            this.state.given_name &&
            this.state.family_name &&
            this.state.email &&
            this.state.password
        ) {
            const id = await AsyncStorage.getItem("id");
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id, {
                method: "PATCH",
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": await AsyncStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Account updated:", data);
                    alert("Account updated: " + data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Please enter all details");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.header}> User Details </Text>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Given Name"
                            value={this.state.userData.given_name}
                            onChangeText={this.handleGivenName}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Family Name"
                            value={this.state.userData.family_name}
                            onChangeText={this.handleFamilyName}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            value={this.state.userData.email}
                            onChangeText={this.handleEmail}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            value={this.state.userData.password}
                            onChangeText={this.handlePassword}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            value={this.state.userData.password}
                            onChangeText={this.handlePassword}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            style={styles.button}
                            title="Update"
                            onPress={() => this.update()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        marginBottom: 30,
        fontSize: 24,
        fontWeight: "bold"
    },
    form: {
        width: "90%"
    },
    formRow: {
        marginBottom: 10
    },
    TextInput: {
        backgroundColor: "#ddd",
        height: 40,
        paddingHorizontal: 10,
        color: "#333"
    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        width: "95%",
        alignSelf: "center"
    },
    deleteText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default Register;
