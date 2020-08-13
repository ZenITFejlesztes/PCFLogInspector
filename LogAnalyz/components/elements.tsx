import styled from "@emotion/styled"

import {colorPrimary, colorSecondary} from "../styles/palette"

export const ParagraphBasic = styled.p`
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const ContainerBasic = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
`

export const Holder = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
`

export const VerticalHolder = styled(Holder)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`

export const BodyHolder = styled(Holder)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100%;
    grid-gap: 0px;
`

export const ScrollableHolder = styled(Holder)`
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar{
        width: .3em;
    }
    ::-webkit-scrollbar-track-piece{
        background: transparent;
    }
    ::-webkit-scrollbar-thumb{
        background: ${colorPrimary};
    }
`

interface SearchInputProps {
    border?: any;
    hoverBorder?: any;
    hoverFill?: any;

}

export const SearchInput = styled.input`
    font-size: 1em;
    box-sizing: border-box;
    background: transparent;
    padding: .1em .4em;
    margin: 0px;
    width: 100%;
    height: 2em;
    border: none;
    outline: none;
    color: black;
    transition: color .2s ease;
    :hover, :active, :focus{
        color: white
    }
`

export const SearchInputBackground = styled.div`
    position: relative;
    background: white;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    border: none;
    transform: perspective(1px);
    :before{
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 50%;
        bottom: 0;
        background: ${colorPrimary};
        transform: scaleX(0);
        transform-origin: center left;
        transition: transform .2s ease;
    }
    :after{
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 50%;
        right: 0;
        bottom: 0;
        background: ${colorPrimary};
        transform: scaleX(0);
        transform-origin: center right;
        transition: transform .2s ease;
    }
    :hover:before, :active:before, :focus-within:before{
        transform: scaleX(1);
    }
    :hover:after, :active:after, :focus-within:after{
        transform: scaleX(1);
    }
`


export const ItemHolder = styled(Holder)`
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

export const DataHolder = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 0px;
`
export const MyParagraph = styled(DataHolder)`
    text-align: center;
    margin: 0.4em;
`;
