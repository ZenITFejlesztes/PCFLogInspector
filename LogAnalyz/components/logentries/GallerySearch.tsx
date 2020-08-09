import React, { useContext, useState, useCallback, useRef } from "react";

import styled from "@emotion/styled"

import { AiOutlineSearch } from "react-icons/ai"

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext"

import { SearchInput, ContainerBasic, SearchInputBackground } from "../elements";

const IconHolder = ContainerBasic;

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
            <ContainerBasic
            style={{
                display: "flex",
                borderBottom: "1px solid black",
                padding: ".5px"
            }}
            >
                <SearchInputBackground
                style={{
                    outline: "none",
                    minWidth: "0px",
                    flex: "1 1 0"
                }}
                >
                    <SearchInput
                        type="text"
                        placeholder="Search here..."
                        value={searchTerm}
                        onChange={onInputChange}
                        onKeyDown={submitSearch}
                    />
                </SearchInputBackground>
            </ContainerBasic>
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