import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { Avatar, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import nullAvatar from '../../assets/empty-avatar.jpg';

const Profile = ({ avatar, nickname }) => {

    return (
        <View style={styles.container}>
            <Avatar 
                // title="AVA"
                rounded
                size={200}
                source={ avatar ? { uri: avatar } : nullAvatar}
                containerStyle={styles.avatarContainer}
            />
            <Text h2>{nickname}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatarContainer: {
        marginVertical: 30,
        backgroundColor: '#bcc0c4'
    }
})


Profile.propTypes = {
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    id: PropTypes.number,
}


const mapStateToProps = (state) => ({
    avatar: state.user.avatar,
    nickname: state.user.nickname, 
    id: state.user.id
})



export default connect(mapStateToProps, {

})(Profile);