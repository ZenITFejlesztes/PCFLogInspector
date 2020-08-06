import React from 'react'

import {RProps} from "./inputInterfaces"

import GlobalStyles from "./globalStyles"

import GalleryState from "./context/galleryState"

import { BodyHolder } from "./components/elements"

const App = (props: RProps) => {
    return (
        <GalleryState>
                <GlobalStyles />
                <BodyHolder>
                </BodyHolder>
        </GalleryState>
    )
}

export default App
