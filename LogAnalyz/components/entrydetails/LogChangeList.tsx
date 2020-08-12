import React, { useMemo, useCallback, useState } from "react";

import { uniq } from "lodash";
import shortid from "shortid";

import { ScrollableHolder } from "../elements";
import { PaneInterface } from "../../context/detailsContext";
import useTransformProperties from "../customHooks/useTransformProperties";

import LogChangeItem from "./LogChangeItem";

interface IProps {
    inpData: {
        beforeColumnName: string;
        afterColumnName: string;
        selectedPane: PaneInterface;
    };
}

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

const LogChaneList = ({ inpData: { beforeColumnName, afterColumnName, selectedPane } }: IProps) => {
    const [selected, setSelected] = useState<any>();

    const logChangeList = useMemo(
        () =>
            selectedPane?.selectedEntry
                ? getLogChangeList(selectedPane?.selectedEntry, beforeColumnName, afterColumnName)
                : [],
        [selectedPane?.selectedEntry, beforeColumnName, afterColumnName]
    );

    return (
        <ScrollableHolder>
            {logChangeList &&
                logChangeList.map((item) => (
                    <LogChangeItem key={shortid.generate()} item={item} />
                ))}
        </ScrollableHolder>
    );
};

export default LogChaneList;
