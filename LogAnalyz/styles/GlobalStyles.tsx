import { css, Global } from "@emotion/core";

import React from "react";

const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                * {
                    box-sizing: border-box;
                    margin: 0px;
                    padding: 0px;
                }

                .acsudzgaudcg-mainCont {
                    font-size: 18px;
                }

                @keyframes searchInputFocusAnimation {
                    0% {
                        background-color: white;
                    }
                    100% {
                        background-color: #3c3c3c;
                        color: white;
                    }
                }
            `}
        />
    );
};

export default GlobalStyles;
