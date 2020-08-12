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
                openedPanes: [ ...state.openedPanes, action.payload ],
                selectedPane: action.payload
            }

        case "REMOVE_PANE":
            if (! state.openedPanes) return { ...state }
            if (action.payload.item.ID == state.selectedPane.ID) {
                const nextItem = state.openedPanes[action.payload.index + 1]
                const prevItem = state.openedPanes[action.payload.index - 1]
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
            if (! state.openedPanes) return { ...state }
            const newPane = state.openedPanes.find((p) => p.ID === action.payload);
            if (!newPane) return { ...state }
            return {
                ...state,
                selectedPane: newPane
            }
        case "UPDATE_SELECTED_PANE_ENTRY":
            if ( !state.selectedPane ) return { ...state }
            if ( !state.openedPanes ) return { ...state }
            return {
                ...state,
                selectedPane: { ...state.selectedPane, selectedEntry: action.payload.entry, title: action.payload.title },
                openedPanes: state.openedPanes.map(pane => pane.ID === state.selectedPane.ID ? { ...pane, title: action.payload.title } : pane )
            }
        default:
            return { ...state }
    }
}