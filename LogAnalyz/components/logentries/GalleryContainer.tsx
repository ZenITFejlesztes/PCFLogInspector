import React, {useContext, useState} from 'react'

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext"

import { Holder } from "../elements"

import Gallery from "./Gallery"
import GallerySearch from "./GallerySearch"


const GalleryContainer = () => {


    return (
        <Holder style={{display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid black"}} >
            <div style={{flex: "0 1 auto"}} >
                <GallerySearch />
            </div>
            <div style={{flex: "1 1 0", minHeight: "0px"}}>
                <Gallery />
            </div>
        </Holder>
    )
}

export default GalleryContainer
