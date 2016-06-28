Meteor.methods({
  isProductionEnvironment: function () {
    var nodeEnv = process.env.NODE_ENV + '';

    if (nodeEnv.toLowerCase() === 'production') {
      return true;
    } else {
      return false;
    }
  }
});