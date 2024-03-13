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