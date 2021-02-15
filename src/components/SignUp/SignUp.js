import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SignUp extends React.Component {
    state = {
        login: '',
        password: '',
        nickname: '' 
    }


    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Icon 
                    name="accessibility"
                    size={40}
                />
                <Text style={styles.title} h2>Регистрация</Text>
                <Input 
                    placeholder="Логин"
                    leftIcon={{ type: 'material', name: 'chevron-right' }}
                    label="Логин"
                    onChangeText={value => this.setState({ login: value })}
                />
                <Input 
                    placeholder="Пароль"
                    leftIcon={{ type: 'material', name: 'chevron-right' }}
                    label="Пароль"
                    onChangeText={value => this.setState({ password: value })}
                    secureTextEntry={true}
                />
                <Input 
                    placeholder="Имя"
                    leftIcon={{ type: 'material', name: 'chevron-right' }}
                    label="Имя"
                    onChangeText={value => this.setState({ login: value })}
                />
                <Button 
                    title="Зарегистрироваться"
                    buttonStyle={styles.submit}
                    // onPress={}
                />
                <View style={styles.goToLoginContainer}>
                    <Text style={styles.isHaveAccount}>Уже имеется аккаунт?</Text>
                    <View style={{ marginTop: 15 }}>
                        <Button 
                            title="Перейти к форме входа"
                            type="clear"
                            titleStyle={{ color: '#000' }}
                            onPress={() => navigation.reset({
                                index: 0,
                                routes: [{ name: "Login" }]
                            })}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        marginBottom: 30
    },
    submit: {
        backgroundColor: '#000'
    },
    goToLoginContainer: {
        marginTop: 15
    },
    isHaveAccount: {
        textAlign: 'center',
        fontSize: 16
    },
})


const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
})

export default connect()(SignUp);