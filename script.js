  var userName = ""
  var password = ""
  var expr = /^[a-z0-9]+$/i
  var passwordPass = false
  var usernamePass = false
  //initalize firebase 
  var config = {
      apiKey: "AIzaSyAQZ0o6lhwSe5DO3Hm-kRB_ht9VRJBOOr0",
      authDomain: "interviewdb-9612b.firebaseapp.com",
      databaseURL: "https://interviewdb-9612b.firebaseio.com",
      projectId: "interviewdb-9612b",
      storageBucket: "interviewdb-9612b.appspot.com",
      messagingSenderId: "910404203499"
  };
  firebase.initializeApp(config);
  var allUserNames = []

  var database = firebase.database()


  /**
   * loads all users from database on page load
   */
  window.onload = function() {
      var commentsRef = database.ref('Account');
      commentsRef.on('child_added', function(data) {
          allUserNames.push(data.val()["user_name"])
      });
  }

/**
 * handles incoming password text for errors
 */
  function passGetVal() {
      var digitError = document.getElementById("pass1error");
      var lowercaseError = document.getElementById("pass2error");
      var uppercaseError = document.getElementById("pass3error");
      var lengthError = document.getElementById("pass4error")
      var input = document.getElementById("password");
      var check1 = false
      var check2 = false;
      var check3 = false;
      var check4 = false;
      var check5 = false;
      var inputSoFar = input.value;

      //error validator 
      if (input.value.length > 0) {
          if (!inputSoFar.match(/\d+/g) || !inputSoFar.match(/[a-z]/) || !inputSoFar.match(/[A-Z]/) || input.value.length < 8) {
              if (!inputSoFar.match(/\d+/g)) {
                  digitError.style.color = "red"
                  digitError.innerText = "Must contain at least 1 digit"
                  check1 = false;

              } else {
                  digitError.innerText = ""
                  check1 = true
              }
              if (!inputSoFar.match(/[a-z]/)) {
                  lowercaseError.style.color = "red"
                  lowercaseError.innerText = "Must contain lowercase letter"
                  check2 = false

              } else {
                  lowercaseError.innerText = ""
                  check2 = true
              }

              if (!inputSoFar.match(/[A-Z]/)) {
                  uppercaseError.style.color = "red"
                  uppercaseError.innerText = "Must contain uppercase letter"
                  check3 = false

              } else {
                  uppercaseError.innerText = ""
                  check3 = true
              }

              if (input.value.length < 8) {
                  lengthError.style.color = "red"
                  lengthError.innerText = "Must be longer than 8 characters"
                  check4 = false

              } else {
                  lengthError.innerText = ""
                  check4 = true
              }
          } else {
              digitError.innerText = ""
              lowercaseError.innerText = ""
              uppercaseError.innerText = ""
              lengthError.innerText = ""
              check5 = true
          }
      } else {
          lowercaseError.innerText = ""
          digitError.innerText = ""
          uppercaseError.innerText = ""
          lengthError.innerText = ""
      }
      if (check1 && check2 && check3 && check4) {
          return true
      } else {
          if (check5) {
              return true;
          }
          return false
      }

  }

/**
 * handles incoming user text and checks for errors
 */
  function userNameGetVal() {

      var alphanumError = document.getElementById("user1error");
      var lengthError = document.getElementById("user2error");
      var existingError = document.getElementById("user3error");
      var input = document.getElementById("username");

      var incomingName = input.value;
      if (checkForExistingUsers(incomingName)) {
          existingError.style.color = 'red'
          existingError.innerText = "User name already in use"
      } else {
          existingError.innerText = ""
      }


      //error validator
      if (input.value.length > 0) {
          if (!incomingName.match(expr) || input.value.length < 5) {

              if (!incomingName.match(expr)) {
                  alphanumError.style.color = "red"
                  alphanumError.innerText = "  Must contain alpha-numeric values"
              } else {
                  alphanumError.innerText = ""
              }

              if (input.value.length < 5) {
                  lengthError.style.color = "red"
                  lengthError.innerText = "  Must be longer than 5 characters"
              } else {
                  lengthError.innerText = ""
              }

          } else {
              lengthError.innerText = ""
              alphanumError.innerText = ""
          }
      } else {
          lengthError.innerText = ""
          alphanumError.innerText = ""
      }

      if (lengthError.innerText.length > 0 || alphanumError.innerText.length > 0 || existingError.innerText.length > 0) {
          return false
      } else {
         return true;
      }

  }

/**
 * checks current user text with existing user accounts from database
 * @param {string} incomingName - username text 
 */
  function checkForExistingUsers(incomingName) {
      var exp = new RegExp('\\b' + incomingName + '\\b')

      var len = allUserNames.length;
      var i = 0;

      for (; i < len; i++) {
          if (allUserNames[i].match(exp)) {
              return true
          }
      }
      return false;
  }

  /**
   * Button click handler that checks for errors and creates new account
   */
  function handleRegistration() {
      username = document.getElementById("username").value
      password = document.getElementById("password").value
      var usrCheck = userNameGetVal()
      var passCheck = passGetVal()
      if (usrCheck && passCheck) {
          var obj = {
              user_name: username,
              user_password: password
          }
          database.ref("Account").push(obj);
          alert("Account created!")
      } else if (usrCheck == false || passCheck == false) {
          alert("Please correct all issues before creating account")
      }
  }