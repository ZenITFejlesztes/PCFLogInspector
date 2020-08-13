import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import styled from "@emotion/styled";
import shortid from "shortid";

import { Holder, ScrollableHolder } from "../elements";
import { colorLightest, colorPrimary, colorMiddle } from "../../styles/palette";

interface IProps {
    optionList: string[];
    defaultValue?: string;
    reference: MutableRefObject<any>;
}

//  @desc       basic dropdown that fits it's parent container's size
//  @comment    no way yet implemented to change the linesize / spacing
const DropDown = ({ optionList, defaultValue, reference }: IProps) => {
    const [selected, setSelected] = useState(defaultValue || optionList[0]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const dropDownRef = useRef((null as unknown) as HTMLDivElement);

    // Updates the selected item to the one that was clicked
    const setSelectedOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget;
        setSelected((prev) => target.getAttribute("data-option-value") || prev);
        setOptionsVisible(false);
    };

    // Toggling the visibility of the options list when clicked on the selected item
    const toggleDropdownOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        setOptionsVisible((prev) => !prev);

    // Hiding the option list when you click out of the dropdown
    useEffect(() => {
        const listenerFunction = () => setOptionsVisible(false);
        dropDownRef.current.addEventListener("blur", listenerFunction);
        return () => dropDownRef.current.removeEventListener("blur", listenerFunction);
    }, []);

    return (
        <Holder
            style={{
                position: "relative",
                overflow: "visible",
                height: "3em",
                zIndex: 1
            }}
        >
            <HiddenInput tabIndex={-1} ref={reference} value={selected} readOnly={true} />
            <DropDownHolder tabIndex={0} ref={dropDownRef}>
                <SelectedOption onClick={toggleDropdownOptions}> {selected} </SelectedOption>
                <OptionsHolder>
                    {optionsVisible &&
                        optionList.map((opt) => (
                            <Option
                                key={shortid.generate()}
                                data-option-value={opt}
                                onClick={setSelectedOption}
                            >
                                {opt}
                            </Option>
                        ))}
                </OptionsHolder>
            </DropDownHolder>
        </Holder>
    );
};

export default DropDown;

const HiddenInput = styled.input`
    width: 0;
    height: 0;
    opacity: 0;
`;

const DropDownHolder = styled(Holder)`
    height: fit-content;
    user-select: none;
    &:focus {
        outline: none;
        border: 1px solid black;
    }
`;

const OptionsHolder = styled(ScrollableHolder)`
    max-height: 12em;
    background: white;
    height: fit-content;
    min-height: 0px;
`;

const Option = styled(Holder)`
    background: white;
    line-height: 3em;
    height: 3em;
    text-align: center;
    &:hover {
        background: ${colorLightest};
    }
`;

const SelectedOption = styled(Option)`
    background: ${colorPrimary};
    color: white;
    &:hover {
        background: ${colorMiddle};
    }
`;
