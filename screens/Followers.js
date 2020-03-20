import React, { Component } from 'react';
import {
    Text,
    TextInput,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isLoad: true,
            followers: [],
            search: ''
        };
        this.getFollowers();
    }

    getFollowers = async () => {
        const id = await AsyncStorage.getItem("id");
        if(id) {
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/followers')
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        loading: false,
                        followers: responseJson,
                    });
                    console.warn(this.state.followers.length);
                })
                .catch(error => {
                    console.log("error: " + error);
                });
        }
        else
        {

        }
    }

    render() {
        const loading = this.state.loading;
        return (
            <View style={styles.container}>
                <Text style={styles.userText}> Followers ({this.state.followers.length})</Text>
                <FlatList
                    data={this.state.followers}
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

export default Followers;

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
