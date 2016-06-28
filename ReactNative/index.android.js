/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TextInput
} from 'react-native';
// import './ResponderEventPlugin.js';

class ReactNative extends Component { 
  getInitialState() { return { myButtonOpacity: 1, } }
  constructor(props) { 
    super(props); 
    this.state = { w: 100, h: 100 }; 
    this._onPress = this._onPress.bind(this); 
  } 
  componentWillMount() {  // Animate creation
    LayoutAnimation.spring(); 
  }
  _onPress() {  // Animate the update
    LayoutAnimation.spring(); 
    this.setState({w: this.state.w + 15, h: this.state.h + 15}) 
  } 
  clearText() { 
    this._textInput.setNativeProps({text: ''});
  }
  render() { 
    return ( 
      <View style={styles.container}> 
        <Text style={[styles.hed1]}>-------- Change Position --------</Text>
        <View style={[styles.box, {width: this.state.w, height: this.state.h}]} > 
          <TouchableOpacity onPress={this._onPress}> 
            <View style={styles.button}>
              <Text accessibilityLiveRegion="assertive" style={styles.buttonText}>Press me!</Text> 
            </View> 
          </TouchableOpacity> 
        </View>
        <Text style={[styles.hed1]}>-------- Change Opacity --------</Text>
        <View>
          <TouchableOpacity onPress={() => this.setState({myButtonOpacity: 0.1})} onPressOut={() => this.setState({myButtonOpacity: 1.0})}>
            <View style={[styles.button, {opacity: this.state.myButtonOpacity}]}>
              <Text>Press me-2!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[styles.hed1]}>-------- Clear Input --------</Text>
        <View>
          <TextInput ref={component => this._textInput = component} style={styles.textInput} />
          <TouchableOpacity onPress={this.clearText}>
            <Text>Clear text</Text>
          </TouchableOpacity>
        </View>
      </View> 
    ); 
  } 
};

var styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },
  background: {
    backgroundColor: '#222222',
  },
  button: {
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  buttonText:{
    borderColor: '#00ff00'
  },
  hed1:{
    fontSize:20
  },
});
AppRegistry.registerComponent('ReactNative', () => ReactNative);
