import { useState } from "react";

import Button from "../../../reusable/button/button.component";
import Snackbar from '../../../reusable/snackbar/snackbar.component';

import Client from "../../../../tools/client";

import {
    ImageFileInput,
    ImagePlaceholder,
    MainContainer,
    MainForm,
    MainTitle
} from './import-image.styles';

const client = new Client();

const ImportImage = ({ id, name, getProduct }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ caption, setCaption ] = useState('');

    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const addProductImage = async () => {
        if(image === '') {
            setMsgContent('Please select an image.');
            setMsgType('error');
            setShowMsg(true);
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', id);
        if(caption === '') {
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
                    <img src={imagePreview} width='200px' height='200px' />    
                :
                <>
                    <ImagePlaceholder />
                    <MainTitle>Add Product Image</MainTitle>
                </>
                }
                <ImageFileInput type="text" name="caption" value={caption} onChange={e => setCaption(e.target.value)} placeholder={'Image Caption'} />
                <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
            </MainForm>
            {showMsg &&
                <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
            }

            <Button onClick={() => addProductImage()}>Add Image</Button>
        </MainContainer>
    )
}

export default ImportImage;