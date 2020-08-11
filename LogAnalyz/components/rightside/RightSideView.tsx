import React, { useState } from 'react'

import { Holder } from "../elements"

import DetailNavBar from "../entrydetails/DetailNavBar"
import DetailContainer from "../entrydetails/DetailContainer"

const RightSideView = () => {
    const [selectedView, setSelectedView] = useState({name: "Details", id: 1})
    
    return (
        <Holder style={{display: "flex", flexDirection: "column", overflow: "hidden"}} >
            <div style={{ flex: "0 1 auto" }} >
                <DetailNavBar />
            </div>
            <div style={{flex: "1 1 auto", minHeight: "0px"}} >
                <DetailContainer />
            </div>
        </Holder>
    )
}

export default RightSideView
