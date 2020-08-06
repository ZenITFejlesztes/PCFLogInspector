import styled from "@emotion/styled"


export const Holder = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
`

export const BodyHolder = styled(Holder)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100%;
    grid-gap: 0px;
    border: 1px solid black;
`

export const ScrollableHolder = styled(Holder)`
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar{
        width: .3em;
    }
    ::-webkit-scrollbar-track-piece{
        background: transparent;
    }
    ::-webkit-scrollbar-thumb{
        background: #3c3c3c;
    }
`

interface SearchInputProps {
    border?: any;
    hoverBorder?: any;
    hoverFill?: any;

}

export const SearchInput = styled.input`
    box-sizing: border-box;
    background: white;
    padding: .1em .4em;
    margin: 0px;
    height: 2.4em;
    width: 100%;
    outline: none;
    border: ${(props: SearchInputProps) => props.border || "none"};
    :hover,
    :focus,
    :active {
        border: ${(props: SearchInputProps) => props.hoverBorder || props.border || "none"}
    }
    :hover{
        background: ${(props: SearchInputProps) => props.hoverFill || "white"}        
    }
`
export const ItemHolder = styled(Holder)`
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;

`