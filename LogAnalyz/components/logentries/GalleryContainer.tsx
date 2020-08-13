import React, {lazy, Suspense} from 'react'

import { Holder } from "../elements"

import GallerySearch from "./GallerySearch"
import GalleryHeaders from "./GalleryHeaders"
const Gallery = lazy(() => import("./Gallery"))

// @desc    Just a structural component
const GalleryContainer = () => {
    return (
        <Holder style={{display: "flex", flexDirection: "column", overflow: "hidden", /* border: "1px solid black" */}} >
            <div style={{flex: "0 1 auto", boxSizing: "border-box", margin: "0px", padding: "0px"}} >
                <GallerySearch />
            </div>
            <div style={{flex: "0 1 auto", boxSizing: "border-box", margin: "0px", padding: "0px"}} >
                <GalleryHeaders />
            </div>
            <div style={{flex: "1 1 0", minHeight: "0px", boxSizing: "border-box"}}>
                <Suspense fallback={ <div>Loading...</div> } >
                    <Gallery />
                </Suspense>
            </div>
        </Holder>
    )
}

export default GalleryContainer
