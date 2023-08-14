const lengthSlider = document.querySelector(".pass-length input");
generateBtn = document.querySelector(".generate-btn");
options = document.querySelectorAll(".option input");
passIndicator = document.querySelector(".pass-indicator");
copyIcon = document.querySelector(".material-symbols-rounded");
passwordInput = document.querySelector(".input-box input");

const updatePassIndicator =() =>{
    passIndicator.id = lengthSlider.value <=8 ? "weak" :lengthSlider.value <=16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    updatePassIndicator();
    generatePassword();
    
}


const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "><[]{}()~:;!@#$%^&*|+-/"
}

const generatePassword = () => {
    let staticPassword = "";
    randomPassword = "";
    excludeDuplicate = false;
    passLength = lengthSlider.value

    

    options.forEach(option => {
        if (option.checked) {
            if(option.id !== "exc-duplicates" &&option.id !=="spaces" ){
                staticPassword += characters[option.id];
            }
            else if(option.id ==="spaces"){
                staticPassword += ` ${staticPassword} `;
            }
            else{
                excludeDuplicate = true;
            }
            

        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else{
            randomPassword += randomChar;
        }
    }
    console.log(randomPassword);
    passwordInput.value = randomPassword;

}

const copyPass = () =>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    },700);
}

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click",copyPass);
