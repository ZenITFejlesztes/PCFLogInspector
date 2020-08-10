import React, { useContext, useMemo, useRef, useEffect } from "react";

import shortid from "shortid";

import { ScrollableHolder, ItemHolder, DataHolder } from "../elements";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";

import GalleryItem from "./GalleryItem";

interface IProps {
    columnNames: string[];
    displayList: any[];
}

const Gallery = ({}: any) => {
    const {displayList, columnNames} = useContext(GalleryContext) as GalleryContextInterface;

    return useMemo(
        () => { console.log("rendered!"); return (
            <ScrollableHolder
                style={{
                    fontSize: ".5em",
                }}
            >
                <ItemHolder
                    style={{
                        background: "#3d3d3d",
                        color: "white",
                        userSelect: "none",
                        MozUserSelect: "none",
                    }}
                >
                    {columnNames.map((name) => (
                        <DataHolder
                            key={shortid.generate()}
                            style={{ flex: "1", textAlign: "center", margin: "0px" }}
                        >
                            {" "}
                            {name}{" "}
                        </DataHolder>
                    ))}
                </ItemHolder>
                {displayList.map((item) => (
                    <GalleryItem key={shortid.generate()} item={item} />
                ))}
            </ScrollableHolder>
        )},
        [displayList, columnNames]
    );
};

export default Gallery;
