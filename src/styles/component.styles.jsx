import styled from 'styled-components';

import { setMobileView } from '../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media print {
        .printerContainer {
          padding: 40px !important;
          font-size: 12px !important;
        }
      }
`;

export const ColumnContainer = styled.div`
display: flex;
flex-direction: ${props => props.flexDirection ? props.flexDirection : 'column'};
justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
align-items: ${props => props.alignItems ? props.alignItems : 'center'};
margin-left: ${props => props.marginLeft ? props.marginLeft : ''};
margin: ${props => props.margin ? props.margin : ''};
padding: ${props => props.padding ? props.padding : ''};
cursor: ${props => props.cursor ? props.cursor : ''};
height: ${props => props.height ? props.height : ''};
width: ${props => props.width ? props.width : ''};
max-width: ${props => props.maxWidth ? props.maxWidth : ''};
border: ${props => props.border ? props.border : ''};
border-bottom: ${props => props.borderBottom ? props.borderBottom : ''};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : ''};
    margin: ${props => props.margin ? props.margin : ''};
    padding: ${props => props.padding ? props.padding : ''};
    cursor: ${props => props.cursor ? props.cursor : ''};
    height: ${props => props.height ? props.height : ''};
    width: ${props => props.width ? props.width : ''};
    max-width: ${props => props.maxWidth ? props.maxWidth : ''};
    border: ${props => props.border ? props.border : ''};
    border-bottom: ${props => props.borderBottom ? props.borderBottom : ''};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: ${setMobileView() ? '300px' : '550px'};
`;

export const PrinterContainer = styled.div`
    
`;

export const ButtonContainer = styled.div`
    margin: 20px 0;
`;

export const Title = styled.h2`

`;

export const Subtitle = styled.h4`
    text-align: ${props => props.textAlign ? props.textAlign : ''};
    margin: ${props => props.margin ? props.margin : ''};
    cursor: ${props => props.cursor ? props.cursor : ''};
`;

export const Text = styled.p`
    text-align: ${props => props.textAlign ? props.textAlign : ''};
    margin: ${props => props.margin ? props.margin : ''};
    cursor: ${props => props.cursor ? props.cursor : ''};
`;

export const Subtext = styled.h6`
    margin: ${props => props.margin ? props.margin : ''};
    padding: ${props => props.padding ? props.padding : ''};
`;

export const InputSubtext = styled.h6`
    max-width: 300px;
    margin: ${props => props.margin ? props.margin : ''};
    padding: ${props => props.padding ? props.padding : ''};
`;

export const Input = styled.input`
    width: ${props => props.width ? props.width : '300px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '10px'};
`;

export const Select = styled.select`

`;

export const Option = styled.option`

`;

export const Textarea = styled.textarea`
    height: ${props => props.customHeight ? props.customHeight : '240px'};
    width: 300px;
    margin: ${props => props.margin ? props.margin : ' 0 0 10px 0'};
`;

export const Image = styled.img`
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
`;

export const Table = styled.table`
    border: 1px solid;
    border-collapse: collapse;
    width: ${setMobileView() ? '300px' : ''};
    overflow: hidden; 
    textOverflow: ellipsis; 
    wordWrap: break-word;
    font-size: ${setMobileView() ? '12px' : ''};
`;

export const TableHeader = styled.thead`
    
`;

export const TableHead = styled.th`
    padding: ${setMobileView() ? '3px' : '8px'};
    border: 1px solid;
`;

export const TableBody = styled.tbody`
    
`;

export const TableRow = styled.tr`
    border: 1px solid;
`;

export const TableData = styled.td`
    padding: ${setMobileView() ? '3px' : '8px'};
    border: 1px solid;
`;

export const TableDataLink = styled.td`
    padding: ${setMobileView() ? '3px' : '8px'};
    border: 1px solid;
    cursor: pointer;
`;

export const Logo = styled.img`
    height: 200px;
    width: 200px;
`;

export const SmallButton = styled.button`
    margin: ${setMobileView() ? '10px' : '0 10px'};
    min-width: ${setMobileView() ? '90px' : '105px'};
    width: auto;
    height: 25px;
    letter-spacing: 0.5px;
    line-height: 25px;
    padding: 0 5px;
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

export const DeleteButton = styled.button`
    margin: 20px 0;
    min-width: ${setMobileView() ? '105px' : '125px'};
    width: auto;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    padding: 0 15px 0 15px;
    font-size: ${setMobileView() ? '10px' : '12px'};
    background-color: red;
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
    color: red;
    border: 1px solid red;
    }
`;