import React, { useMemo } from "react";
import { uniq } from "lodash";
import shortid from "shortid";

import { AiOutlineSearch } from "react-icons/ai"
import { ScrollableHolder, Holder } from "../elements";

import { PaneInterface } from "../../context/detailsContext";
import LogChangeItem from "./LogChangeItem";
import HiddenSetting from "./HiddenSetting"

import useTransformProperties from "../customHooks/useTransformProperties";

interface IProps {
    inpData: {
        beforeColumnName: string;
        afterColumnName: string;
        selectedPane: PaneInterface;
    };
    toggleView: () => void;
}

// Shuffles together the given properties from the entry object into a list of triplets
const getLogChangeList = (entryObject: any, beforeColumnName: string, afterColumnName: string) => {
    const beforeData = JSON.parse(entryObject[beforeColumnName]) || {};
    const afterData = JSON.parse(entryObject[afterColumnName]) || {};
    const propertyNameFullList = uniq([
        ...Object.keys(beforeData),
        ...Object.keys(afterData),
    ]).sort();

    return propertyNameFullList.reduce((respArr: Array<any>, key) => {
        const newItem = [
            key,
            useTransformProperties([key], beforeData)[0],
            useTransformProperties([key], afterData)[0],
        ];
        return [...respArr, newItem];
    }, []);
};


// @desc    The full log details list
const LogChaneList = ({ inpData: { beforeColumnName, afterColumnName, selectedPane }, toggleView }: IProps) => {
    const logChangeList = useMemo(
        () =>
            selectedPane?.selectedEntry
                ? getLogChangeList(selectedPane?.selectedEntry, beforeColumnName, afterColumnName)
                : [],
        [selectedPane?.selectedEntry, beforeColumnName, afterColumnName]
    );

    return (
        <Holder style={{position: "relative"}} >
            <HiddenSetting onClickAction={toggleView} Icon={AiOutlineSearch} title="Find similar" />
            <ScrollableHolder >
                {logChangeList &&
                    logChangeList.map((item) => (
                        <LogChangeItem key={shortid.generate()} item={item} />
                    ))}
            </ScrollableHolder>
        </Holder>
    );
};

export default LogChaneList;
