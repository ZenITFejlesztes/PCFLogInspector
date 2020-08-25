import React, { useRef, MutableRefObject } from "react";

import { ContainerBasic, Holder } from "../elements";

import { colorLightest, colorPrimary, colorLighter, colorMiddle } from "../../styles/palette";

import styled from "@emotion/styled";

import Arrow from "./Arrow"

const DetailNavBar = () => {

    const navCardListRef = useRef(null)

    return (
        <ContainerBasic
            style={{
                padding: "0px .6em",
                borderBottom: "1px solid black",
                position: "relative",
            }}
        >
            <NavCardList
            ref={navCardListRef}
            >
                <NavCard>I'm one</NavCard>
                <NavCard>I'm one</NavCard>
                <NavCard>I'm one, but really loong</NavCard>
                <NavCard>But i am even longer muhah hahah hahaha</NavCard>
                <NavCard>I'm one</NavCard>
                <NavCard>I'm one</NavCard>
                <NavCard>I'm one</NavCard>
            </NavCardList>
            <Arrow  holderReference={navCardListRef} direction="left" />    
            <Arrow  holderReference={navCardListRef} direction="right" />    
        </ContainerBasic>
    );
};

export default DetailNavBar;

const NavCard = styled(Holder)`
    margin: 0px .2em;
    flex: 0 0 auto;
    width: 15ch;
    height: 80%;
    background: ${colorMiddle};
    color: white;
    font-size: 0.6em;

    padding: 0px .3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    cursor: pointer;

    border-radius: 0.7em 0.7em 0px 0px;

    transform: translateY(37.5%);
    transition: transform 0.15s ease;

    :hover {
        transform: translateY(1px);
        white-space: normal;
    }
`;

const NavCardList = styled(Holder)`
    height: calc(2em + 0.5px);
    min-height: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background: white;
    overflow-x: auto;
    background: ${colorPrimary};

    ::-webkit-scrollbar {
        height: 2px;
    }
    ::-webkit-scrollbar-track-piece {
        background: white;
    }
    ::-webkit-scrollbar-thumb {
        background: ${colorPrimary};
    }
`;


