import React, { useEffect, useRef, MutableRefObject } from "react";
import styled from "@emotion/styled";

import { FiSettings } from "react-icons/fi";

import { Holder, ParagraphBasic } from "../elements";
import { colorLightest, colorPrimary} from "../../styles/palette";


// @desc    The currently unused settings bar on the bottom
const BottomBar = () => {
    // most of this code is just the hide / show animation
    const hideBottomBarDelay = 3500;
    const holderRef = useRef() as MutableRefObject<HTMLDivElement>;
    const topLineRef = useRef() as MutableRefObject<HTMLDivElement>;
    const isHoveringOver = useRef(false);
    useEffect(() => {
        const thisTimeout = setTimeout(() => {
            holderRef.current.classList.add("hide");
            if (!isHoveringOver.current) topLineRef.current.classList.remove("hide");
        }, hideBottomBarDelay);
        return () => clearTimeout(thisTimeout);
    }, []);
    const doOnMouseEnter = () => {
        topLineRef.current.classList.add("hide");
        isHoveringOver.current = true;
    };
    const doOnMouseLeave = () => {
        topLineRef.current.classList.remove("hide");
        isHoveringOver.current = false;
    };

    return (
        <AbsHolder ref={holderRef} onMouseEnter={doOnMouseEnter} onMouseLeave={doOnMouseLeave}>
            <TopLine className="hide" ref={topLineRef}></TopLine>
            <BottomHolder>
                <ParagraphBasic style={{ fontSize: ".5em" }}>
                    Application data inspector by ZenIT
                </ParagraphBasic>
                <div style={{ display: "grid", placeItems: "center" }}>
                    <FiSettings color={colorPrimary} size="1.3em" />
                </div>
            </BottomHolder>
        </AbsHolder>
    );
};

export default BottomBar;

const AbsHolder = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &.hide{
        transform: translateY(calc(2em));
        transition: transform .2s ease;
        :hover, :active, :focus{
            transform: translateY(0);
        }
    }
`;

const TopLine = styled.div`
    height: 0.5em;
    z-index: -1;
    width: 100%;
    background: ${colorPrimary};
    transition: transform 0.2s ease;
    transform-origin: bottom center;
    &.hide{
        transform: scaleY(0);
        transform-origin: bottom center;
    }
`;

const BottomHolder = styled(Holder)`
    background: ${colorLightest};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    padding: 0.4em 0.8em;
`;
