import React, { useContext, useMemo, useState, useCallback, lazy, Suspense } from "react";

import { Holder } from "../elements";
import { MdClose } from "react-icons/md";

import { GalleryContext, GalleryContextInterface } from "../../context/galleryContext";
import { DetailsContext, DetailsContextInterface } from "../../context/detailsContext";

import GeneralEntryInfo from "./GeneralEntryInfo";
import HiddenSetting from "./HiddenSetting";
const LogChangeList = lazy(() => import("./LogChangeList"));
import FindSimilatContainer from "./finder/FindSimilarContainer"

// @desc    Removes selected properties from an object.
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

// @desc    The top level container of the details pane
const DetailContainer = () => {
    const {
        beforeAfter: [beforeColumnName, afterColumnName],
    } = useContext(GalleryContext) as GalleryContextInterface;
    const { selectedPane, removeExistingPane, onlyChanges } = useContext(
        DetailsContext
    ) as DetailsContextInterface;

    const [displayOption, setDisplayOption] = useState("details");

    // creates the general infos
    const genInfoToDisplay = useMemo(
        () =>
            filterObjectProperties(selectedPane?.selectedEntry, [
                beforeColumnName,
                afterColumnName,
            ]),
        [beforeColumnName, afterColumnName, selectedPane]
    );

    const removeThisPane = useCallback(() => {
        if (selectedPane) removeExistingPane(selectedPane.ID);
    }, [removeExistingPane, selectedPane]);

    const toggleView = useCallback(() => {
        setDisplayOption(prev => prev == "details" ? "related" : "details")
    }, [setDisplayOption])

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
                {genInfoToDisplay && (
                    <HiddenSetting
                        onClickAction={removeThisPane}
                        Icon={MdClose}
                        title="Close pane"
                    />
                )}
                {genInfoToDisplay && <GeneralEntryInfo info={genInfoToDisplay} />}
            </div>
            <div style={{ flex: "1 1 auto", minHeight: "0px" }}>
                {displayOption == "details" && (
                    <Suspense fallback={<div>Loading...</div>}>
                        {genInfoToDisplay && (
                            <LogChangeList
                                inpData={{ beforeColumnName, afterColumnName, selectedPane, onlyChanges }}
                                toggleView={toggleView}
                            />
                        )}
                    </Suspense>
                )}
                {
                    displayOption == "related" && genInfoToDisplay &&
                    <FindSimilatContainer  toggleView={toggleView} />
                }
            </div>
        </Holder>
    );
};

export default DetailContainer;
