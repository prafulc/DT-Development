Students = new Mongo.Collection("students");
Students.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },

  phone:{
  	type: Number,
  	label: "Mobile"
  },

  city: {
    type: String,
    optional: true,
    label: "City",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Delhi", value: "Delhi"},
          {label: "Goa", value: "Goa"},
          {label: "Kolkata", value: "Kolkata"},
          {label: "Banglore", value: "Banglore"},
          {label: "Chennai", value: "Chennai"},
          {label: "Pune", value: "Pune"}
        ];
      }
    }
  },

  gender: {
    type: String,
    optional: true,
    label:"Gender",
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Male", value: 'Male'},
          {label: "Female", value: 'Female'}
        ];
      }
    }
  },

  description: {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  }




}));
