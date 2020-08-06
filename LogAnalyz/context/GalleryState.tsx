import { GalleryContext } from "./galleryContext"
import GalleryReducer from "./galleryReducer"

import React, { useReducer } from 'react'

const galleryState = props => {
    
    const initialState = {

    }

    const [state, dispatch] = useReducer(GalleryReducer, initialState)
    

    
    return (
        <GalleryContext.Provider
        value={{

        }}
        >
            { props.children }
        </GalleryContext.Provider>
    )
}

export default galleryState
