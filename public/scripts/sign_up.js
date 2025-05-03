let signIn = document.getElementById('signupForm');

// signIn.addEventListener('submit', async (event)=>{
//     event.preventDefault(); //prevent default form submission

//     const userData = {
//         username : document.getElementById('username').value,
//         email : document.getElementById('email').value,
//         password: document.getElementById('password').value,
//         password_repeat: document.getElementById('password_repeat').value
//     };
//     try {
//         const response = await fetch('http://localhost:5000/api/sign-up', {
//             method : 'POST',
//             headers : {
//                 'Content-Type': 'application/json',
//             },
//             body : JSON.stringify(userData) //new FormData(userData)
//         });
//         if(!response.ok){
//             throw new Error(`Server error: ${response.status}`);
//         }
//         const result = await response.json();
//         console.log('sign-up successful:', result);
//     } catch (error) {
//         console.error('sign-up failed', error);
//     }
// })

// signIn.onsubmit = async (e) => {
//     fetch('/api/sign-up', {
//         method : 'POST',
//         body : new FormData(signIn),
//         headers : {
//             'Content-Type':'application/json'
//         }
//     }).then(async response => {
//         if (!response.ok){
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json()
//     }).catch(error => console.error('Fetch error:', error));
    
//     // let response = await fetch('/api/sign-up',{
//     //     method : 'POST',
//     //     body : new FormData(signIn)
//     // });
//     // let result = await response.json();
//     // console.log(result.message);
// }