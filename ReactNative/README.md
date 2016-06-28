# React-Native
Important points, that should be take care
- First you have to intall react native in you machine.
- After creating project, you should install watchman in project root directory and install BleachBit from package manager. BleachBit is used to make some free space in kernel.
- Only check output on Mobile device not emulator, becuase emulator occupy more than 1gb space in ram.
- You can make changes two files in index.android.js for android and index.ios.js for ios.

Topics:
- Text-> We use <Text> tag on the place of `<p>`.
- View-> We use <View> tag on the place of `<div>`.
- Images-> It is use for insert images.
- TouchableOpacity-> It is work like button.
- We use style sheet in two ways ->
	
	1. Inline style->
			
		`<View style={[ { width: 10, height: 10 }]} />`

	
	2. External style->

		`javascript
		<Text style={styles.base} />
		<View style={styles.background} />

		var styles = StyleSheet.create({
		 	base: {
		    	width: 38,
		    	height: 38,
		  	},
		  	background: {
		    backgroundColor: '#222222',
		},
			active: {
		    	borderWidth: 2,
		    	borderColor: '#00ff00',
		  	},
		});`