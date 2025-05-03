
// 
let response = await fetch('https://s.yimg.com/wm/mbr/5a440ef254c29a2e5b58ad61c4e9a2e6ef4a5783/bundle.js');

if (response.ok) {
    let json = await response.json();
} else {
    alert(`HTTP-Error ${response.status}`)
}