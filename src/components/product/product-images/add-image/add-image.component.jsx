import { useContext, useState } from "react";

import Button from "../../../reusable/button/button.component";

import { ToastContext } from '../../../../contexts/toast.context';

import Client from "../../../../tools/client";

import {
    ImageFileInput,
    MainContainer,
    MainForm,
    MainTitle
} from './add-image.styles';

const client = new Client();

const AddImage = ({ id, name, getProduct }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ caption, setCaption ] = useState('');
    
    const { errorToast } = useContext(ToastContext);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const addProductImage = async () => {
        if(image === '') {
            errorToast('Please select an image.');
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', id);
        if(caption !== '') {
            formData.append('caption', name);
        }

        await client.addProductImage(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');
        setCaption('');

        getProduct();
    }

    return (
        <MainContainer>
            <MainForm>
                {imagePreview ?
                    <>
                        <img src={imagePreview} width='200px' height='200px' alt='preview' />  
                        <Button onClick={() => addProductImage()}>Add Image</Button>  
                    </>
                :
                    <>
                        <MainTitle>Add Image</MainTitle>
                        <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
                    </>
                }
            </MainForm>
        </MainContainer>
    )
}

export default AddImage;