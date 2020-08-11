import React, { useContext, useMemo, useCallback } from "react";

import { Holder } from "../elements";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";
import { DetailsContext, DetailsContextInterface } from "../../context/detailsContext";

import GeneralEntryInfo from "./GeneralEntryInfo";
import CloseCurrentPane from "./CloseCurrentPane";

const filterObjectProperties = (oldObject: any, listToRemove: string[]) => {
    try {
        return oldObject
            ? Object.entries<any>(oldObject)
                  .filter((entry) => !listToRemove.includes(entry[0]))
                  .reduce(
                      (newObj, entry) =>
                          Object.defineProperty(newObj, entry[0], {
                              value: entry[1],
                              writable: true,
                              enumerable: true,
                              configurable: true,
                          }),
                      {}
                  )
            : null;
    } catch (error) {
        console.warn(error);
        return null;
    }
};

const DetailContainer = () => {
    const {
        beforeAfter: [beforeColumnName, afterColumnName],
    } = useContext(GalleryContext) as GalleryContextInterface;
    const { selectedPane, removeExistingPane } = useContext(
        DetailsContext
    ) as DetailsContextInterface;

    const genInfoToDisplay = useMemo(
        () =>
            filterObjectProperties(selectedPane?.selectedEntry, [
                beforeColumnName,
                afterColumnName,
            ]),
        [beforeColumnName, afterColumnName, selectedPane]
    );

    const removeThisPane = useCallback(() => {
        removeExistingPane(selectedPane.ID);
    }, [removeExistingPane, selectedPane]);

    return (
        <Holder
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                fontSize: ".7em",
                position: "relative",
            }}
        >
            <div style={{ flex: "0 1 auto" }}>
                <CloseCurrentPane removePane={removeThisPane} />
                {genInfoToDisplay && <GeneralEntryInfo info={genInfoToDisplay} />}
            </div>
        </Holder>
    );
};

export default DetailContainer;
