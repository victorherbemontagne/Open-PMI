(function() {
  'use strict';

  // Access the form element...
  const formCreation = document.getElementById( "fomulaireDeContact" );
  

  // take over its submit event.
  formCreation.addEventListener( "submit", function ( event ) {
    event.preventDefault();

    showLoader()
    showSteps()
    hideError()

    

    let fd = new FormData();
    
    fd.append('name', formCreation['name'].value);
    fd.append('email', formCreation['email'].value);
    fd.append('message', formCreation['message'].value);

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      let content = JSON.parse(event.target.response)
      if (content['error'] === "True"){
        console.log("ERROR");
        writeError(content["message"])
        enableInputs();
        hideLoader();
        hideSteps()

      }
      else {
        console.log("Account successfully created ")
        showStep("account-created")
        //Now computing payment..
      }
    });
    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      writeError("Nous n'avons pas pu envoyer votre message, réessayez plus tard s'il vous plait.");
      hideLoader()
    } );

    // Set up our request
    XHR.open( "POST", "https://xn-dev.gazouyi.com/users/create" );

    // XHR.open( "POST", "https://api.gazouyi.com/users/create" );

    // The data sent is what the user provided in the form
    XHR.send(FD );
  } );



})();


function enableInputs() {
  var form = document.getElementById('userCreation');
  Array.prototype.forEach.call(
    form.querySelectorAll(
      "input[type='text'], input[type='email'], input[type='password']"
    ),
    function(input) {
      input.removeAttribute('disabled');
    }
  );
}

function disableInputs() {
  var form = document.getElementById('userCreation');
  Array.prototype.forEach.call(
    form.querySelectorAll(
      "input[type='text'], input[type='email'], input[type='password']"
    ),
    function(input) {
      input.setAttribute('disabled', 'true');
    }
  );
}

function triggerBrowserValidation(form) {
  // The only way to trigger HTML5 form validation UI is to fake a user submit
  // event.
  var submit = document.createElement('input');
  submit.type = 'submit';
  submit.style.display = 'none';
  form.appendChild(submit);
  submit.click();
  submit.remove();
}

function test(){
  document.getElementById('globalContent').style = 'display: none';
  document.getElementById('success-content').style = 'display: flex';
  // document.getElementById('button-hide').style = 'display: none';
  console.log(":test!");
};

function writeError(message){
  var form = document.getElementById('userCreation');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');
  error.classList.add('visible');
  errorMessage.innerText = message
};

function hideError(){
  var form = document.getElementById('userCreation');
  var error = form.querySelector('.error');
  error.classList.remove('visible');
};

function showLoader(){
  document.getElementById('button-text').style = 'display: none';
  document.getElementById('spinner').style = 'display: block';
};

function hideLoader(){
  document.getElementById('button-text').style = 'display: block';
  document.getElementById('spinner').style = 'display: none';
};
