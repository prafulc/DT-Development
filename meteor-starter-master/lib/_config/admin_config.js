AdminConfig = {
  name: 'My App',
  collections: {
    Posts: {
		color: 'red',
		icon: 'pencil',
		extraFields: ['owner'],	//extraFields comes from collection helpers
		tableColumns: [
			{ label: 'Title', name: 'title' },
            { label: 'Published', name: 'createdAt'},
            { label: 'Content', name: 'content'},
			{ label: 'User', name: 'author', template: '' }
		]
    },
    
    Games: {
    	color: 'green',
    	icon: 'gamepad',
    	tableColumns: [
    		{label: 'Game Name', name: 'name'},
    		{label: 'category', name: 'category'},
    		{label: 'rating', name: "rating" }
    	]
    },

    Comments: {
    	color: 'yellow',
    	icon: 'comments',
		extraFields: ['doc', 'owner'],	
		/*extraFields comes from collection helpers... We can take name field from tableColumns from same place*/
    	tableColumns: [
			{ label: 'Content', name: 'content' },
			{ label: 'Post', name: 'docTitle()', template: 'adminPostCell' }, 
			{ label: 'User', name: 'author()', template: 'adminUserCell' }, 
			{ label: 'Games', name: 'gameid()', template: 'adminGameCell' } 
			/*template: needs to be present in admin.html file
			*name: needs to be present in collection file
			*/
		]
    }
  },

  dashboard:{
	homeUrl: '/dashboard',
  },

  autoForm:{
  	omitFields: ['createdAt', 'updatedAt']
  }
	
};