import React, {useContext} from 'react'

import shortid from "shortid"

import { ItemHolder, DataHolder } from "../elements"

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext"

const GalleryHeaders = () => {
    const { columnNames } = useContext(GalleryContext) as GalleryContextInterface

    return (
        <ItemHolder
            style={{
                background: "#3d3d3d",
                color: "white",
                userSelect: "none",
                MozUserSelect: "none",
                fontSize: ".5em"
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
    )
}

export default GalleryHeaders
