import React from 'react'

import {RProps} from "./inputInterfaces"

import GlobalStyles from "./styles/GlobalStyles"
import Animations from "./styles/Animations"

import GalleryState from "./context/galleryState"

import { BodyHolder, VerticalHolder, ContainerBasic, Holder } from "./components/elements"


import BottomBar from "./components/pagelayout/BottomBar"
import UpdateInputs from "./UpdateInputs"
import GalleryContainer from "./components/logentries/GalleryContainer"
import RightSideView from "./components/pagelayout/RightSideView"


const App = (props: RProps) => {
    return (
        <GalleryState>
            <Holder style={{position: "relative"}} >
                <GlobalStyles />
                <Animations />
                <UpdateInputs parentProps={props} />
                <BodyHolder>
                        <GalleryContainer />
                        <RightSideView />
                </BodyHolder>
                <BottomBar />
            </Holder>
        </GalleryState>
    )
}


export default App
