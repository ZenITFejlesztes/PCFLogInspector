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
        ` }
        />
    )
}

export default GlobalStyles
