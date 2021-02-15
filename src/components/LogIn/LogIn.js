import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/userReducer';

class Login extends React.Component {
    state = {
        login: '',
        password: ''
    }

    login = () => {
        let { login, password } = this.state;
        this.props.login(login, password);
    }
    
    
    render() {
        const { navigation, isAuth } = this.props;

        if (isAuth) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }]
            })
        }

        return (
            <View style={styles.container}>
                <Icon 
                    name="login"
                    size={40}
                />
                <Text style={styles.title} h2>Войти</Text>
                <Input 
                    placeholder="Логин"
                    leftIcon={{ type: 'material', name: 'chevron-right' }}
                    label="Login"
                    onChangeText={value => this.setState({ login: value })}
                />
                <Input 
                    placeholder="Пароль"
                    leftIcon={{ type: 'material', name: 'chevron-right' }}
                    label="Password"
                    onChangeText={value => this.setState({ password: value })}
                    secureTextEntry={true}
                />
                <Button 
                    title="Войти"
                    buttonStyle={styles.submit}
                    onPress={this.login}
                />
                <View style={{ marginTop: 20 }}>
                    <Button 
                        title="Перейти к регистрации"
                        type='clear'
                        titleStyle={{ color: '#000' }}
                        // onPress={() => navigation.navigate("SignUp")}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: "SignUp" }]
                        })}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: "center",
        marginBottom: 30,
        color: '#000'
    },
    input: {
        marginBottom: 20,
        color: '#000'
    },
    submit: {
        backgroundColor: "#000"
    }
})


Login.propTypes = {
    isAuth: PropTypes.bool,
    login: PropTypes.func
}

const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {
    login
})(Login);