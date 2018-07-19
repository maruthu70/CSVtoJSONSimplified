import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { dataContainer } from '../dataModel/data.model';
@Injectable()
export class extractDataService {
    uploadedData = new dataContainer();
    constructor() {
        console.log("Service has been injected!");
    }

    extractor(selectedFile) {
        this.uploadedData.tableHeaders = []; this.uploadedData.filterContent = []; this.uploadedData.tableRows = [];
        console.log("inside SErvice provider");
        let valuePasser = new Subject();
        if (selectedFile && selectedFile.length > 0) {
            let file: File = selectedFile.item(0);
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let fileNew: string = reader.result.split('"').join('');
                let tRows = fileNew.split(/\r|\n|\r/);
                this.uploadedData.tableHeaders = tRows[0].split(','); // Split the multi headers and store into Array                
                let i = 1;
                tRows.forEach((tRow, index) => {
                    index == 0 || index + 1 == tRows.length ? '' : i++;
                    let rowsA = tRows[i].split(',');
                    if (rowsA.length === this.uploadedData.tableHeaders.length) {
                        let eachRow = {};
                        this.uploadedData.tableHeaders.forEach((tableDataRows, secondrayArray) => {
                            eachRow[this.uploadedData.tableHeaders[secondrayArray]] = rowsA[secondrayArray].split('"').join('');
                            (this.uploadedData.tableHeaders[secondrayArray] == "Issue count") ? this.uploadedData.filterContent.push(rowsA[secondrayArray].split('"').join('')) : '';
                        })
                        this.uploadedData.tableRows.push(eachRow);
                    }
                    if (i + 1 == tRows.length) {
                        valuePasser.next({ tableHeaders: this.uploadedData.tableHeaders, tableRows: this.uploadedData.tableRows, filterContent: this.uploadedData.filterContent })
                    }
                })
            }
        }
        return valuePasser;
    }
}