import React, {useContext} from 'react'

import { ScrollableHolder } from "../elements"

import {GalleryContext, GalleryContextInterface} from "../../context/galleryContext"

interface IProps {
    
}

const Gallery = ({}:IProps) => {
    
    const { displayList, columnNames } = useContext(GalleryContext) as GalleryContextInterface;

    return (
        <ScrollableHolder>
            { (Array.apply(null, Array(30))).map(_ => <div style={{width: "100%", height: "40px"}} >HEY</div> ) }
        </ScrollableHolder>
    )
}

export default Gallery
