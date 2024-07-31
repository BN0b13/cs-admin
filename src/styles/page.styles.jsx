import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : ''};
    align-items: ${props => props.alignItems ? props.alignItems : ''};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection ? props.flexDirection : 'column'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    margin: ${props => props.margin ? props.margin : '10px 0'};
    padding: ${props => props.padding ? props.padding : '5px 0'};
    max-width: ${props => props.maxWidth ? props.maxWidth : ''};
    width: ${props => props.width ? props.width : ''};
`;

export const WordBreakContainer = styled.div`
    max-width: 300px;
    word-break: break-all;
    text-wrap: wrap;
`;

export const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
`;

export const TabSelector = styled.button`
    background-color: ${props => props.active ? '#ccc' : 'inherit'};
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    width: 100%;

    :hover {
        background-color: ${props => props.active ? '#ccc' :'#ddd'};
    }
`;

export const MainTitle = styled.h2`
    text-align: center;
`;

export const BackLink = styled.h4`
  cursor: pointer;
`;

export const Subtitle = styled.h4`

`;

export const Text = styled.p`

`;

export const InputSubtext = styled.h6`
    max-width: 300px;
    margin: ${props => props.margin ? props.margin : ''};
    padding: ${props => props.padding ? props.padding : ''};
`;

export const Option = styled.option`
    
`;

export const Select = styled.select`
    max-width: ${props => props.maxWidth ? props.maxWidth : ''};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : ''};
    padding: ${props => props.padding ? props.padding : ''};
`;