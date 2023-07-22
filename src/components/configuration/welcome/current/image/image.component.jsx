import { useState } from "react";
import {
    VscChromeClose
} from "react-icons/vsc";

import Button from "../../../../reusable/button/button.component";
import AdminModal from '../../../../reusable/admin-modal/admin-modal.component';
import Snackbar from '../../../../reusable/snackbar/snackbar.component';

import { api } from '../../../../../config';
import Client from "../../../../../tools/client";

import {
    CloseIconContainer,
    DetailContainer,
    DetailLabel,
    EditDetailsButton,
    EditDetailsDeleteButton,
    EditDetailsButtonContainer,
    EditDetailsInput,
    DetailText,
    MainContainer,
    ImageDetailContainer
} from './image.styles';

const client = new Client();

const Image = ({ image, refreshImages }) => {
    const url = `${api}${image.path}`;

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ caption, setCaption ] = useState(image.caption);
    const [ link, setLink ] = useState(image.link);
    const [ position, setPosition ] = useState(image.position);
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgType, setMsgType ] = useState('error');
    const [ msgContent, setMsgContent ] = useState('Please complete all fields to update password');

    const updateImage = async () => {
        let data = {
            id: image.id,
            caption,
            link,
        }

        if(position) {
            const positionAsInt = parseInt(position);
            if(positionAsInt < 1) {
                setMsgContent('Position cannot be less than 1');
                setMsgType('error');
                setShowMsg(true);
                setPosition(1);
                return
            }
            data.position = positionAsInt;
        }

        await client.updateWelcomeImage(data);

        setShowEdit(false);

        refreshImages();
    }

    const confirmDelete = () => {
        setShowDeleteModal(true)
    }

    const deleteImage = async () => {
        await client.deleteImages({
            ids: [ image.id ]
        });

        setShowEdit(false);

        setShowDeleteModal(false);

        refreshImages();
    }

    const textDetails = () => {
        return (
            <>
                <DetailContainer>
                    <DetailLabel>Caption: </DetailLabel>
                    <DetailText>{image.caption}</DetailText>
                </DetailContainer>
                <DetailContainer>
                    <DetailLabel>Link: </DetailLabel>
                    <DetailText>{image.link}</DetailText>
                </DetailContainer>
                <DetailContainer>
                    <DetailLabel>Position: </DetailLabel>
                    <DetailText>{image.position}</DetailText>
                </DetailContainer>
                <Button onClick={() => setShowEdit(true)}>Edit</Button>
            </>
        );
    }

    const editDetails = () => {
        return (
            <>
                <CloseIconContainer>
                    <VscChromeClose onClick={() => setShowEdit(false)} />
                </CloseIconContainer>
                <EditDetailsInput type='text' onChange={e => setCaption(e.target.value)} value={caption} placeholder={caption} />
                <EditDetailsInput type='text' onChange={e => setLink(e.target.value)} value={link} placeholder={link} />
                <EditDetailsInput type='number' onChange={e => setPosition(e.target.value)} value={position} placeholder={position} />
                <EditDetailsDeleteButton onClick={() => confirmDelete()}>Delete</EditDetailsDeleteButton>
                <EditDetailsButtonContainer>
                    <EditDetailsButton onClick={() => setShowEdit(false)}>Cancel</EditDetailsButton>
                    <EditDetailsButton onClick={() => updateImage()}>Submit</EditDetailsButton>
                </EditDetailsButtonContainer>
            </>
        );
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Image'} 
                image={url}
                message={'Are you sure you want to delete this image forever?'} 
                action={deleteImage} 
                actionText={'Delete'}
            />
            <div>
                <img src={url} alt={image.name} width='200px' height='200px' />
            </div>
            <ImageDetailContainer>
                {showEdit ?
                editDetails()
            :
                textDetails()
            }
            {showMsg &&
                <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
            }
            </ImageDetailContainer>
        </MainContainer>
    )
}

export default Image;