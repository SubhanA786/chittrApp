import React, { Component } from 'react';
import {
    Text,
    Button,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

class Following extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isLoad: true,
            following: [],
            search: ''
        };
        this.getFollowing();
    }

    getFollowing = async () => {
        const id = await AsyncStorage.getItem("id");
        if(id) {
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/following')
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        loading: false,
                        following: responseJson,
                    });
                })
                .catch(error => {
                    console.log("error: " + error);
                });
        }
        else
        {

        }
    }

    async unfollow(id) {
        console.log(await AsyncStorage.getItem("token"));
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": await AsyncStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
                Alert.alert("unfollowed");
            })
            .catch(error => {
                console.log("error: " + error);
            });
    }

    render() {
        const loading = this.state.loading;
        return (
            <View style={styles.container}>
                <Text style={styles.userText}> Following ({this.state.following.length}) </Text>
                <FlatList
                    data={this.state.following}
                    renderItem={({item}) => (
                        <View>
                            <Card style={{minWidth: '90%', maxWidth: '90%', alignSelf: 'center', margin: 10}}>
                                <Card.Title title={item.given_name} subtitle={item.email} left={(props) => <Avatar.Icon {...props} icon="folder" />} />
                                <Card.Actions>
                                    <TouchableOpacity
                                        style={styles.unfollowButton}
                                        onPress={() => this.props.navigation.navigate('ViewProfile', {item: item.user_id})}>
                                        <Text style={styles.unfollowText}> View Profile</Text>
                                    </TouchableOpacity>
                                </Card.Actions>
                            </Card>
                        </View>
                    )}
                    keyExtractor={({id}, index) => id}
                />
            </View>
        )
    }
}

export default Following;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dashboard: {
        textAlign: 'center'
    },
    userText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10
    },
    unfollowButton: {
        paddingVertical: 5,
        width: '98%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginBottom: 5
    },
    unfollowText: {
        textAlign: 'center',
        color: "#007aff",
        fontSize: 18,
        fontWeight: "bold"
    }
});
