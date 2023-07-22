import Image from "./image/image.component";

import {
    CurrentSubtitle,
    CurrentTitle,
    MainContainer
} from './current.styles';

const CurrentWelcomeImages = ({ images, refreshImages }) => {

    return (
        <MainContainer>
            <CurrentTitle>Current Welcome Images</CurrentTitle>
            {images && 
                images.length === 0 || images === null ?
                    <CurrentSubtitle>No Current Welcome Images. Add your first below.</CurrentSubtitle>
                :
                    images.map((image, index) => {
                    if(image.position === null) {
                        image.position = '';
                    }
                    return (
                        <Image key={index} image={image} refreshImages={refreshImages} />
                    )})
            }
        </MainContainer>
    )
}

export default CurrentWelcomeImages;