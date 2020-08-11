import React, { useEffect, useRef, MutableRefObject } from "react";

import styled from "@emotion/styled";

import { FiSettings } from "react-icons/fi";

import { Holder, ParagraphBasic } from "../elements";

import { colorLightest, colorPrimary, colorSecondary } from "../../styles/palette";

const BottomBar = () => {
    // initial visibility animation
    // and making the red line disappear and appear
    const hideBottomBarDelay = 3500;
    const holderRef = useRef() as MutableRefObject<HTMLDivElement>;
    const topLineRef = useRef() as MutableRefObject<HTMLDivElement>;
    const isHoveringOver = useRef(false);
    useEffect(() => {
        const thisTimeout = setTimeout(() => {
            holderRef.current.classList.add("bottom-bar-hide");
            if (!isHoveringOver.current) topLineRef.current.classList.remove("vertical-disappear");
        }, hideBottomBarDelay);
        return () => clearTimeout(thisTimeout);
    }, []);
    const doOnMouseEnter = () => {
        topLineRef.current.classList.add("vertical-disappear");
        isHoveringOver.current = true;
    };
    const doOnMouseLeave = () => {
        topLineRef.current.classList.remove("vertical-disappear");
        isHoveringOver.current = false;
    };

    return (
        <AbsHolder ref={holderRef} onMouseEnter={doOnMouseEnter} onMouseLeave={doOnMouseLeave}>
            <TopLine className="vertical-disappear" ref={topLineRef}></TopLine>
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
`;

const TopLine = styled.div`
    height: 0.5em;
    z-index: -1;
    width: 100%;
    background: ${colorPrimary};
    transition: transform 0.2s ease;
    transform-origin: bottom center;
`;

const BottomHolder = styled(Holder)`
    background: ${colorLightest};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    padding: 0.4em 0.8em;
`;
