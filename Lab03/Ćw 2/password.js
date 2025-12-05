const upperCase = document.getElementById("pass-upper-case");
const specialChars = document.getElementById("pass-special-chars");
const minLength = document.getElementById("pass-min-length");
const maxLength = document.getElementById("pass-max-length");
const alphabetStr = "abcdefghijklmnopqrstuvwxyz"
const specialCharsStr = "!@#$%^&*()[]{},./?"
const submit = document.getElementById("submit")

submit.addEventListener("click", () => {
    const allowUpperCase = upperCase.checked;
    const allowSpecialChars = specialChars.checked
    const max = parseInt(maxLength.value);
    const min = parseInt(minLength.value);
    const passwordLength = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (max == ""){
        alert("Podaj maksymalną długość!!!");
        return;  
    }
    if (min == ""){
        alert("Podaj minimalną długość!!!");
        return;
    }
    if (min >= max){
        alert("Maksymalna długość hasła musi być większa od minimum!!!");
        return;
    }
    

    let password = []
    for (let i = 0; i < passwordLength; i++){
        if (allowSpecialChars && Math.random() < 0.5)
            password.push(getRandomFromStr(specialCharsStr));
        else{
            if(allowUpperCase && Math.random() < 0.5)
                password.push(getRandomFromStr(alphabetStr.toUpperCase()))
            else
                password.push(getRandomFromStr(alphabetStr))
        }
    }
    
    alert(password.join(''));
});


function getRandomFromStr(string){
    return string[Math.floor(Math.random() * string.length)]
}