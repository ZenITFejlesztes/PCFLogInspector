import React, { MutableRefObject } from "react";

import { ContainerBasic, Holder } from "../elements";

import { colorLightest, colorPrimary, colorLighter, colorMiddle } from "../../styles/palette";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

import styled from "@emotion/styled";

interface IProps {
    direction: "left" | "right";
    holderReference: MutableRefObject<any>;
}

const Arrow = ({ direction, holderReference }: IProps) => {
    
    const scrollMeADistance = e => {
        holderReference.current.scrollBy( direction === "left" ? 120 : -120 , 0)
    }

    return (
        <ArrowHolder 
        direction={direction}
        style={ direction === "left" ? {left: 0, transformOrigin: "center left"} : {right: 0, transformOrigin: "center right"} } 
        onClick={scrollMeADistance}
        >
            { direction === "left" ? <IoIosArrowForward color="white" size="1.4em" /> : <IoIosArrowBack color="white" size="1.4em" /> }
        </ArrowHolder>
    )
};

export default Arrow;

const ArrowHolder = styled(Holder)`
    width: 2.4em;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: ${colorPrimary};

    transform: translateX( ${(props: {direction: string}) => props.direction === "left" ? "-73%" : "73%" } );
    transition: transform .2s ease;
    cursor: pointer;

    :hover{
        transform: translateX(0);
        background: ${colorMiddle};
    }
`;
