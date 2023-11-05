export const setMobileView = () => {
    if(window.screen.width >= 760) {
        return false;
    }
    return true;
}

export const setTabletView = () => {
    if(window.screen.width > 1240 || window.screen.width < 760) {
        return false;
    }
    return true;
}

export const convertProductPrice = (price) => {
    return `$${price / 100}`;
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
}

export const formatInputDate = (date) => {
    const monthDay = date.slice(5);
    const year = date.substring(0,4);
    return `${monthDay}-${year}`;
}

export const formatYoutubeUrl = (url) => {
        const removeFirstCharacter = url.substring(1);
        return removeFirstCharacter.slice(0, -1);
}

export const passwordValidation = (password) => {
    const minNumChars = 8;
    const maxNumChars = 30;
    const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if(password.length < minNumChars || 
      password.length > maxNumChars ||
      !regularExpression.test(password)){
      return false;
    }
    return true;
}

export const sortByDateDescending = (data) => {
    return data.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

export const sortByDateAscending = (data) => {
    return data.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
}