import { createContext } from "react"
import { Context } from "vm";

export interface GalleryStateInterface {
    entryList: any[];
    displayList: any[];
    beforeAfter: [string, string];
    columnNames: string[];
    selectedEntry: any;
    errorMessage: string;
}

export interface GalleryContextInterface extends GalleryStateInterface {
    setSelectedEntry: (newEntryId: number) => void;
    refreshEntries: (entryString: string) => void;
    refreshBeforeAfter: (baString: string) => void;
    refreshColumnNames: (columnsString: string) => void;
    filterEntries: (searchTerm: string) => void;
    findRelatedEntries: (searchTerm: string, columnToLookIn: string) => void;
}

export const GalleryContext = createContext<GalleryContextInterface>(null as unknown as GalleryContextInterface)



