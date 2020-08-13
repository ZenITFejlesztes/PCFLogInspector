import React, { MutableRefObject } from "react";
import styled from "@emotion/styled";

import { Holder, DataHolder } from "../../elements";
import { colorPrimary, colorMiddle } from "../../../styles/palette";

import DropDown from "./DropDown";

interface IProps {
    selectableColumns: string[];
    filterEntries: () => void;
    reference: MutableRefObject<any>;
}

//@desc     Presentational part of the finder component
const FindSimilar = ({ selectableColumns, reference, filterEntries }: IProps) => {
    return (
        <Holder style={{ position: "relative" }}>
            <MyParagraph
                style={{
                    fontSize: "1.7em",
                    fontWeight: "bold",
                    marginBottom: "2.5em",
                }}
            >
                Finding Similar Entries
            </MyParagraph>
            <Holder data-reminder="Selecting the column">
                <MyParagraph style={{ fontSize: "1.3em" }}>
                    Which property to look into?
                </MyParagraph>
                <div style={{ width: "50%", margin: "1em auto", marginBottom: "1em" }}>
                    <DropDown optionList={selectableColumns} reference={reference} />
                </div>
            </Holder>
            <BottomBar>
                <SearchButton onClick={filterEntries}>FIND SIMILAR</SearchButton>
            </BottomBar>
        </Holder>
    );
};

export default FindSimilar;

const MyParagraph = styled(DataHolder)`
    text-align: center;
    margin: 0.4em;
`;

const BottomBar = styled(Holder)`
    position: absolute;
    bottom: 3em;
    left: 0;
    right: 0;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchButton = styled.button`
    width: 50%;
    background: ${colorPrimary};
    color: white;
    border: none;
    outline: none;
    height: 3em;
    font-size: 1.3em;
    font-weight: bold;
    &:hover {
        background: ${colorMiddle};
    }
    &:focus {
        outline: none;
    }
`;
