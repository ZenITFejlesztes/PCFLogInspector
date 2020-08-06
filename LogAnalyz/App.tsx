import React, {useContext} from 'react'

import {RProps} from "./inputInterfaces"

import GlobalStyles from "./globalStyles"

import GalleryState from "./context/galleryState"

import { BodyHolder } from "./components/elements"

import UpdateInputs from "./UpdateInputs"
import GalleryContainer from "./components/logentries/GalleryContainer"


const App = (props: RProps) => {
    return (
        <GalleryState>
                <GlobalStyles />
                <UpdateInputs parentProps={props} />
                <BodyHolder >
                    <GalleryContainer />
                    <GalleryContainer />
                </BodyHolder>
        </GalleryState>
    )
}


export default App
