import React, { useState } from "react";

    // my one Single Biggest grievance is that the input function cant have a return value... 
    // i tried to figure that part out for more than an hour, but it just wouldnt work...


//  @desc       given a function and a wait period length it returns too functions
//  @desc       one to call the original function, and one to cancel it's execution
//  @comment    way worse than debounce   
export default <T extends (...args: any[]) => void>(fn: T, effectDelay: number): [(...args: Parameters<T>) => void, () => void]  => {
    const [timeoutArray, setTimeoutArray] = useState([0]);
    
    const myFunctionExecution = async (...args: Parameters<T> ) => {
        const id = (setTimeout(() => fn( ...args ), effectDelay) as unknown) as number;
        setTimeoutArray((prevArr) => [...prevArr, id]);
    };

    const cancelStackedExecutions = () =>
        setTimeoutArray((prevArr) => {
            if (prevArr != [0]) {
                prevArr.forEach((id) => clearTimeout(id));
                return [0];
            }
            return [ ...prevArr ]
        });

    return [ myFunctionExecution, cancelStackedExecutions ]
};
