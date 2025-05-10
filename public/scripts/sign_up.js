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
        console.log(data);

        try {
            const response = await fetch("http://localhost:5000/api/sign-up", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
             });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unknown error");
            }

            alert(result.message);
        } catch (err) {
            console.error("Signup failed:", err);
            alert("Signup failed: " + err.message);
        }
    })
})


// let signIn = document.getElementById('signupForm');

// signIn.onsubmit = async (e) => {
//     e.preventDefaut();
//     let response = await fetch('/api/sign-up',{
//         method : 'POST',
//         body : new FormData(data)
//     });
//     let result = await response.json();
//     alert(result.message);
// }