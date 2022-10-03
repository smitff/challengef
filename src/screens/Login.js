//import liraries
import React, { useState,useLayoutEffect } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useDispatch,useSelector} from'react-redux'
import {login} from '../redux/actions/auth'

// create a component
const Login = ({navigation}) => {

    const dispatch = useDispatch();
    const storedata = useSelector(state=>state.auth)

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');







    const handleLogin = () => {
        console.log(email,password);
        if(email!=='' && password!==''){
            //
            dispatch(login(email,password));
            setemail('');
            setpassword('');
        }
        else{
            Alert.alert('Error','Please enter email and password');
        }
        // navigation.navigate('ListScreen');
    }

    if(storedata.loading){
        return(
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Text>Loading...</Text>
            </View>
        )
    }
    



    return (
        <SafeAreaView style={styles.container}>
            {/* <View>
                <TouchableOpacity style={{ alignSelf: 'flex-end'}}
                    onPress={() => {navigation.navigate('Register');}}
                >
                    <Text style={styles.registertext}>Register</Text>
                </TouchableOpacity>
            </View> */}


            <View style={styles.bottomContainer}>
            <TextInput
                        autoCapitalize="none"
                        style={styles.emailtext}
                        onChangeText={e => setemail(e)}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Phone number, username or email id"
                        placeholderTextColor="#A9A9A9"
                    />
                    <TextInput
                        style={styles.emailtext}
                        onChangeText={e => setpassword(e)}
                        value={password}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        placeholderTextColor="#A9A9A9"
                    />


                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    onPress={() => handleLogin()}
                    style={styles.btnPressContainer}>
                        <Text style={styles.logintext}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerTextContainerText}>
                        Don't have an account? 
                    </Text>
                    <TouchableOpacity 
                    onPress={()=>{navigation.navigate('Register'); }}>
                        <Text 
                        // style={{
                        //     color:'#0A5DCF',
                        //     fontSize:16,
                        //     fontWeight:'bold',
                        // }}
                        style={styles.registertext}
                        
                        >Register</Text>
                    </TouchableOpacity>
                </View>




            </View>



        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    registertext:{

        fontSize: 16,
        fontWeight: 'bold',
        color:'#0A5DCF'
    },
    bottomContainer:{
        // backgroundColor: 'yellow',
        flex:1,
        justifyContent:'center',
        // alignItems:'center',
    },
    emailtext:{
        paddingLeft: 24,
        paddingRight: 50,
        color: 'black',
        // fontFamily:"OpenSans-Regular",
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
        marginBottom: 24,
        height: 50,
    },
    btnContainer:{
        width: '100%',
        marginTop: 24,
    },
    btnPressContainer:{
        backgroundColor:"#0A5DCF",
        justifyContent:'center',
        alignItems:'center',
        height: 40,
        borderRadius:5
    },
    logintext:{
        color: 'white',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        fontSize: 20,
    },

    registerTextContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'yellow',
        marginTop:20,   
    },
    registerTextContainerText:{
        color:'#000',
        fontSize:16,
        marginRight:5,
    }


});


export default Login;
