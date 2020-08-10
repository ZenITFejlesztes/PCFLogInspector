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
    const redLineRef = useRef() as MutableRefObject<HTMLDivElement>;
    const isHoveringOver = useRef(false)
    useEffect(() => {
        const thisTimeout = setTimeout(
            () => {
                holderRef.current.classList.add("bottom-bar-hide");
                if (!isHoveringOver.current) redLineRef.current.classList.remove("vertical-disappear");
            },
            hideBottomBarDelay
        );
        return () => clearTimeout(thisTimeout);
    }, []);
    const doOnMouseEnter = () => { redLineRef.current.classList.add("vertical-disappear"); isHoveringOver.current = true }
    const doOnMouseLeave = () => { redLineRef.current.classList.remove("vertical-disappear"); isHoveringOver.current = false; }

    return (
        <div
        style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            right: "0px"
        }}
        ref={holderRef}
        onMouseEnter={doOnMouseEnter}
        onMouseLeave={doOnMouseLeave}
        >
            <div
            style={{
                height: ".5em",
                zIndex: -1,
                width: "100%",
                background: colorPrimary,
                transition: "transform .2s ease",
                transformOrigin: "bottom center"
            }}
            className="vertical-disappear"
            ref={redLineRef}
            ></div>
            <Holder
                style={{
                    background: colorLightest,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "2em",
                    padding: ".4em .8em",
                }}
            >
                <ParagraphBasic style={{ fontSize: ".5em" }}>
                    Application data inspector by ZenIT
                </ParagraphBasic>
                <div style={{ display: "grid", placeItems: "center" }}>
                    <FiSettings color={colorPrimary} size="1.3em" />
                </div>
            </Holder>
        </div>
    );
};

export default BottomBar;
