import { css, Global } from "@emotion/core"

import React from 'react'

const GlobalStyles = () => {
    return (
        <Global 
        styles={ css`
            * {
                box-sizing: border-box;
                margin: 0px;
                padding: 0px;
            }
            @keyframes searchInputFocusAnimation{
                0% {
                    background-color: white
                }
                100% {
                    background-color: #3c3c3c;
                    color: white;
                }
            }
            .hvr-sweep-to-right {
                -webkit-transform: perspective(1px) translateZ(0);
                transform: perspective(1px) translateZ(0);
                box-shadow: 0 0 1px rgba(0, 0, 0, 0);
                position: relative;
                -webkit-transition-property: color;
                transition-property: color;
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
            }
            .hvr-sweep-to-right:before {
                content: "";
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #2098D1;
                -webkit-transform: scaleX(0);
                transform: scaleX(0);
                -webkit-transform-origin: 0 50%;
                transform-origin: 0 50%;
                -webkit-transition-property: transform;
                transition-property: transform;
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
                -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
            }
            .hvr-sweep-to-right:hover, .hvr-sweep-to-right:focus, .hvr-sweep-to-right:active {
                color: white;
            }
            .hvr-sweep-to-right:hover:before, .hvr-sweep-to-right:focus:before, .hvr-sweep-to-right:active:before {
                -webkit-transform: scaleX(1);
                transform: scaleX(1);
            }
        ` }
        />
    )
}

export default GlobalStyles