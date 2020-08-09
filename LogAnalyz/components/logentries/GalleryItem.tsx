import React, { useContext, useMemo, useCallback, useEffect, useState } from "react";

import { ItemHolder, DataHolder } from "../elements";

import useTransformProperties from "./useTransformProperties"

import shortid from "shortid";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";

interface IProps {
    item: any;
}

const GalleryItem = ({ item }: IProps) => {
    const { columnNames, setSelectedEntry, selectedEntry } = useContext(GalleryContext) as GalleryContextInterface;

    const displayValues = useMemo(() => useTransformProperties(columnNames, item), [item, columnNames])

    const onSelection = useCallback(() => { setSelectedEntry(item.ID); console.log("clicked") },[setSelectedEntry, item])

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        selectedEntry?.ID == item.ID ? setSelected(true) : setSelected(false)
    }, [selected, item])

    return (
        <ItemHolder
            style={{
                padding: "0px .5em",
                userSelect: "none",
                WebkitUserSelect: "none",
                background: `${selected ? "#e7e7e7" : "transparent"}`
            }}
            onClick={onSelection}
        >
            { displayValues.map(val => <DataHolder key={shortid.generate()} style={{flex: "1", margin: "0px .5em"}} > {val} </DataHolder> ) }
        </ItemHolder>
    );
};

export default GalleryItem;
