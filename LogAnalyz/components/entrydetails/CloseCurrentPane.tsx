import React from 'react'

import styled from "@emotion/styled"

import { MdClose } from "react-icons/md"

import { colorPrimary } from "../../styles/palette"

import { Holder } from "../elements"

interface IProps {
    removePane: () => void;
}

const CloseCurrentPane = ({removePane}: IProps ) => {
    return (
        <MyHolder>
            <div 
            style={{cursor: "pointer"}} 
            onClick={removePane}
            >
                <MdClose color="white" size="2em" />
            </div>
        </MyHolder>
    )
}

export default CloseCurrentPane

const MyHolder = styled(Holder)`
    overflow: visible;
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    height: 4em;
    width: 2em;
    background: ${colorPrimary};
    display: grid;
    place-items: center;
    transform: translateY(-4em);
    transition: transform .2s ease;
    border-radius: 0px 0px 0px 0px;

    :before {
        content: "";
        position: absolute;
        display: block;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 2em solid ${colorPrimary};
        border-left: 2em solid transparent;
        transform: translateY(calc(2em - 1px));

        transition: border .2s ease,
                    transform .2s ease;
    }
    
    :hover{
        transform: translateY(0em)
    }

    :hover:before {
        border-top: .0em solid ${colorPrimary};
        border-left: .0em solid transparent;
        transform: translateY( calc(.0em - 1px) )
    }

`