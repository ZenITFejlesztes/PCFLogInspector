import React from 'react'

import { css, Global } from "@emotion/core"

const Animations = () => {
    return (
        <Global 
        styles={ css`
            .bottom-bar-hide{
                transform: translateY(calc(2em));
                transition: transform .2s ease;
                :hover, :active, :focus{
                    transform: translateY(0);
                }
            }
            .vertical-disappear{
                transform: scaleY(0);
                transform-origin: bottom center;
            }
            .horizontal-disappear{
                flex: 0.2 1 0px;
            }
        ` }
        />
    )
}

export default Animations
