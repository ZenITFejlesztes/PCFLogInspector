import React, { useMemo } from "react";
import { uniq } from "lodash";
import shortid from "shortid";

import { AiOutlineSearch } from "react-icons/ai";
import { ScrollableHolder, Holder } from "../elements";

import { PaneInterface } from "../../context/detailsContext";
import LogChangeItem from "./LogChangeItem";
import HiddenSetting from "./HiddenSetting";

import useTransformProperties from "../customHooks/useTransformProperties";

interface IProps {
    inpData: {
        beforeColumnName: string;
        afterColumnName: string;
        selectedPane: PaneInterface;
        onlyChanges: boolean;
    };
    toggleView: () => void;
}

// Shuffles together the given properties from the entry object into a list of triplets
const getLogChangeList = (entryObject: any, beforeColumnName: string, afterColumnName: string) => {
    let beforeData;
    let afterData;
    let propertyNameFullList;
    try {
        beforeData = JSON.parse(entryObject[beforeColumnName]) || {};
        afterData = JSON.parse(entryObject[afterColumnName]) || {};
        propertyNameFullList = uniq([
            ...Object.keys(beforeData),
            ...Object.keys(afterData),
        ]).sort();
        
    } catch (error) {
        beforeData = {};
        afterData = {};
        propertyNameFullList = [];
    }

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
const LogChaneList = ({
    inpData: { beforeColumnName, afterColumnName, selectedPane, onlyChanges },
    toggleView,
}: IProps) => {
    const logChangeList = useMemo(
        () =>
            !selectedPane?.selectedEntry
                ? []
                : onlyChanges
                ? getLogChangeList(
                      selectedPane?.selectedEntry,
                      beforeColumnName,
                      afterColumnName
                  ).filter((t) => t[1] != t[2])
                : getLogChangeList(selectedPane?.selectedEntry, beforeColumnName, afterColumnName),
        [selectedPane?.selectedEntry, beforeColumnName, afterColumnName, onlyChanges]
    );

    return (
        <Holder style={{ position: "relative" }}>
            <HiddenSetting onClickAction={toggleView} Icon={AiOutlineSearch} title="Find similar" />
            <ScrollableHolder>
                {logChangeList &&
                    logChangeList.map((item) => (
                        <LogChangeItem key={shortid.generate()} item={item} />
                    ))}
            </ScrollableHolder>
        </Holder>
    );
};

export default LogChaneList;
