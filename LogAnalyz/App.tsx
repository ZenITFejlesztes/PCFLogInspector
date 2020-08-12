import React from 'react'

import {RProps} from "./inputInterfaces"

import GlobalStyles from "./styles/GlobalStyles"
import Animations from "./styles/Animations"

import GalleryState from "./context/galleryState"
import DetailsState from "./context/DetailsState"

import { BodyHolder, VerticalHolder, ContainerBasic, Holder } from "./components/elements"


import BottomBar from "./components/rightside/SettingsBar"
import UpdateInputs from "./UpdateInputs"
import GalleryContainer from "./components/logentries/GalleryContainer"
import RightSideView from "./components/rightside/RightSideView"


const App = (props: RProps) => {
    return (
        <GalleryState>
            <DetailsState>
                <Holder style={{position: "relative"}} >
                    <UpdateInputs parentProps={props} />
                    <BodyHolder>
                            <GalleryContainer />
                            <RightSideView />
                    </BodyHolder>
                    <BottomBar />
                </Holder>
                <GlobalStyles />
                <Animations />
            </DetailsState>
        </GalleryState>
    )
}


export default App
