var studentHooks = {
//We are using this hook for student insert form 
  onSuccess: function (formType, result) {

		//console.log("result is = ", result);//We'll get inserted _id
		FlowRouter.go('/students/');
	}
};


var studentUpdateHooks = {
//We are using this hook for student update form 
  onSuccess: function (formType, result){
    FlowRouter.go('/students/');
  }
} 


AutoForm.addHooks('insertstudent', studentHooks);
AutoForm.addHooks('updatestudent', studentUpdateHooks);