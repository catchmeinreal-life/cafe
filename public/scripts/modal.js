let logIn = document.getElementById('id01');
let signIn= document.getElementById('id02');


//when user clicks anywhere outside the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showLoginForm(){
    signIn.classList.remove('active-modal');
    logIn.classList.add('active-modal' );
    // alert('cicked');
}
function showSignupForm(){
    logIn.classList.remove('active-modal');
    signIn.classList.add('active-module' );
}