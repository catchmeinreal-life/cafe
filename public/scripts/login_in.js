/**
 * sql query
 * check if the email is available
 * 
*/

document.addEventListener("DOMContentLoaded", ()=>{
    const signupForm = document.getElementById("loginForm");

    signupForm.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const form = e.target;
        const formData = {
            email : form.email.value,
            password : form.password.value
        }
        
        alert("form submitted");
        try {
            const response = await fetch("http://localhost:5000/api/login", {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
             });

            const result = await response.json();

            if (response.ok) {

                alert(result.message);  //api message

                window.location.href = '/api/main';  //redirect on succesfull signup
            } else {
                alert(`error occured:: ${result.message}`)
                // throw new Error(result.message || "Unknown error");
            }

        } catch (err) {  
            /**error messages from the api route
             * Sign-up failed: >> notify via msg
             */
            console.error("log-in failed:", err);
            alert("log-in failed: " + err.message);
        }
    });
});


