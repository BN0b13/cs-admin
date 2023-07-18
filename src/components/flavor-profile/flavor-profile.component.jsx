import { useEffect, useState } from 'react';

import Snackbar from '../snackbar/snackbar.component';

import Client from '../../tools/client';

import { api } from '../../config';

import {
    AddFlavorProfileButton,
    AddFlavorProfileBody,
    AddFlavorProfileData,
    AddFlavorProfileInput,
    AddFlavorProfileHead,
    AddFlavorProfileHeader,
    AddFlavorProfileLabel,
    AddFlavorProfileRow,
    AddFlavorProfileTable,
    AddFlavorProfileTextarea,
    MainContainer,
    MainSubtitle,
    MainTitle
} from './flavor-profile.styles';

const client = new Client();

const FlavorProfile = () => {
    const [ flavorProfiles, setFlavorProfiles ] = useState([]);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ icon, setIcon ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');

    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    useEffect(() => {
        getFlavorProfiles();
    }, []);

    const getFlavorProfiles = async () => {
        const res = await client.getFlavorProfiles();

        setFlavorProfiles(res.rows);
    }

    const addFlavorProfile = async () => {
        if(name === '' || description === '' || icon === '') {
            setMsgContent('Please fill out all fields and select an icon.');
            setMsgType('error');
            setShowMsg(true);
            return;
        }

        let formData = new FormData();

        formData.append('files', icon);
        formData.append('name', name);
        formData.append('description', description);

        await client.createFlavorProfile(formData);

        setMsgContent('Flavor Profile created successfully.');
        setMsgType('success');
        setShowMsg(true);
        setName('');
        setDescription('');
        setImagePreview('');
        setIcon('');

        await getFlavorProfiles();
    }

    const handleFileChange = (e) => {
        setIcon(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <MainContainer>
            <MainTitle>Flavor Profiles</MainTitle>
            {imagePreview && <img src={imagePreview} width='50' height='50' />}
            <AddFlavorProfileLabel>Display Icon:
                <AddFlavorProfileInput type='file' accept='image/png'  name='files' onChange={e => handleFileChange(e)} />
            </AddFlavorProfileLabel>
            <AddFlavorProfileInput type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <AddFlavorProfileTextarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />

            {showMsg &&
                <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
            }
            <AddFlavorProfileButton onClick={() => addFlavorProfile()}>Add Flavor Profile</AddFlavorProfileButton>
            <MainTitle>Current Flavor Profiles</MainTitle>
            {flavorProfiles.length === 0 ? 
                <MainSubtitle>No Current Flavor Profiles</MainSubtitle>
            :
                <AddFlavorProfileTable>
                    <AddFlavorProfileHeader>
                        <AddFlavorProfileRow>
                            <AddFlavorProfileHead>Name</AddFlavorProfileHead>
                            <AddFlavorProfileHead>Description</AddFlavorProfileHead>
                            <AddFlavorProfileHead>Icon</AddFlavorProfileHead>
                        </AddFlavorProfileRow>
                    </AddFlavorProfileHeader>
                    <AddFlavorProfileBody>
                        {flavorProfiles.map((item, index) => (
                            <AddFlavorProfileRow key={index}>
                                <AddFlavorProfileData>{ item.name }</AddFlavorProfileData>
                                <AddFlavorProfileData>{ item.description }</AddFlavorProfileData>
                                <AddFlavorProfileData>
                                    <img src={api + item.path} width='40' height='40' />
                                </AddFlavorProfileData>
                            </AddFlavorProfileRow>
                        ))}
                    </AddFlavorProfileBody>

                </AddFlavorProfileTable>
            }
        </MainContainer>
    )
}

export default FlavorProfile;