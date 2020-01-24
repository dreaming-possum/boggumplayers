import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {escapeRegExp} from "../../../../../stdlib/escapeRegExp";
import {FormFailure} from "../../../../../material/form_failure";

@Component({
    selector: "GeneralInput",
    templateUrl: "./general_input.html",
    styleUrls: ["./general_input.scss"]
})
export class GeneralInputComponent implements OnInit {
    touched: boolean = false;
    pattern: string;

    @ViewChild("generalInput", {static: true}) inputRef: ElementRef;
    @Input() type: string;
    @Input() placeholderKey: string;
    @Input() labelKey: string;
    @Input() required: boolean;
    @Input() maximum_length = 1024;
    @Input() min_spec: string;
    @Input() max_spec: string;
    @Input() name: string;
    @Input() autoFocus: boolean = false;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    valueData = "";
    formFailureData: FormFailure = FormFailure.empty();

    constructor() {
        this.updatePattern();
    }

    ngOnInit(): void {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    }

    @Input()
    get value(): string {
        return this.valueData;
    }

    set value(newValue: string) {
        if (this.valueData !== undefined && this.valueData !== newValue) {
            this.formFailure.isInvalid = false;
            this.touch();
            this.valueChange.emit(newValue);
        }
        this.valueData = newValue;
    }

    @Input()
    get formFailure(): FormFailure {
        return this.formFailureData;
    }

    set formFailure(newValue: FormFailure) {
        this.formFailureData = newValue;
        this.updatePattern();
        this.formFailureData.subscribe(() => this.updatePattern());
    }

    updatePattern(): void {
        if (this.formFailure.isInvalid) {
            this.pattern = "^(?!" + escapeRegExp(this.valueData) + "$).*$";
        } else {
            this.pattern = undefined;
            this.formFailure.invalidityMsg = '';
            if (!!this.inputRef)
                this.inputRef.nativeElement.setCustomValidity('');
        }
    }

    touch(): void {
        this.touched = true;
    }
}
