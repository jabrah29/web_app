  var userName=""
var password=""
var expr=/^[a-z0-9]+$/i

var passwordPass=false
var usernamePass=false


password=document.getElementById("password")

function passGetVal(){
    var error1 = document.getElementById("pass1error");
    var error2 = document.getElementById("pass2error");
    var error3= document.getElementById("pass3error");
    var error4=document.getElementById("pass4error")
    var edValue = document.getElementById("password");
      var s = edValue.value;
      if(edValue.value.length>0){
      if(!s.match(/\d+/g) || !s.match(/[a-z]/) || !s.match(/[A-Z]/) || edValue.value.length<8){
        if(!s.match(/\d+/g)){
          error1.style.color="red"
          error1.innerText="Must contain at least 1 digit"
          passwordPass=false;

        }else{
          error1.innerText=""
          passwordPass=true
        } if(!s.match(/[a-z]/)){
          error2.style.color="red"
          error2.innerText="Must contain lowercase letter"
          passwordPass=false

        }else{
          error2.innerText=""
          passwordPass=true
        }

        if (!s.match(/[A-Z]/) ){
          error3.style.color="red"
          error3.innerText="Must contain uppercase letter"
          passwordPass=false
  
        }else{
          error3.innerText=""
          passwordPass=true
        } 

        if (edValue.value.length<8){
          error4.style.color="red"
          error4.innerText="Must be longer than 8 characters"
          passwordPass=false

        }else{
          error4.innerText=""
          passwordPass=true
        }
      }else{
        error1.innerText=""
        error2.innerText=""
        error3.innerText=""
        error4.innerText=""
        passwordPass=true
      }
  }else{
    error2.innerText=""
    error1.innerText=""
    error3.innerText=""
    error4.innerText=""
  }
  return passwordPass
}

console.log(usernamePass)

function userNameGetVal(){
  var error1 = document.getElementById("user1error");
var error2 = document.getElementById("user2error");
    var edValue = document.getElementById("username");
      var s = edValue.value;
      if(edValue.value.length>0){
      if(!s.match(expr) || edValue.value.length <5){

        if(!s.match(expr)){
          error1.style.color="red"
          error1.innerText="  Must contain alpha-numeric values"
        }else{
          error1.innerText=""
        }

        if(edValue.value.length <5){
          error2.style.color="red"
          error2.innerText="  Must be longer than 5 characters"
        }else{
          error2.innerText=""
        }

      }else{
         error2.innerText=""
         error1.innerText=""
      }
  }else{
    error2.innerText=""
    error1.innerText=""
  }

  if(error2.innerText.length>0 || error1.innerText.length>0){
    usernamePass=false
  }else{
    usernamePass=true
  }

  return usernamePass

}

function handleRegistration(){
  username=document.getElementById("username").value
  password=document.getElementById("password").value

  if(userNameGetVal() && passGetVal()){
    var obj={user_name:username, user_password:password}
    var database = firebase.database();
    console.log(database)
      database.ref('users').set(obj);

  }
}