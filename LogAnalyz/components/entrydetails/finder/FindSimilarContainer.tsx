import React, { useContext, useMemo, useRef } from "react";

import { IoIosArrowForward } from "react-icons/io"

import { GalleryContext, GalleryContextInterface } from "../../../context/galleryContext";
import { DetailsContext, DetailsContextInterface } from "../../../context/detailsContext"

import { Holder } from "../../elements"

import FindSimilar from "./FindSimilar";
import HiddenSetting from "../HiddenSetting"

interface IProps {
    toggleView: () => void;
}

const FindSimilarContainer = ({toggleView}: IProps) => {
    const {
        columnNames,
        beforeAfter: [beforeColumnName, afterColumnName],
        findRelatedEntries,
    } = useContext(GalleryContext) as GalleryContextInterface;

    const { selectedPane } = useContext(DetailsContext) as DetailsContextInterface

    const selectableColumns = useMemo(
        () => columnNames.filter((name) => name != beforeColumnName && name != afterColumnName),
        [columnNames, beforeColumnName, afterColumnName]
    );

    const dropDownRef = useRef(null as any)

    const doTheFiltering = () => {
        const columnName = dropDownRef.current.value as string;
        if (!columnName) return
        const currentValue = selectedPane.selectedEntry[columnName] as string;
        if (!currentValue) return
        findRelatedEntries(currentValue, columnName)
    }

    return ( 
        <Holder style={{position: "relative"}} >
            <HiddenSetting onClickAction={toggleView} Icon={IoIosArrowForward} title="Back to details" />
            <FindSimilar reference={dropDownRef} selectableColumns={selectableColumns} filterEntries={doTheFiltering} />
        </Holder>
     )
};

export default FindSimilarContainer;
