const usernameRegex = /^[a-zA-Z0-9\-._!?@#$]+$/;
const usernameMinLength = 4;
const usernameMaxLength = 30;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
const passwordMinLength = 8;
const passwordMaxLength = 30;

export const usernameValidation = (username) => {
  if(username.length < usernameMinLength || 
    username.length > usernameMaxLength ||
    !usernameRegex.test(username)){
    return false;
  }
  return true;
}

export const usernameInputValidation = (e, setValue) => {
  if(e.includes(' ')) {
    return
  }

  if(e.length === usernameMaxLength) {
    return;
  }

  if(!usernameRegex.test(e) && e !== '') {
    return
  }
  
  return setValue(e);
}

export const passwordValidation = (password) => {
  if(password.length < passwordMinLength || 
    password.length > passwordMaxLength ||
    !passwordRegex.test(password)){
    return false;
  }
  return true;
}

export const phoneInputValidation = (e, setValue) => {
  const reg = /^\d+$/;
  if(e === '' || (reg.test(e) && e.length <= 10)) {
      return setValue(e);
  } else {
      return
  }
}

export const zipCodeInputValidation = (e, setValue) => {
  const reg = /^\d+$/;
  if(e === '' || (reg.test(e) && e.length <= 5)) {
      return setValue(e);
  } else {
      return
  }
}