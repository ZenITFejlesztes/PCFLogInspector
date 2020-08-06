import { createContext } from "react"
import { Context } from "vm";

export interface GalleryContextInterface {
    entryList: any[];
    displayList: any[];
    columnNames: string[];
    beforeAfter: [string, string];
    selectedEntry: any;
    setSelectedEntry: (newEntryId: number) => void;
    refreshEntries: (entryString: string) => void;
    refreshBeforeAfter: (baString: string) => void;
    refreshColumnNames: (columnsString: string) => void;
    filterEntries: (searchTerm: string) => void;
}

export const GalleryContext = createContext<GalleryContextInterface>(null as unknown as GalleryContextInterface)



