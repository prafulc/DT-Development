import React, { Component, PropTypes } from 'react';

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
 

// Task component - represents a single todo item

export default class Task extends Component {
	constructor(props) { 
		super(props);
		this.state = {message: ''};
	}

	clearText() { 
		window.alert('------------'+ this.state.message);
  }
  focusNextField(nextField) { 
  	window.alert('-----',this.refs[nextField].focus());
  }
  render() {
    return (
      <View>
      	<Text style={[styles.hed1]}>-------- Clear Input --------</Text>
        <View>
          <TextInput ref='message' style={styles.textInput} placeholder="Hii I am TextInput" onChangeText={(message) => {
           	this.setState({message});
          	window.alert('------------'+ message + ' -----> '+ this.state.message);
          }} onSubmitEditing={(message) => this.focusNextField(message)}/>
          <TouchableOpacity onPress={this.clearText}>
            <Text>Clear text</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
	}
}
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
 