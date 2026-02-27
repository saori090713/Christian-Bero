function login() {
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   const error = document.getElementById("error");

   if((username == "Francois") && (password == "1234")) {
    error.innerHTML = "Login successful";
    error.style.color = 'green';
    error.style.backgroundcolor = 'yellow'
    error.style.visibility = 'visible';
   }
   else {
    error.innerHTML = "username or password is incorrect";
    error.style.color = 'red';
    error.style.visibility = 'visible';
   }
}