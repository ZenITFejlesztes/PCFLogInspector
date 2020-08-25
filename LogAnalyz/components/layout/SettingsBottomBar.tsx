import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import styled from "@emotion/styled";

import { FiSettings } from "react-icons/fi";
import { Holder, ParagraphBasic } from "../elements";
import { colorLightest, colorPrimary } from "../../styles/palette";

import Settings from "./Settings";

// @desc    The currently unused settings bar on the bottom
const SettingsBottomBar = () => {
    // most of this code is just the hide / show animation
    const [theme, setTheme] = useState({ color: colorPrimary, background: colorLightest });
    const hideBottomBarDelay = 3500;
    const holderRef = useRef() as MutableRefObject<HTMLDivElement>;
    const topLineRef = useRef() as MutableRefObject<HTMLDivElement>;
    const settingsRef = useRef() as MutableRefObject<HTMLDivElement>;
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
        settingsRef.current.classList.add("hidden");
        setTheme({color: colorPrimary, background: colorLightest});
        isHoveringOver.current = false;
    };

    // bringing up the actual settings pane
    const toggleSettings = () => settingsRef.current.classList.toggle("hidden");
    // toggling the theme
    const toggleTheme = () =>
        setTheme((prev) =>
            prev.color == colorPrimary
                ? { color: "white", background: colorPrimary }
                : { color: colorPrimary, background: colorLightest }
        );
    const doOnGearClick = () => {
        toggleSettings();
        toggleTheme();
    };

    return (
        <AbsHolder ref={holderRef} onMouseEnter={doOnMouseEnter} onMouseLeave={doOnMouseLeave}>
            <TopLine className="hide" ref={topLineRef}></TopLine>
            <BottomHolder style={{ color: theme.color, background: theme.background }}>
                <ParagraphBasic style={{ fontSize: ".5em" }}>
                    Application data inspector by ZenIT
                </ParagraphBasic>
                <div
                    style={{ display: "grid", placeItems: "center", cursor: "pointer" }}
                    onClick={doOnGearClick}
                >
                    <FiSettings color={theme.color} size="1.3em" />
                </div>
                <div
                    style={{
                        zIndex: -1,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "fit-content",
                        width: "fit-content",
                    }}
                >
                    <Settings theme={theme} reference={settingsRef} />
                </div>
            </BottomHolder>
        </AbsHolder>
    );
};

export default SettingsBottomBar;

const AbsHolder = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &.hide {
        transform: translateY(calc(2em));
        transition: transform 0.2s ease;
        :hover,
        :active,
        :focus {
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
    &.hide {
        transform: scaleY(0);
        transform-origin: bottom center;
    }
`;

const BottomHolder = styled(Holder)`
    overflow: visible;
    position: relative;
    background: ${colorLightest};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    padding: 0.4em 0.8em;
    transition: color 0.3s ease, background 0.3s ease;
`;
