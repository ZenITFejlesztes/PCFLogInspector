import React, { useContext, useMemo, useCallback, useEffect, useState } from "react";

import useTransformProperties from "../customHooks/useTransformProperties";
import useDoubleClickHandler from "../customHooks/useDoubleClickHandler";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";
import { DetailsContext, DetailsContextInterface } from "../../context/detailsContext";

import GalleryItem from "./GalleryItem";

interface IProps {
    item: any;
}

const GalleryItemContainer = ({ item }: IProps) => {
    const { columnNames, setSelectedEntry, selectedEntry } = useContext(
        GalleryContext
    ) as GalleryContextInterface;

    const { createNewPane, updateSelectedPaneEntry } = useContext(
        DetailsContext
    ) as DetailsContextInterface;

    const displayValues = useMemo(() => useTransformProperties(columnNames, item), [
        item,
        columnNames,
    ]);

    const [queUpdate, clearUpdateQue] = useDoubleClickHandler(
        () => updateSelectedPaneEntry(item),
        300
    );

    const onSelection = useCallback(() => {
        setSelectedEntry(item.ID);
        queUpdate();
    }, [queUpdate, item, updateSelectedPaneEntry]);

    const doOnDoubleClick = useCallback(() => {
        clearUpdateQue();
        createNewPane(item);
    }, [createNewPane, item]);

    const selected = useMemo(() => item.ID == selectedEntry?.ID, [selectedEntry, item]);

    return (
        <GalleryItem
            selected={selected}
            onSelection={onSelection}
            displayValues={displayValues}
            doOnDoubleClick={doOnDoubleClick}
        />
    );
};

export default GalleryItemContainer;
