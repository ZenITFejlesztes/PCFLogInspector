import React, {useContext} from 'react'

import shortid from "shortid"

import { ScrollableHolder, ItemHolder, DataHolder } from "../elements"

import {GalleryContext, GalleryContextInterface} from "../../context/galleryContext"

import GalleryItem from "./GalleryItem"

interface IProps {
    
}

const Gallery = ({}:IProps) => {
    
    const { displayList, columnNames } = useContext(GalleryContext) as GalleryContextInterface;

    return (
        <ScrollableHolder
            style={{
                fontSize: ".5em"
            }}
        >
            <ItemHolder style={{background: "#3d3d3d", color: "white", userSelect: "none", MozUserSelect: "none"}} >
                { columnNames.map(name => <DataHolder style={{flex: "1", textAlign: "center", margin: "0px"}} > {name} </DataHolder> ) }
            </ItemHolder>
            { displayList.map(item => <GalleryItem key={shortid.generate()} item={item} /> ) }
        </ScrollableHolder>
    )
}

export default Gallery
