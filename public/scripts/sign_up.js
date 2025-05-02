let signIn = document.getElementById('signupForm');

signIn.onsubmit = async (e) => {
    e.preventDefaut();
    let response = await fetch('/api/sign-up',{
        method : 'POST',
        body : new FormData(signIn)
    });
    let result = await response.json();
    alert(result.message);
}