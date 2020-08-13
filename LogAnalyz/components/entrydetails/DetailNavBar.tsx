import React, { useRef, useContext, useEffect } from "react";
import shortid from "shortid"
import styled from "@emotion/styled";

import Arrow from "./Arrow";
import { DetailsContext, DetailsContextInterface } from "../../context/detailsContext";

import { ContainerBasic, Holder } from "../elements";
import { colorPrimary, colorMiddle } from "../../styles/palette";

// @desc    The pane selector navbar on the top right
const DetailNavBar = () => {
    const { openedPanes, selectedPane, setSelectedPane } = useContext(
        DetailsContext
    ) as DetailsContextInterface;

    const navCardListRef = useRef(null);

    return (
        <ContainerBasic
            style={{
                padding: "0px .6em",
                borderBottom: "1px solid black",
                position: "relative",
            }}
        >
            <NavCardList ref={navCardListRef}>
                {openedPanes &&
                    openedPanes.map((pane) => (
                        <NavCard 
                        style={{
                            background: pane.ID === selectedPane.ID ? "white" : colorMiddle,
                            color: pane.ID === selectedPane.ID ? "black" : "white",
                            fontSize: pane.ID === selectedPane.ID ? ".7em" : ".6em"
                        }}
                        key={shortid.generate()} 
                        onClick={() => setSelectedPane(pane.ID)}
                        > 
                            {pane.title} 
                        </NavCard>
                    ))}
            </NavCardList>
            <Arrow holderReference={navCardListRef} direction="left" />
            <Arrow holderReference={navCardListRef} direction="right" />
        </ContainerBasic>
    );
};

export default DetailNavBar;

const NavCard = styled(Holder)`
    position: relative;
    margin: 0px 0.2em;
    flex: 0 0 auto;
    width: 15ch;
    height: 80%;
    background: ${colorMiddle};
    color: white;
    font-size: 0.6em;

    padding: 0px 0.3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    cursor: pointer;

    border-radius: 0.7em 0.7em 0px 0px;

    transform: translateY(37.5%);
    transition: transform 0.15s ease;

    :hover {
        transform: translateY(1px);
        white-space: normal;
    }
`;

const NavCardList = styled(Holder)`
    height: calc(2em + 0.5px);
    min-height: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background: white;
    overflow-x: auto;
    background: ${colorPrimary};

    ::-webkit-scrollbar {
        height: 2px;
    }
    ::-webkit-scrollbar-track-piece {
        background: white;
    }
    ::-webkit-scrollbar-thumb {
        background: ${colorPrimary};
    }
`;
