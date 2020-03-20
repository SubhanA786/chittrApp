// import React, { Component } from "react";
// import {
//     View,
//     Button,
//     Alert,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet
// } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
//
// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             given_name: "",
//             family_name: "",
//             email: "",
//             password: "",
//             loading: false,
//             userData: []
//         };
//     }
//     getUserData = async () => {
//         const id = await AsyncStorage.getItem("id");
//         if (id) {
//             return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id)
//                 .then(response => response.json())
//                 .then(responseJson => {
//                     this.setState({
//                         loading: false,
//                         userData: responseJson
//                     });
//                     console.log(this.state.userData);
//                     this.setState({ given_name: this.state.userData.given_name });
//                     this.setState({ family_name: this.state.userData.family_name });
//                     this.setState({ email: this.state.userData.email });
//                     this.setState({ password: this.state.userData.password });
//                 })
//                 .catch(error => {
//                     console.log("error: " + error);
//                 });
//         } else {
//         }
//     };
//     componentDidMount() {
//         this.getUserData();
//     }
//
//     handleGivenName = text => {
//         this.setState({ given_name: text });
//         console.log(this.state.given_name);
//     };
//     handleFamilyName = text => {
//         this.setState({ family_name: text });
//         console.log(this.state.family_name);
//     };
//
//     handleEmail = text => {
//         this.setState({ email: text });
//         console.log(this.state.email);
//     };
//     handlePassword = text => {
//         this.setState({ password: text });
//         console.log(this.state.password);
//     };
//
//     update = async () => {
//         if (
//             this.state.given_name &&
//             this.state.family_name &&
//             this.state.email &&
//             this.state.password
//         ) {
//             const id = await AsyncStorage.getItem("id");
//             return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id, {
//                 method: "PATCH",
//                 body: JSON.stringify({
//                     given_name: this.state.given_name,
//                     family_name: this.state.family_name,
//                     email: this.state.email,
//                     password: this.state.password
//                 }),
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Authorization": await AsyncStorage.getItem("token")
//                 }
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log("Account updated:", data);
//                     alert("Account updated: " + data);
//                 })
//                 .catch(error => {
//                     console.error(error);
//                 });
//         } else {
//             alert("Please enter all details");
//         }
//     };
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.form}>
//                     <Text style={styles.header}> User Details </Text>
//                     <View style={styles.formRow}>
//                         <TextInput
//                             style={styles.TextInput}
//                             placeholder="Given Name"
//                             value={this.state.userData.given_name}
//                             onChangeText={this.handleGivenName}
//                         />
//                     </View>
//                     <View style={styles.formRow}>
//                         <TextInput
//                             style={styles.TextInput}
//                             placeholder="Family Name"
//                             value={this.state.userData.family_name}
//                             onChangeText={this.handleFamilyName}
//                         />
//                     </View>
//                     <View style={styles.formRow}>
//                         <TextInput
//                             style={styles.TextInput}
//                             placeholder="Email"
//                             value={this.state.userData.email}
//                             onChangeText={this.handleEmail}
//                         />
//                     </View>
//                     <View style={styles.formRow}>
//                         <TextInput
//                             style={styles.TextInput}
//                             placeholder="Password"
//                             value={this.state.userData.password}
//                             onChangeText={this.handlePassword}
//                         />
//                     </View>
//                     <View style={styles.formRow}>
//                         <TextInput
//                             style={styles.TextInput}
//                             placeholder="Password"
//                             value={this.state.userData.password}
//                             onChangeText={this.handlePassword}
//                         />
//                     </View>
//                     <View style={styles.formRow}>
//                         <Button
//                             style={styles.button}
//                             title="Update"
//                             onPress={() => this.update()}
//                         />
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     header: {
//         textAlign: "center",
//         marginBottom: 30,
//         fontSize: 24,
//         fontWeight: "bold"
//     },
//     form: {
//         width: "90%"
//     },
//     formRow: {
//         marginBottom: 10
//     },
//     TextInput: {
//         backgroundColor: "#ddd",
//         height: 40,
//         paddingHorizontal: 10,
//         color: "#333"
//     },
//     deleteButton: {
//         backgroundColor: "red",
//         paddingVertical: 10,
//         width: "95%",
//         alignSelf: "center"
//     },
//     deleteText: {
//         textAlign: "center",
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "bold"
//     }
// });
//
// export default Register;
import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, AsyncStorage, Image, TouchableOpacity} from 'react-native';
class MyProfile extends Component {

