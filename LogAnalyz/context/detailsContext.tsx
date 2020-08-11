import { createContext } from "react"

export interface PaneInterface {
    title: string;
    selectedEntry: any;
    ID: string;
}



export interface DetailsStateInterface {
    openedPanes: PaneInterface[] | null;
    selectedPane: PaneInterface | null;
}

export interface DetailsContextInterface extends DetailsStateInterface {
    createNewPane: (entry: any) => void;
    removeExistingPane: (paneID: string) => void;
    setSelectedPane: (paneID: string) => void;
    updateSelectedPaneEntry: (entry: any) => void;
}

export const DetailsContext = createContext(null as unknown as DetailsContextInterface)


