import React from 'react'
import styled from "@emotion/styled"
import shortid from "shortid"

import { Holder } from "../elements"

interface IProps {
    info: any;
}

// @desc the top bar of the details pane below navigation
const GeneralEntryInfo = ({info}: IProps) => {
    return (            
        <DataDisplayGrid>
            { Object.entries(info).map(entry => (
                <DataHolder key={shortid.generate()} >
                    <InfoP> <b> {entry[0]} </b> </InfoP>
                    <InfoP> {entry[1]} </InfoP>
                </DataHolder>
            )) }
        </DataDisplayGrid>
    )
}

export default GeneralEntryInfo

const DataDisplayGrid = styled(Holder)`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(9em, 1fr) );
    grid-gap: .2em;
    padding: .3em;
    border-bottom: 1.3px black solid;
`
const DataHolder = styled(Holder)`
    height: 3em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`
const InfoP = styled.p`
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
`