    constructor(){

        super();

        this.state ={
            isValid: false,
            given_name: "",
            family_name: "",
            email: "",
            password: "",
            loading: false,
            userData: [],
            status:false,
            userFollowing: 0,
            userFollowers: 0,
        }
    }


    componentDidMount(){
        this.getUserData();
        this.getUserFollowInfo();
    }

    update = async () => {
        if (
            this.state.given_name ||
            this.state.family_name ||
            this.state.email ||
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
                .then(response => {

                    try{
                        response.json()
                    }catch (e) {
                        console.log('an error occurred.')
                    }

                })
                .then(data => {
                    console.log("Account updated.");
                     alert("Account updated.");

                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Please enter at least one attribute value to update.");
        }
    };

    async getUserFollowInfo() {
        let id= await AsyncStorage.getItem('id');
        this.setState({loading: true});
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/following')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoad: false,
                    userFollowing: responseJson.length
                });
                console.log("following"+this.state.userFollowing);
                return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/followers')
                    .then(response => response.json())
                    .then(responseJson => {
                        this.setState({
                            isLoad: false,
                            userFollowers: responseJson.length,
                            loading: false
                        });
                        console.log("followers"+this.state.userFollowers);
                    })
                    .catch(error => {
                        this.setState({loading: false});
                        console.log("error: " + error);
                    });
            })
            .catch(error => {
                this.setState({loading: false});
                console.log("error: " + error);
            });
    }


    getUserData = async () => {
        const id = await AsyncStorage.getItem('id');
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


    handleGivenName = text => {
        this.setState({ given_name: text });
        this.state.isValid = true;
        console.log(this.state.given_name);
    };
    handleFamilyName = text => {
        this.state.isValid = true;
        this.setState({ family_name: text });
        console.log(this.state.family_name);
    };

    handleEmail = text => {
        this.state.isValid = true;
        this.setState({ email: text });
        console.log(this.state.email);
    };
    handlePassword = text => {
        this.state.isValid = true;
        this.setState({ password: text });
        console.log(this.state.password);
    };

    ShowHideTextComponentView = () =>{

        if(this.state.status=== true)
        {
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    };

    render() {

        return (


            <View style={styles.MainContainer}>
                    <Text style={styles.header}> Hello {this.state.userData.given_name}!</Text>
                    <View style={styles.formButtons}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Followers')}>
                            <View style={styles.tweetButton}>
                                <Text
                                    style={{color: 'black', fontSize: 14}}> 👨‍👩‍👧‍👦 My Followers({this.state.userFollowers})</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Following')}>
                            <View style={styles.tweetButton}>
                                <Text style={{color: 'black', fontSize: 14}}> 👥 My Following ( {this.state.userFollowing} )</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={this.state.userData.given_name}
                            onChangeText={this.handleGivenName}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={this.state.userData.family_name}
                            onChangeText={this.handleFamilyName}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={this.state.userData.email}
                            onChangeText={this.handleEmail}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button color={'#303030'} title="New Password" onPress={this.ShowHideTextComponentView} />
                        {
                            this.state.status ? <TextInput style= {styles.TextInput} onChangeText={this.handlePassword} placeholder={'Enter your new password'}/> : null
                        }
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            disabled={!this.state.isValid}
                            color={'#33CCFF'}
                            style={styles.button}
                            title="Update"
                            onPress={() => this.update()}
                        />
                    </View>
                </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        height: "100%",
        paddingHorizontal: 10
    },
    header: {
        textAlign: "center",
        fontSize: 25,
        padding: 20,
        fontStyle: 'italic'
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    form: {
        width: "90%"
    },
    formRow: {
        marginBottom: 10,

    },
    tweetButton: {
        backgroundColor:  "#ddd",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 4
    },
    TextInput: {
        backgroundColor: "#ddd",
        height: 40,
        paddingHorizontal: 10,
        color: "#333"
    },


});
 export default MyProfile
