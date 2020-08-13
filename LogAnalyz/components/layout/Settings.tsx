import React, { MutableRefObject, useRef, useContext, useEffect } from "react";
import styled from "@emotion/styled";

import { DetailsContext, DetailsContextInterface } from "../../context/detailsContext";

import { Holder, MyParagraph } from "../elements";
import ToggleSwitch from "../elements/ToggleSwitch";

interface IProps {
    reference: MutableRefObject<any>;
    theme: { color: string; background: string };
}

const Settings = ({ reference, theme }: IProps) => {
    const onlyDiffToggleRef = useRef() as MutableRefObject<boolean>;
    const { updateOnlyChanges, onlyChanges } = useContext(
        DetailsContext
    ) as DetailsContextInterface;

    useEffect(() => onlyChanges != onlyDiffToggleRef.current ? updateOnlyChanges(onlyDiffToggleRef.current) : (()=>{})(), [
        updateOnlyChanges,
        onlyDiffToggleRef.current,
    ]);

    return (
        <SettingsPane
            ref={reference}
            className="hidden"
            style={{ color: theme.color, background: theme.background }}
        >
            <MyParagraph
                style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    userSelect: "none",
                    marginBottom: "2em",
                }}
            >
                SETTINGS
            </MyParagraph>
            <div style={{ margin: "0px auto", display: "grid", placeItems: "center" }}>
                <ToggleSwitch
                    reference={onlyDiffToggleRef}
                    texts={{ true: "Only show the changes", false: "Show every field" }}
                />
            </div>
        </SettingsPane>
    );
};

export default Settings;

const SettingsPane = styled(Holder)`
    z-index: -1;
    width: 16em;
    height: 12em;
    transform: translateY(-12em);
    transition: transform 0.3s ease, color 0.3s ease, background 0.3s ease;
    pointer-events: none;
    &.hidden {
        transform: translateY(-2em) scaleY(0);
    }
`;
