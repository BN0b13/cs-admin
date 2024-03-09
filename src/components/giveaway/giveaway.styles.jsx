import styled from "styled-components";

import { setMobileView } from '../../tools/mobileView';

export const GiveawayRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-bottom: 10px;
`;

export const GiveawayColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    margin-bottom: 10px;
`;

export const GiveawayText = styled.h5`
    margin-bottom: 5px;
`;

export const GiveawayTextarea = styled.textarea`
    width: 200px;
    height: 150px;
`;

export const GiveawayButton = styled.button`
    margin-bottom: 40px;
    min-width: ${setMobileView() ? '135px' : '165px'};
    width: auto;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    padding: 0 15px 0 15px;
    font-size: ${setMobileView() ? '10px' : '12px'};
    background-color: #000;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: 1px solid white;
    border-radius: 1px;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    }
`;