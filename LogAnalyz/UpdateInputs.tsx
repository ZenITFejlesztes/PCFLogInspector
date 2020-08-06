import React, {useContext, useEffect} from "react"

import {RProps} from "./inputInterfaces"
import {GalleryContext, GalleryContextInterface} from "./context/galleryContext"


interface InputsToUpdate {
    parentProps: RProps
}

const UpdateInputs = ({parentProps: {inputs: {logData, beforeAfter, columnNames}}}: InputsToUpdate) => {
    const { refreshEntries, refreshBeforeAfter, refreshColumnNames } = useContext(GalleryContext) as GalleryContextInterface
    
    useEffect(() => refreshEntries(logData), [logData])

    useEffect(() => refreshBeforeAfter(beforeAfter), [beforeAfter])

    useEffect(() => refreshColumnNames(columnNames), [columnNames])
    
    return ( <React.Fragment></React.Fragment> )
}

export default UpdateInputs