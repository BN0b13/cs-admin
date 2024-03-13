import { createContext, useState } from "react";

export const ToastContext = createContext({
    toastMessage: '',
    setToastMessage: () => null,
    toastError: false,
    setToastError: () => null,
    showToast: false,
    setShowToast: () => null,
    getToasted: () => null,
    successToast: () => null,
    errorToast: () => null
});

export const ToastProvider = ({ children }) => {
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const successToast = (message) => {
        setToastMessage(message);
        setToastError(false);
        setShowToast(true);
    }

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }
    
    const value = { toastMessage, setToastMessage, toastError, setToastError, showToast, setShowToast, getToasted, successToast, errorToast };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};