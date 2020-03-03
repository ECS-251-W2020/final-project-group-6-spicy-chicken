/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class App extends Component {

  state = {
    location: null,
    userName: null,
    loggedIn: false,
    userIcon: require('./img/defaultIcon.jpeg')
    // iconPath: './img/signIn.png'
  };

  componentDidMount(): * {
    GoogleSignin.configure({
      scopes:['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '134735987194-idccivkskmjfuoc4h06gftvlkauk9u65.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
      iosClientId: '134735987194-7rupt7nv2j0n5pnck6o7v374iemvjmt0.apps.googleusercontent.com'
    });
  }

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.warn(userInfo);
      name = userInfo.user.name;
      iconURL = userInfo.user.photo;
      this.setState({ userName: name, loggedIn: true, userIcon: {uri: iconURL}});

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userName: null, loggedIn: false, userIcon: require('./img/defaultIcon.jpeg') }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        curr_location = JSON.stringify(position);
        this.setState({location: 'location:' + curr_location});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  onPressLoginButton = () => {
    if (this.state.loggedIn == false) {
      this.signInGoogle();
    } else {
      console.warn('logged out')
      this.signOutGoogle();
    }
  }

  // loginWithGoogle = () => {
  //   googleLogin();
  // }

  render()
  {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <TouchableOpacity onPress={this.onPressLoginButton}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 20,
                      marginRight: 20,
                      resizeMode:'contain'
                    }}
                    source={this.state.userIcon}
                  >
                  </Image>
                </TouchableOpacity>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Simulate a crash</Text>
                <Text style={styles.sectionDescription}>
                  click the following button to simualate a crash
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={this.getCurrentLocation}
                  title="Crash!"
                  color="white"
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Information</Text>
                <Text style={styles.sectionDescription}>
                  User: {this.state.userName} {"\n"}
                  Location: {this.state.location}
                </Text>
              </View>
              {/*<View style={styles.buttonContainerLogin}>*/}
              {/*  <Button*/}
              {/*    onPress={this.loginWithGoogle}*/}
              {/*    title="Login with Google"*/}
              {/*    color="white"*/}
              {/*  />*/}
              {/*</View>*/}
            </View>
          </ScrollView>
        </SafeAreaView>
        {/*<Button*/}
        {/*  title='console'*/}
        {/*  onPress={() => console.warn('aaa')}*/}
        {/*  color='#00FF00'*/}
        {/*/>*/}
        <View style={styles.buttonContainerLogin}>
          {/*<Button*/}
          {/*  onPress={this.loginWithGoogle}*/}
          {/*  title="Login with Google"*/}
          {/*  color="white"*/}
          {/*/>*/}
          {/*<GoogleSigninButton*/}
          {/*  onPress={this.signInGoogle}*/}
          {/*  color={GoogleSigninButton.Color.Dark}*/}
          {/*/>*/}
        </View>
      </>
    );
  }
};

// function _onPressButton() {
//
//   geolocation.setRNConfiguration(config);
//   geolocation.requestAuthorization();
//   geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
//   alert('You are from ...')
// }


// export async function googleLogin() {
    // add any configuration settings here:
  //   // const data = _signIn();
  //
  //   // create a new firebase credential with the token
  //   const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
  //   // login with credential
  //   const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  //
  //   console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  // } catch (e) {
  //   console.error(e);
  // }
// }

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonContainer:{
    margin: 20,
    backgroundColor: '#FF0000'
  },
  buttonContainerLogin:{
    // flex: 1,
    // justifyContent: 'flex-end',
    width: '90%',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    margin: 20,
    // height: 30,
    // backgroundColor: '#0000FF'
  },
  buttonLogin:{
    // flex: 1,
    // justifyContent: 'flex-end',
    // width: '20%',
    // height: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
    // top: 20,
    // right: 20,
    // margin: 20,
    // height: 30,
    // backgroundColor: '#0000FF'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;
