import React, { useContext, useMemo} from "react";
import shortid from "shortid";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";
import GalleryItemContainer from "./GalleryItemContainer";

import { ScrollableHolder } from "../elements";

interface IProps {
    columnNames: string[];
    displayList: any[];
}

// @desc    The (mostly) presentational Gallery Component
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
