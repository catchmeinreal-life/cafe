// import {showLoginForm} from './modal.js'
function showLogin() {
    const signUpModal = document.getElementById("id02"); //sign-up modal
    const loginModal = document.getElementById("id01"); //login modal

    if (signUpModal && loginModal){
        signUpModal.classList.remove("active-modal"); //hide sign-up
        loginModal.classList.add("active-modal"); //show login
    }   
}

document.addEventListener("DOMContentLoaded", ()=>{
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit",async (e)=>{
        e.preventDefault();

        // user info
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const password_repeat = document.getElementById("password_repeat").value;

        alert("form submitted");

        let data = {
            username, email, password, password_repeat
        }


        try {
            const response = await fetch("http://localhost:5000/api/sign-up", {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
             });

            const result = await response.json();

            if (response.ok) {  //show the login modal
                alert(result.message);
                showLogin();  // show login modal
                // window.location.href = '/api/main';  //redirect on succesfull signup
            } else {

                throw new Error(result.message || "Unknown error");
            }

        } catch (err) {  
            /**error messages from the api route
             * Sign-up failed: >> notify via msg
             */
            console.error("Signup failed:", err);
            alert("Signup failed: " + err.message);
        }
    });
});