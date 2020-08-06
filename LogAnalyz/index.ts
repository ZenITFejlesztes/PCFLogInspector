import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {RInputs, RProps} from "./inputInterfaces";


export class LogAnalyz implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private hostContainer: HTMLDivElement;
    private topLVLContainer: HTMLElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    
    private iinputs: IInputs;
    private inputs: RInputs;
    private defaultInputs: RInputs = {
        logData: `[]`,
        beforeAfter: `["dataBefore","dataAfter"]`,
        columnNames: `["Title"]`
    };
    private outputs: IOutputs;

    private fontSize: number;
    private maxFontsize: number = 18;


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
        this.context = context;
        this.hostContainer = container;
        this.hostContainer.style.overflow = "hidden";
        this.topLVLContainer = this.hostContainer.parentElement?.parentElement?.parentElement?.parentElement || this.topLVLContainer;
        this.setHostSize();
        this.refreshInputs();

        this.renderDOM()
    }

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
        this.context = context;
        this.setHostSize();
        this.refreshInputs();
        this.setFontsize();

        this.renderDOM()
    }

	public getOutputs(): IOutputs
	{
		return this.outputs;
	}

	public destroy(): void
	{
        ReactDOM.unmountComponentAtNode(this.hostContainer);
    }
    
    private setHostSize(): void {
        this.hostContainer.style.width = this.topLVLContainer.offsetWidth + "px"
        this.hostContainer.style.height = this.topLVLContainer.offsetHeight + "px"
    }

    private setFontsize(): void {
        this.fontSize = Math.min(
            Math.floor(this.hostContainer.offsetWidth / 10),
            Math.floor(this.hostContainer.offsetHeight * 0.9),
            this.maxFontsize
        );
        this.hostContainer.style.fontSize = this.fontSize + "px";
    }

    private refreshInputs(): void {
        this.iinputs = {
           xLogData: this.context.parameters.xLogData,
           xBeforeAfterNames: this.context.parameters.xBeforeAfterNames,
           xSearchFields: this.context.parameters.xSearchFields,
        }
        this.inputs = {
            logData: this.iinputs.xLogData.raw || this.defaultInputs.logData,
            beforeAfter: this.iinputs.xBeforeAfterNames.raw || this.defaultInputs.beforeAfter,
            columnNames: this.iinputs.xSearchFields.raw || this.defaultInputs.columnNames
        }
     
    }

    private setOutputs (newOutputs: IOutputs, resetAll: boolean): void {
        resetAll ? this.outputs = newOutputs : this.outputs = { ...this.outputs, ...newOutputs }
    }

    private renderDOM(): void {
        const props: RProps = {
            context: this.context,
            notifyOutputChanged: this.notifyOutputChanged,
            inputs: this.inputs,
            outputs: this.outputs,
            setOutputs: this.setOutputs,
            fontSize: this.fontSize
        }

        ReactDOM.render(
            React.createElement(App, props),
            this.hostContainer
        )
    }

}