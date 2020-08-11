import {DetailsStateInterface} from "./detailsContext"

export default function (state: DetailsStateInterface, action) {
    switch (action.type) {
        case "ADD_PANE": 
            if (! state.openedPanes) return {
                ...state,
                openedPanes: [ action.payload ],
                selectedPane: action.payload
            } 
            return {
                ...state,
                openedPanes: [ ...state.openedPanes, action.payload ]
            }
        case "REMOVE_PANE":
            if (! state.openedPanes) return { ...state }
            if (action.payload.item == state.selectedPane) {
                const nextItem = state.openedPanes[action.paylad.index + 1]
                const prevItem = state.openedPanes[action.paylad.index - 1]
                return {
                    ...state, 
                    selectedPane: nextItem || prevItem || null,
                    openedPanes: state.openedPanes.filter(p => p.ID != action.payload.item.ID)
                }
            }
            return {
                ...state,
                openedPanes: state.openedPanes.filter(p => p.ID != action.payload.item.ID)
            }
        case "SET_SELECTED_PANE":
            return {
                ...state,
                selectedPane: action.payload
            }
        case "UPDATE_SELECTED_PANE_ENTRY":
            return {
                ...state,
                selectedPane: { ...state.selectedPane, selectedEntry: action.payload }
            }
        default:
            return { ...state }
    }
}