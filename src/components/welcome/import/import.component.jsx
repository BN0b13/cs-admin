import { useState } from "react";

import Button from "../../button/button.component";
import Snackbar from '../../snackbar/snackbar.component';

import Client from "../../../tools/client";

import {
    ImageFileInput,
    MainContainer,
    MainTitle
} from './import.styles';

const client = new Client();

const ImportWelcomeImage = ({ refreshImages }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ name, setName ] = useState('');
    const [ link, setLink ] = useState('');
    const [ position, setPosition ] = useState('');

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

    const createWelcomeImage = async () => {
        if(image === '' ||
            name === '' ||
            link === '' ||
            position === ''
        ) {
            setMsgContent('Please fill out all fields and select an image.');
            setMsgType('error');
            setShowMsg(true);
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('name', name);
        formData.append('link', link);
        formData.append('position', position);

        await client.postWelcomeImage(formData);

        setImage('');
        setImagePreview('');
        setName('');
        setLink('');
        setPosition('');

        refreshImages();
    }

    return (
        <MainContainer>
            <MainTitle>Add New Welcome Image</MainTitle>

            {imagePreview && <img src={imagePreview} width='100' height='100' />}
            <ImageFileInput type="file" accept='image/*' name="files" onChange={e => handleFileChange(e)} />
            
            <ImageFileInput type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <ImageFileInput type='text' value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link' />
            <ImageFileInput type='number' value={position} onChange={(e) => setPosition(e.target.value)}  placeholder='Position' />

            {showMsg &&
                <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
            }

            <Button onClick={() => createWelcomeImage()}>Add</Button>
        </MainContainer>
    )
}

export default ImportWelcomeImage;