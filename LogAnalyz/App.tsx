import React from 'react'

import {RProps} from "./inputInterfaces"

import GlobalStyles from "./styles/GlobalStyles"
import Animations from "./styles/Animations"

import GalleryState from "./context/galleryState"
import DetailsState from "./context/DetailsState"

import { BodyHolder, Holder } from "./components/elements"


import SettingsBottomBar from "./components/layout/SettingsBottomBar"
import UpdateInputs from "./UpdateInputs"
import GalleryContainer from "./components/logentries/GalleryContainer"
import RightSideView from "./components/layout/RightSideView"


const App = (props: RProps) => {
    return (
        <GalleryState>
            <DetailsState>
                <Holder style={{position: "relative"}} className="acsudzgaudcg-mainCont" >
                    <UpdateInputs parentProps={props} />
                    <BodyHolder>
                            <GalleryContainer />
                            <RightSideView />
                    </BodyHolder>
                    <SettingsBottomBar />
                </Holder>
                <GlobalStyles />
                <Animations />
            </DetailsState>
        </GalleryState>
    )
}


export default App
