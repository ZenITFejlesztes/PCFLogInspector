import React, { useReducer, Reducer } from "react";

import shortid from "shortid";

import detailsReducer from "./detailsReducer";
import { DetailsContext, DetailsStateInterface, PaneInterface } from "./detailsContext";

export default (props) => {
    const examplePane: PaneInterface = {
        title: "title",
        selectedEntry: {},
        ID: "just an ID"
    }

    const initialState: DetailsStateInterface = {
        openedPanes: null,
        selectedPane: null as unknown as PaneInterface,
    };

    const [state, dispatch] = useReducer<
        Reducer<DetailsStateInterface, { type: any; payload?: any }>
    >(detailsReducer, initialState);

    // add Pane

    const createNewPane = (entry: any): void => {
        if (!entry) return;
        const title: string =
            entry.title && typeof entry.title === "string"
                ? entry.title
                : entry.Title && typeof entry.Title === "string"
                ? entry.Title
                : "New Pane";
        const ID: string = shortid.generate();
        const payload: PaneInterface = {
            selectedEntry: entry,
            title,
            ID,
        };
        dispatch({ type: "ADD_PANE", payload });
    };

    // remove Pane

    const removeExistingPane = (paneID: string): void => {
        if (!paneID) return;
        if (!state.openedPanes) return;
        const paneToRemove = state.openedPanes.find((pane) => pane.ID === paneID);
        const paneToRemoveIndex = state.openedPanes.findIndex((pane) => pane.ID === paneID);
        if (!paneToRemove) return;
        dispatch({
            type: "REMOVE_PANE",
            payload: { item: paneToRemove, index: paneToRemoveIndex },
        });
    };

    // change selectedPane

    const setSelectedPane = (paneID: string): void => {
        if (!paneID) return;
        dispatch({ type: "SET_SELECTED_PANE", payload: paneID });
    };

    // change selectedPane's selectedEntry
    const updateSelectedPaneEntry = (entry: any): void => {
        if (!entry) return;
        dispatch({ type: "UPDATE_SELECTED_PANE_ENTRY", payload: entry });
    };

    return (
        <DetailsContext.Provider
            value={{
                openedPanes: state.openedPanes,
                selectedPane: state.selectedPane,
                createNewPane,
                removeExistingPane,
                setSelectedPane,
                updateSelectedPaneEntry,
            }}
        >
            {props.children}
        </DetailsContext.Provider>
    );
};
