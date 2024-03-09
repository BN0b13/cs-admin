import { useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';
import Toasted from '../../reusable/toasted/toasted.component';

import Client from '../../../tools/client';

import {
    ImageFileInput,
    MainContainer,
    MainForm,
    MainTitle
} from './add-company-logo.styles';

const client = new Client();

const AddCompanyLogo = ({ id, getCompany }) => {
    const [ loading, setLoading ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const createLogo = async () => {
        setLoading(true);
        if(image === '') {
            errorToast('Please select a logo to submit.');
            setLoading(false);
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', id);

        await client.addCompanyLogo(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');

        await getCompany();
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <MainForm>
                    {imagePreview ?
                        <>
                            <img src={imagePreview} width='200px' height='200px' />  
                            <Button onClick={() => createLogo()}>Add Logo</Button>  
                        </>
                    :
                        <>
                            <MainTitle>Add Company Logo</MainTitle>
                            <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
                        </>
                    }
                </MainForm>
            }
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </MainContainer>
    )
}

export default AddCompanyLogo;