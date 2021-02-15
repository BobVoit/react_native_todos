import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    const { nickname } = this.props;
    return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
          >
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{
                headerTitleAlign: 'center',
                title: 'Вход в прложение'
              }}
            />
            <Stack.Screen 
              name='SignUp'
              component={SignUp}
              options={{
                headerTitleAlign: 'center',
                title: "Регистрация"
              }}
            />
            <Stack.Screen 
              name='Profile'
              component={Profile}
              options={{
                headerTitleAlign: 'center',
                title: "Профиль"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center'
  }
});


const mapStateToProps = (state) => ({
  nickname: state.user.nickname
})

let AppContainer = connect(mapStateToProps, {  })(App);

const MainApp = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>     
  )
}

export default MainApp;