// let logIn = document.getElementById('id01');
// let signIn= document.getElementById('id02');


//when user clicks anywhere outside the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function showLoginForm() {
    let element = document.getElementById("id02");
    let element1 = document.getElementById("id01");
    element.classList.remove("active-modal");
    element1.classList.toggle("active-modal");


    
}

function showSignUpForm() {
    let element = document.getElementById("id02");
    let element1 = document.getElementById("id01");
    element1.classList.remove("active-modal");
    element.classList.toggle("active-modal");
}
// var element = document.getElementById("myElement");
// if (element.classList.contains("myClass")) {
// element.classList.remove("myClass");
// } else {
// element.classList.add("myClass");
// }


// function showLoginForm(){
//     signIn.classList.remove('active-modal');
//     logIn.classList.add('active-modal' );
//     // alert('cicked');
// }

