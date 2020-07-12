import {Component} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {DataService} from "../../../../../../service/data";
import {AvailableServer} from "../../../../../../domain_value/available_server";
import {Localized} from "../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../domain_value/instance_map";
import {Difficulty} from "../../../../../../domain_value/difficulty";

@Component({
    selector: "Search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"]
})
export class SearchComponent {

    header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'raid',
            labelKey: "PvE.Search.raid",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.raid"}],
            col_type: 0
        },
        {
            index: 1,
            filter_name: 'difficulty',
            labelKey: "PvE.Search.difficulty",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.difficulty"}],
            col_type: 2
        },
        {index: 2, filter_name: 'guild', labelKey: "PvE.Search.guild", type: 0, type_range: null, col_type: 0},
        {
            index: 3,
            filter_name: 'server',
            labelKey: "PvE.Search.server",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.server"}],
            col_type: 0
        },
        {index: 4, filter_name: 'start', labelKey: "PvE.Search.start", type: 2, type_range: null, col_type: 2},
        {index: 5, filter_name: 'end', labelKey: "PvE.Search.end", type: 2, type_range: null, col_type: 2},
        {index: 6, filter_name: 'duration', labelKey: "PvE.Search.duration", type: 2, type_range: null, col_type: 2},
    ];
    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0, 1, 2];
    responsiveModeWidthInPx: number = 840;
    num_characters: number = 0;

    constructor(
        private dataService: DataService
    ) {
        this.dataService.get_all_maps_by_type(0, (instance_maps: Array<Localized<InstanceMap>>) => {
            instance_maps.forEach(map => this.header_columns[0].type_range.push({
                value: map.base.id,
                label_key: map.localization
            }));
        });
        this.dataService.get_all_difficulties((difficulties: Array<Localized<Difficulty>>) => {
            difficulties.forEach(difficulty => this.header_columns[1].type_range.push({
                value: difficulty.base.id,
                label_key: difficulty.localization
            }));
        });
        this.dataService.get_all_servers((servers: Array<AvailableServer>) => {
            servers.forEach(server => this.header_columns[3].type_range.push({
                value: server.id,
                label_key: server.name
            }));
        });
    }

    onFilter(filter: any): void {

    }

}
