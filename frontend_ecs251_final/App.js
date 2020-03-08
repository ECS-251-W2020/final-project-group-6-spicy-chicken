import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE = 38.54;
const LATITUDE = 0;
// const LONGITUDE = -121.74;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      location: null,
      userName: null,
      loggedIn: false,
      userIcon: require('./img/defaultIcon.jpeg'),
      email: null,
      region: {latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA},
      timestamp: null,
      markers: [{
        coordinates: {
          latitude: 38.56662952687242,
          longitude: -121.69350184869285,
        },
      },
        {
          coordinates: {
            latitude: 38.540992101621875,
            longitude: -121.75569999209594,
          },
        }]
    };
  }

  componentDidMount() {

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

    Geolocation.getCurrentPosition(
        position => {
          this.setState({region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }, timestamp: position.timestamp});
          // console.warn(position.coords.latitude + position.coords.longitude);
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            timestamp: position.timestamp
          });
        }
    );
    setInterval(this.refreshEvents, 5000);
  }

  componentWillUnmount(): void {
    Geolocation.clearWatch(this.watchID);
  }

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.warn(userInfo);
      var name = userInfo.user.name;
      var iconURL = userInfo.user.photo;
      // email = userInfo.user.email;
      this.setState({ userName: name, loggedIn: true, userIcon: {uri: iconURL}});
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      await firebase.auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.warn('error')
      }
    }
  };

  signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userName: null, loggedIn: false, userIcon: require('./img/defaultIcon.jpeg') }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  sendCrashInfo = () => {
    if (this.state.userName == null) {
      Alert.alert('Sign in first!!');
    } else {
      var sendString = "accountId=" + this.state.userName + "&";
      sendString += "latitude=" + this.state.region.latitude + "&";
      sendString += "longitude=" + this.state.region.longitude + "&";
      sendString += "timestamp=" + this.state.timestamp;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://spicy-chicken.ddns.net/report', true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(sendString);
      this.getEventList(this.saveEvents);
    }

    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", 'http://spicy-chicken.ddns.net/list', true);
    // xhr.send();
    // console.warn(JSON.stringify(xhr.responseText));

    // Geolocation.getCurrentPosition(
    //     position => {
    //       this.setState({region: {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           latitudeDelta: LATITUDE_DELTA,
    //           longitudeDelta: LONGITUDE_DELTA,
    //         }});
    //       const initialPosition = JSON.stringify(position);
    //       // console.warn(initialPosition);
    //       // this.setState({location: initialPosition});
    //       var sendString = "accountId=" + this.state.userName + "&";
    //       sendString += "latitude=" + position.coords.latitude + "&";
    //       sendString += "longitude=" + position.coords.longitude + "&";
    //       sendString += "timestamp=" + position.timestamp;
    //       const xhr = new XMLHttpRequest();
    //       xhr.open("POST", 'http://spicy-chicken.ddns.net/report', true);
    //       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //       xhr.send(sendString);
    //     },
    //     error => Alert.alert('Error', JSON.stringify(error)),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );


  };

  onPressLoginButton = () => {
    if (this.state.loggedIn === false) {
      this.signInGoogle();
    } else {
      console.warn('logged out');
      this.signOutGoogle();
    }
  };

  refreshEvents = () =>{
    this.getEventList(this.saveEvents);
  };

  saveEvents = xhr =>{
    var events = xhr.response;
    // console.warn(events[0]);
    var markerList = [];
    for (let i = 0; i < events.length; i++) {
      markerList.push(
          {
            coordinates:{
              latitude: events[i].Latitude,
              longitude: events[i].Longitude
            }
          }
      )
    }
    this.setState({markers: markerList});
  };

  getEventList = callBackFunc =>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://spicy-chicken.ddns.net/list', true);
    xhr.responseType = 'json';
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        if (this.status === 200) {
          callBackFunc(this);
        }
      }
    };
  };

  render()
  {
    return (
        <>
          <StatusBar barStyle="dark-content"/>
          {/*<SafeAreaView>*/}
          {/*  <ScrollView*/}
          {/*      contentInsetAdjustmentBehavior="automatic"*/}
          {/*      style={styles.scrollView}>*/}
          <MapView
              style={ styles.mapContainer }
              showsUserLocation={ true }
              region={ this.state.region }
              onRegionChange={ region => this.setState({region}) }
              onRegionChangeComplete={ region => this.setState({region}) }
          >
            {this.state.markers.map(marker => (
                <MapView.Marker
                    coordinate={marker.coordinates}
                />
            ))}
          </MapView>
          <View style={styles.buttonLogin}>
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
          <View style={styles.buttonCrash}>
            <Button
                onPress={this.sendCrashInfo}
                title="Crash!"
                color="white"
            />
          </View>
              {/*<View style={styles.buttonContainer}>*/}
              {/*  <Button*/}
              {/*      onPress={this.getCurrentLocation}*/}
              {/*      title="Crash!"*/}
              {/*      color="white"*/}
              {/*  />*/}
              {/*</View>*/}
              {/*<View style={styles.body}>*/}

                {/*<View style={styles.sectionContainer}>*/}
                {/*  <Text style={styles.sectionTitle}>Simulate a crash</Text>*/}
                {/*  <Text style={styles.sectionDescription}>*/}
                {/*    click the following button to simulate a crash*/}
                {/*  </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.buttonContainer}>*/}
                {/*  <Button*/}
                {/*      onPress={this.getCurrentLocation}*/}
                {/*      title="Crash!"*/}
                {/*      color="white"*/}
                {/*  />*/}
                {/*</View>*/}
                {/*<View style={styles.sectionContainer}>*/}
                {/*  <Text style={styles.sectionTitle}>Information</Text>*/}
                {/*  <Text style={styles.sectionDescription}>*/}
                {/*    User: {this.state.userName} {"\n"}*/}
                {/*    Location: {this.state.location}*/}
                {/*  </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.buttonContainerLogin}>*/}
                {/*  <Button*/}
                {/*    onPress={this.loginWithGoogle}*/}
                {/*    title="Login with Google"*/}
                {/*    color="white"*/}
                {/*  />*/}
                {/*</View>*/}
              {/*</View>*/}
            {/*</ScrollView>*/}
          {/*</SafeAreaView>*/}
          {/*<Button*/}
          {/*  title='console'*/}
          {/*  onPress={() => console.warn('aaa')}*/}
          {/*  color='#00FF00'*/}
          {/*/>*/}
          {/*<View style={styles.buttonContainerLogin}>*/}
            {/*<Button*/}
            {/*  onPress={this.loginWithGoogle}*/}
            {/*  title="Login with Google"*/}
            {/*  color="white"*/}
            {/*/>*/}
            {/*<GoogleSigninButton*/}
            {/*  onPress={this.signInGoogle}*/}
            {/*  color={GoogleSigninButton.Color.Dark}*/}
            {/*/>*/}
          {/*</View>*/}
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
  mapContainer: {
    height: '100%',
    width: '100%',
  },
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
    position: 'absolute',//use absolute position to show button on top of the map
    top: '5%', //for center align
    alignSelf: 'flex-end' //for align to right
  },
  buttonCrash:{
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    margin: 10,
    // bottom: 20,
    position: 'absolute',//use absolute position to show button on top of the map
    top: '90%', //for center align
    // alignSelf: 'flex-end', //for align to right
    backgroundColor: '#FF0000'
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
