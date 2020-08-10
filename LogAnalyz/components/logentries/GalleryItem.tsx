import React, { useContext, useMemo, useCallback, useEffect, useState } from "react";

import ReactTooltip from "react-tooltip";

import { ItemHolder, DataHolder, ParagraphBasic } from "../elements";

import useTransformProperties from "./useTransformProperties";

import shortid from "shortid";

import { isEqual } from "lodash";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";

interface IProps {
    item: any;
}

const GalleryItem = ({ item }: IProps) => {
    const { columnNames, setSelectedEntry, selectedEntry } = useContext(
        GalleryContext
    ) as GalleryContextInterface;

    const displayValues = useMemo(() => useTransformProperties(columnNames, item), [
        item,
        columnNames,
    ]);

    const onSelection = useCallback(() => setSelectedEntry(item.ID), [setSelectedEntry, item]);

    const selected = useMemo(() => item.ID == selectedEntry?.ID, [selectedEntry, item]);

    return (
        <GalleryPresentation
            selected={selected}
            onSelection={onSelection}
            displayValues={displayValues}
        />
    );
};

const GalleryPresentation = React.memo(
    ({
        selected,
        onSelection,
        displayValues,
    }: {
        selected: boolean;
        onSelection: () => void;
        displayValues: string[];
    }) => {
        return (
            <ItemHolder
                style={{
                    padding: "0px .5em",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    background: `${selected ? "#e7e7e7" : "transparent"}`,
                }}
                onClick={onSelection}
            >
                {displayValues.map((val) => {
                    const thisId = shortid.generate();
                    return (
                        <DataHolder
                            style={{ flex: "1", margin: "0px .5em" }}
                            key={shortid.generate()}
                        >
                            {" "}
                            {val}{" "}
                        </DataHolder>
                    );
                })}
            </ItemHolder>
        );
    },
    (prev, next) => {
        return (
            isEqual(prev.displayValues, next.displayValues) && isEqual(prev.selected, next.selected)
        );
    }
);

export default GalleryItem;
