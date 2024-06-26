import { useContext, useState } from "react";

import Button from "../../../reusable/button/button.component";

import { ToastContext } from '../../../../contexts/toast.context';

import Client from "../../../../tools/client";

import {
    ImageFileInput,
    MainContainer,
    MainForm,
    MainTitle
} from './import.styles';

const client = new Client();

const ImportWelcomeImage = ({ refreshImages }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ caption, setCaption ] = useState('');
    const [ link, setLink ] = useState('');
    const [ position, setPosition ] = useState('');
    
    const { errorToast } = useContext(ToastContext);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
      }

    const createWelcomeImage = async () => {
        if(image === '') {
            errorToast('Please select an image.');
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        if(caption !== '') {
            formData.append('caption', caption);
        }
        if(link !== '') {
            formData.append('link', link);
        }
        if(position !== '') {
            formData.append('position', position);
        }

        await client.postWelcomeImage(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');
        setCaption('');
        setLink('');
        setPosition('');

        refreshImages();
    }

    return (
        <MainContainer>
            <MainTitle>Add New Welcome Image</MainTitle>
            <MainForm>
                {imagePreview && <img src={imagePreview} width='200' height='200' alt='preview' />}
                <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
                
                <ImageFileInput type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Caption' />
                <ImageFileInput type='text' value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link' />
                <ImageFileInput type='number' value={position} onChange={(e) => setPosition(e.target.value)}  placeholder='Position' />
            </MainForm>

            <Button onClick={() => createWelcomeImage()}>Add</Button>
        </MainContainer>
    )
}

export default ImportWelcomeImage;