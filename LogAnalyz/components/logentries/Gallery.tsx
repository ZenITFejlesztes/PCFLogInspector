import React, { useContext, useMemo, useRef, useEffect } from "react";

import shortid from "shortid";

import { ScrollableHolder } from "../elements";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";

import GalleryItemContainer from "./GalleryItemContainer";

interface IProps {
    columnNames: string[];
    displayList: any[];
}

const Gallery = ({}: any) => {
    const {displayList} = useContext(GalleryContext) as GalleryContextInterface;

    return useMemo(
        () => (
                <ScrollableHolder
                    style={{
                        fontSize: ".5em",
                    }}
                >
                    {displayList.map((item) => (
                        <GalleryItemContainer key={shortid.generate()} item={item} />
                    ))}
                </ScrollableHolder>
        ),
        [displayList]
    );
};

export default Gallery;
