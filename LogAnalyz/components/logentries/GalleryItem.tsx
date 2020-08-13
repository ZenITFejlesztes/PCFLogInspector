import React from "react";
import shortid from "shortid";
import { isEqual } from "lodash";

import { ItemHolder, DataHolder } from "../elements";

// @desc    The presentational part of the gallery items
const GalleryItem = ({
    selected,
    onSelection,
    displayValues,
    doOnDoubleClick,
}: {
    selected: boolean;
    onSelection: () => void;
    displayValues: string[];
    doOnDoubleClick: () => void;
}) => {
    return (
        <ItemHolder
            style={{
                padding: "0px .5em",
                userSelect: "none",
                WebkitUserSelect: "none",
                background: `${selected ? "#e7e7e7" : "transparent"}`,
            }}
            onClick={onSelection}
            onDoubleClick={doOnDoubleClick}
        >
            {displayValues.map((val) => {
                const thisId = shortid.generate();
                return (
                    <DataHolder style={{ flex: "1", margin: "0px .5em" }} key={shortid.generate()}>
                        {" "}
                        {val}{" "}
                    </DataHolder>
                );
            })}
        </ItemHolder>
    );
};

export default React.memo(GalleryItem, (prev, next) => {
    return isEqual(prev.displayValues, next.displayValues) && isEqual(prev.selected, next.selected);
});
