import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/Homepage';
import SignUp from './screens/Register';
import LoginScreen from './screens/LoginScreen';



const login = createStackNavigator({
        Homepage: {
            screen: Homepage
        },
        Register: {
            screen: Register
        },
        Login: {
            screen: Login
        }
    },
    {
        headerMode: "none",
        initialRouteName: "Homepage"
    });


const loggedIn = createStackNavigator({
        Dashboard: {
            screen: Dashboard
        }
    },
    {
        headerMode: "none",
        initialRouteName: "Dashboard"
    });

const AppStackNav = createStackNavigator({
        Auth: login,
        App: loggedIn,
        AuthLoadingScreen: LoadingScreen
    },
    {
        headerMode: "none",
        initialRouteName: "AuthLoadingScreen"
    });



const AppContainer = createAppContainer(AppStackNav)
export default AppContainer;
