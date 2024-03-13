import { useEffect } from 'react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import {
    VscChromeClose
} from "react-icons/vsc";

const Toasted = ({ message, showToast, setShowToast, getToasted, error = false }) => {
    const options = {
        position: 'bottom-center',
        duration: 5000,
      
        // Styling
        style: {
            color: '#fff',
            backgroundColor: error ? '#f44335' : '#4baf51',
            maxWidth: '300px'
        }
    };

    const notify = () => toast(message, options);

    useEffect(() => {
        if(showToast) {
            getToasted(notify);
            setShowToast(false);
        }
    }, [showToast]);

    
    return (
        <Toaster>
        {(t) => (
            <ToastBar toast={t}>
            {({ message }) => (
                <>
                {message}
                {t.type !== 'loading' && (
                    <VscChromeClose onClick={() => toast.dismiss(t.id)} />
                )}
                </>
            )}
            </ToastBar>
        )}
        </Toaster>
    )
}

export default Toasted;