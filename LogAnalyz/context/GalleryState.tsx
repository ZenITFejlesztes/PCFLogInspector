import { GalleryContext, GalleryStateInterface } from "./galleryContext";
import GalleryReducer from "./galleryReducer";

import shortid from "shortid";

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

    // @desc    Loading the fresh entries upon input change
    const refreshEntries = (entryString: string) => {
        // sorts based on the value of the dateValueName property
        function sortEntries(entries: any[], dateValueName: any) {
            return entries.sort((a, b) => {
                const dateA = Date.parse(a[dateValueName]);
                const dateB = Date.parse(b[dateValueName]);
                if (isNaN(dateA) || isNaN(dateB)) return 0;
                return dateB - dateA;
            });
        }

        try {
            let entryList = JSON.parse(entryString);
            if (Array.isArray(entryList)) {
                // adding ID to the entry if it doesnt have one
                entryList = entryList.map((entry) =>
                    entry.ID ? entry : { ...entry, ID: shortid.generate() }
                );
                // checking for createdAt / created_at / created value and then trying to sort by them
                const type1 = entryList.filter((e) => e.createdAt);
                const type2 = entryList.filter((e) => e.created_at);
                const type3 = entryList.filter((e) => e.created);
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

    // Refreshing the Before and After column names based on the new input
    const refreshBeforeAfter = (baString: string) => {
        try {
            const baTouple = JSON.parse(baString);
            if (Array.isArray(baTouple) && baTouple.length === 2) {
                dispatch({ type: "REFRESH_BA", payload: baTouple });
            } else {
                dispatch({ type: "INVALID_BA" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_BA", payload: state.beforeAfter });
        }
    };
    // refreshing the Column Names based on the new input
    const refreshColumnNames = (columnsString: string) => {
        try {
            const columnsList = JSON.parse(columnsString);
            if (Array.isArray(columnsList)) {
                dispatch({ type: "REFRESH_COLUMNS", payload: columnsList.slice(0, 4) });
            } else {
                dispatch({ type: "INVALID_COLUMNS" });
            }
        } catch (error) {
            dispatch({ type: "REFRESH_COLUMNS", payload: state.columnNames });
        }
    };

    // Setting the currently selected entry
    const setSelectedEntry = (newEntryId: number) => {
        const newEntry = state.entryList.find((i) => i.ID === newEntryId) || null;
        dispatch({ type: "SET_SELECTED_ENTRY", payload: newEntry });
    };

    // Looks for an occurence of a word in the entrylist (comparing text to text)
    const filterEntries = (searchTerm: string) => {
        if (searchTerm == "" || searchTerm === " ") {
            dispatch({ type: "FILTER_ENTRIES", payload: state.entryList });
        } else {
            const matches = state.entryList.filter((v) =>
                JSON.stringify(v).toLowerCase().includes(searchTerm.toLowerCase())
            );
            dispatch({ type: "FILTER_ENTRIES", payload: matches });
        }
    };

    // Finds related / similar entries based on a set of criteria (a list of columnNames, and a list of correspondingly-ordered expected values)
    const findRelatedEntries = (
        searchTerm: string[] | string,
        columnToLookIn: string[] | string
    ) => {
        if (searchTerm == "" || searchTerm === " ") return;
        if (!Array.isArray(searchTerm)) searchTerm = [searchTerm];
        if (!Array.isArray(columnToLookIn)) columnToLookIn = [columnToLookIn];
        if (searchTerm.length != columnToLookIn.length) return;

        // checks for every provided column whether the valus do in fact match up.
        const matches = state.entryList.filter((entry) =>
            (columnToLookIn as string[]).reduce<boolean>(
                (check, col, index) => (entry[col] === searchTerm[index] ? check : false),
                true
            )
        );
        dispatch({ type: "FILTER_ENTRIES", payload: matches });
    };

    return (
        <GalleryContext.Provider
            value={{
                entryList: state.entryList,
                beforeAfter: state.beforeAfter,
                columnNames: state.columnNames,
                selectedEntry: state.selectedEntry,
                displayList: state.displayList,
                errorMessage: state.errorMessage,
                setSelectedEntry,
                refreshEntries,
                refreshBeforeAfter,
                refreshColumnNames,
                filterEntries,
                findRelatedEntries,
            }}
        >
            {props.children}
        </GalleryContext.Provider>
    );
};

export default GalleryState;
