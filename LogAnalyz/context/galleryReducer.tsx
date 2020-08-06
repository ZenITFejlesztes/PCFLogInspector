export default (state, action) => {
    switch (action.type) {
        case "SET_SELECTED_ENTRY":
            return {
                ...state,
                selectedEntry: action.payload
            }
        case "REFRESH_ENTRIES":
            return {
                ...state,
                entryList: action.payload,
                displayList: action.payload,
                errorMessage: ""
            }
        case "INVALID_LOGLIST":
            return {
                ...state,
                errorMessage: "The provided Loglist JSON is invalid!"
            }
        case "REFRESH_BA":
            return {
                ...state,
                beforeAfter: action.payload
            }
        case "INVALID_BA":
            return {
                ...state,
                errorMessage: "The provided before and after columns are not valid!"
            }
        case "REFRESH_COLUMNS":
            return {
                ...state,
                columnNames: action.payload
            }
        case "INVALID_COLUMNS":
            return {
                ...state,
                errorMessage: "The provided columnnames are invalid!"
            }
        case "FILTER_ENTRIES":
            return {
                ...state,
                displayList: action.payload
            }
        default:
            return { ...state }
    }
}