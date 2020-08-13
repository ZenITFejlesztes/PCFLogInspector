import React, { MutableRefObject, useState, useEffect } from "react";
import styled from "@emotion/styled";

import { Holder, MyParagraph } from "../elements";
import { colorMiddle } from "../../styles/palette";

interface IProps {
    reference: MutableRefObject<boolean>;
    texts: { true: string; false: string };
}

const ToggleSwitch = ({ reference, texts }: IProps) => {
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        reference.current = toggled;
    }, [toggled]);

    const toggleTheSwitch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget;
        target.classList.toggle("true");
        setToggled((prev) => !prev);
    };
    return (
        <Holder>
            <MyParagraph> {toggled ? texts.true : texts.false} </MyParagraph>
            <Toggle onClick={toggleTheSwitch} />
        </Holder>
    );
};

export default ToggleSwitch;

const Toggle = styled(Holder)`
    position: relative;
    height: 2em;
    width: 6em;
    margin: 0.3em auto;
    border: 2px solid ${colorMiddle};
    &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 50%;
        box-sizing: border-box;
        background: ${colorMiddle};
        transition: background 0.15s ease, transform 0.15s ease;
    }
    &.true {
        border: 2px solid white;
    }
    &.true:after {
        transform: translateX(100%);
        background: white;
    }
`;
