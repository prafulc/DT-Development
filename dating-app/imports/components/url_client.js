Accounts.onEmailVerificationLink(function(token, done){
  console.log("token", token);
  console.log("done", done);
  if(token){
    Accounts.verifyEmail(token, function (error, data){
      if(!error) {
        alert('done!');
      } 
    })
  }
})