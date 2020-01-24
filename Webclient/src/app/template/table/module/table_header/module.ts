import {NgModule} from "@angular/core";
import {TableHeaderComponent} from "./component/table_header/table_header";
import {CommonModule} from "@angular/common";
import {HeaderTdComponent} from "./component/header_td/header_td";
import {TranslateModule} from "@ngx-translate/core";
import {SortButtonModule} from "../../../button/sort_button/module";
import {GeneralInputModule} from "../../../input/general_input/module";

@NgModule({
    declarations: [TableHeaderComponent, HeaderTdComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SortButtonModule,
        GeneralInputModule
    ],
    exports: [TableHeaderComponent]
})
export class TableHeaderModule {
}
