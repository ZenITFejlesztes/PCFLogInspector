import React from "react";

import styled from "@emotion/styled";
import { ItemHolder, DataHolder } from "../elements";

import { colorLightest } from "../../styles/palette";

interface IProps {
    item: [string, string, string];
}

const LogChangeItem = ({ item}: IProps) => {
    return (
        <MyItemHolder
            style={{
                cursor: "default",
                userSelect: "none",
                // background: selected ? colorLightest : "transparent",
            }}
            tabIndex={0}
            data-item-name={item[0]}
        >
            <MyDataHolder> {item[0]} </MyDataHolder>
            <MyDataHolder> {item[1]} </MyDataHolder>
            <MyDataHolder> {item[2]} </MyDataHolder>
        </MyItemHolder>
    );
};

export default React.memo(LogChangeItem);

const MyDataHolder = styled(DataHolder)`
    text-align: left;
    flex: 1 1 0px;
`;

const MyItemHolder = styled(ItemHolder)`
    
    transition: height .2s ease;

    :focus, :focus-within, :active{
        height: 9em;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: .5em;
    }
`;
