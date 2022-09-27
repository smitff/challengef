//import liraries
import React, {useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useDispatch,useSelector} from'react-redux'
import {permissionHandle} from '../redux/actions/location'
// create a component
const SplashScreen = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(permissionHandle())
    }, [])
    


    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default SplashScreen;
