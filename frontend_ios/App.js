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
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {

  state = {
    location: null
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        curr_location = JSON.stringify(position);
        this.setState({location: curr_location});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

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
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Simulate a crash</Text>
                <Text style={styles.sectionDescription}>
                  click the following button to simualate a crash
                </Text>
              </View>
              <Button
                onPress={this.getCurrentLocation}
                title="Crash!"
                color="red"
              />
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Information</Text>
                <Text style={styles.sectionDescription}>
                  {this.state.location}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

function _onPressButton() {
  // alert('You tapped the button!')
  // var GeoIpNativeLite = require('geoip-native-lite');

// Must load data before lookups can be performed.
//   GeoIpNativeLite.loadDataSync();

// Data loaded successfully.
// Ready for lookups.
//   var ip = '128.21.16.34';
//   var country = GeoIpNativeLite.lookup(ip);

  // if (country) {
  //   console.log(ip, 'is geo-located in', country.toUpperCase());
  // } else {
  //   console.log('Failed to geo-locate the IP address:', ip);
  // }
  // alert('You are from ' + country)
  geolocation.setRNConfiguration(config);
  geolocation.requestAuthorization();
  geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
  alert('You are from ...')
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
