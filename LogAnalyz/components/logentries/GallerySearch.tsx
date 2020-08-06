import React, { useContext, useState, useCallback, useRef } from "react";

import styled from "@emotion/styled"

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext"

import { SearchInput } from "../elements";

const GallerySearch = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [lastSearchTerm, setLastSearchTerm] = useState("")

    const { displayList, filterEntries } = useContext(GalleryContext) as GalleryContextInterface

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }, [setSearchTerm])

    const submitSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setLastSearchTerm(e.currentTarget.value)
            filterEntries(e.currentTarget.value)
            setSearchTerm("")
        }
    },[setLastSearchTerm, filterEntries, setSearchTerm])

    return (
        <div>
            <SearchInput
                style={{
                    borderBottom: "1px solid black",
                    outline: "nonr"
                }}
                hoverFill="#eee"
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={onInputChange}
                onKeyDown={submitSearch}
            />
            <InfoHolder>
                <p style={{maxWidth: "70%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} >Last search: {lastSearchTerm} </p>
                <p >Entries found: {displayList.length} </p>
            </InfoHolder>
        </div>
    );
};

export default GallerySearch;


const InfoHolder = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px .4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .7em;
`