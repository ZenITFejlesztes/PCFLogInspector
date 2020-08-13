import React from "react"


//  @comment    not actually technically a hook, but i didnt want just a random function
//  @desc       scrapes the property values from an object and turns them into an array of strings
//  @example    {a: "hello my", b: 5, c: true, d: {fizz: "buzz", value: "myValue"},{}} => ["hello","5","true","myValue","-"] 
export default ( columnNames: string[], item: any ): string[] => {
    const findPropertyValue = (propertyName: string): string => {
        const entries = Object.entries(item);
        const entry = (entries.find( entry => entry[0] === propertyName ) || ["","-"]) as [string, any]
        switch (typeof entry[1]) {
            case "number":
                return entry[1] + ""
            case "string":
                return entry[1]
            case "boolean":
                return entry[1] ? "true" : "false"
            case "object":
                if (entry[1].value) return findPropertyValue("value")
                if (entry[1].Value) return findPropertyValue("Value")
                if (entry[1].Result) return findPropertyValue("Result")
                if (entry[1].result) return findPropertyValue("result")
                return "-"
            default:
                return "-"
        }
    }

    return columnNames.map(colName => findPropertyValue(colName))
}