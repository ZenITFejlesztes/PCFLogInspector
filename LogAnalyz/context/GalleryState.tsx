import { GalleryContext } from "./galleryContext";
import GalleryReducer from "./galleryReducer";

import React, { useReducer, Reducer } from "react";

interface GalleryStateInterface {
    entryList: any[];
    displayList: any[];
    beforeAfter: [string, string];
    columnNames: string[];
    selectedEntry: any;
    errorMessage: string;
}

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
        try {
            const entryList = JSON.parse(entryString);
            if (Array.isArray(entryList)) {
                dispatch({ type: "REFRESH_ENTRIES", payload: entryList });
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
            const entryList = JSON.parse(baString);
            if (
                Array.isArray(entryList) &&
                entryList.length === 2 &&
                entryList.map((e) => typeof e === "string")
            ) {
                dispatch({ type: "REFRESH_BA", payload: entryList });
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
            const entryList = JSON.parse(columnsString);
            if (
                Array.isArray(columnsString) &&
                entryList.map((e) => typeof e === "string")
            ) {
                dispatch({ type: "REFRESH_COLUMNS", payload: entryList.slice(0,3) });
            } else {
                dispatch({ type: "INVALID_COLUMNS" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_COLUMNS", payload: state.columnNames });
        }
    };

    // set selected entry
    const setSelectedEntry = (newEntryId: number) => {
        const newEntry = state.entryList[newEntryId] || null;
        dispatch({ type: "SET_SELECTED_ENTRY", payload: newEntry });
    };

    // filter entry list
    const filterEntries = (searchTerm: string) => {
        if (searchTerm == "" || searchTerm === " ") {
            dispatch({ type: "FILTER_ENTRIES", payload: state.entryList });
        } else {
            const matches = state.entryList.filter((v) => JSON.stringify(v).includes(searchTerm));
            dispatch({ type: "FILTER_ENTRIES", payload: matches });
        }
    };

    return (
        <GalleryContext.Provider
            value={{
                entryList: state.entryList,
                beforeAfter:state.beforeAfter,
                columnNames: state.columnNames,
                selectedEntry: state.selectedEntry,
                displayList: state.displayList,
                setSelectedEntry,
                refreshEntries,
                refreshBeforeAfter,
                refreshColumnNames,
                filterEntries,
            }}
        >
            {props.children}
        </GalleryContext.Provider>
    );
};

export default GalleryState;
