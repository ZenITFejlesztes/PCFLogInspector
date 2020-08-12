import { GalleryContext, GalleryStateInterface } from "./galleryContext";
import GalleryReducer from "./galleryReducer";

import shortid from "shortid"

import React, { useReducer, Reducer } from "react";

const GalleryState = (props) => {
    const initialState = {
        entryList: [] as any[],
        displayList: [] as any[],
        beforeAfter: ["dataBefore", "dataAfter"] as [string, string],
        columnNames: ["Title"] as string[],
        selectedEntry: null as any,
        errorMessage: "",
    };

    const [state, dispatch] = useReducer<
        Reducer<GalleryStateInterface, { type: any; payload?: any }>
    >(GalleryReducer, initialState);

    // refresh entryList
    const refreshEntries = (entryString: string) => {
        // sorts based on the name of the date property
        function sortEntries( entries: any[], dateValueName: any ) {
            return entries.sort((a, b) => {
                const dateA = Date.parse(a[dateValueName])
                const dateB = Date.parse(b[dateValueName])
                if (isNaN(dateA) || isNaN(dateB)) return 0
                return dateB - dateA
            })
        }

        try {
            let entryList = JSON.parse(entryString);
            if (Array.isArray(entryList)) {
                // adding ID if doesnt exist
                entryList = entryList.map(entry => entry.ID ? entry : ({ ...entry, ID: shortid.generate() }))
                // checking for createdAt / created_at / created
                const type1 = entryList.filter( e => e.createdAt )
                const type2 = entryList.filter( e => e.created_at )
                const type3 = entryList.filter( e => e.created )
                switch (entryList.length) {
                    case type1.length:
                        entryList = sortEntries(entryList, "createdAt");
                        dispatch({ type: "REFRESH_ENTRIES", payload: entryList });
                    case type2.length:
                        entryList = sortEntries(entryList, "created_at");
                        dispatch({ type: "REFRESH_ENTRIES", payload: entryList });
                    case type3.length:
                        entryList = sortEntries(entryList, "created");
                        dispatch({ type: "REFRESH_ENTRIES", payload: entryList });
                    default:
                        dispatch({ type: "REFRESH_ENTRIES", payload: entryList });
                }
            } else {
                dispatch({ type: "INVALID_LOGLIST" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_ENTRIES", payload: state.entryList });
        }
    };

    // refresh beforeAfter
    const refreshBeforeAfter = (baString: string) => {
        try {
            const baTouple = JSON.parse(baString);
            if (
                Array.isArray(baTouple) &&
                baTouple.length === 2
            ) {
                dispatch({ type: "REFRESH_BA", payload: baTouple });
            } else {
                dispatch({ type: "INVALID_BA" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_BA", payload: state.beforeAfter });
        }
    };
    // refresh columnNames
    const refreshColumnNames = (columnsString: string) => {
        try {
            const columnsList = JSON.parse(columnsString);
            if (
                Array.isArray(columnsList)
            ) {
                dispatch({ type: "REFRESH_COLUMNS", payload: columnsList.slice(0,4) });
            } else {
                dispatch({ type: "INVALID_COLUMNS" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_COLUMNS", payload: state.columnNames });
        }
    };

    // set selected entry
    const setSelectedEntry = (newEntryId: number) => {
        const newEntry = state.entryList.find(i => i.ID === newEntryId) || null;
        dispatch({ type: "SET_SELECTED_ENTRY", payload: newEntry });
    };

    // filter entry list
    const filterEntries = (searchTerm: string) => {
        if (searchTerm == "" || searchTerm === " ") {
            dispatch({ type: "FILTER_ENTRIES", payload: state.entryList });
        } else {
            const matches = state.entryList.filter((v) => JSON.stringify(v).toLowerCase().includes(searchTerm.toLowerCase()));
            dispatch({ type: "FILTER_ENTRIES", payload: matches });
        }
    };
    
    // find similar 
    const findRelatedEntries = (searchTerm: string, columnToLookIn: string) => {
        if (searchTerm == "" || searchTerm === " ") return;
        const matches = state.entryList.filter(entry => entry[columnToLookIn] && entry[columnToLookIn].includes(searchTerm))
        dispatch({ type: "FILTER_ENTRIES", payload: matches });
    } 

    return (
        <GalleryContext.Provider
            value={{
                entryList: state.entryList,
                beforeAfter:state.beforeAfter,
                columnNames: state.columnNames,
                selectedEntry: state.selectedEntry,
                displayList: state.displayList,
                errorMessage: state.errorMessage,
                setSelectedEntry,
                refreshEntries,
                refreshBeforeAfter,
                refreshColumnNames,
                filterEntries,
                findRelatedEntries
            }}
        >
            {props.children}
        </GalleryContext.Provider>
    );
};

export default GalleryState;
