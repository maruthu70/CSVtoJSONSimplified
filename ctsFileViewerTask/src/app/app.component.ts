import { Component, ElementRef, isDevMode, ChangeDetectorRef } from '@angular/core';
import { extractDataService } from './services/extractData.service';
import { dataContainer } from './dataModel/data.model';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  uploadedData = new dataContainer();
  isFileUploaded = false;
  env = '';
  constructor(private elRef: ElementRef, private cdRef: ChangeDetectorRef, private extractDataService: extractDataService) {
    //Dependency Injected Service
  }

  ngOnInit() {
    this.env = isDevMode() ? 'Development' : 'Production'
  }

  uploadFile() { // Invoke pop up window to select file
    let currentDOMElements = this.elRef.nativeElement;
    this.uploadedData.tableHeaders = [], this.uploadedData.tableRows = [];
    $(currentDOMElements).find('#fileSelector').trigger('click');
  }

  isFilterRequired = false; minIssueCount = null;
  filter(isFilterNeed) {  // Retrive lowest minimul count value
    if (isFilterNeed.target.checked) {
      this.isFilterRequired = true;
      this.minIssueCount = (this.minArrayValue(this.uploadedData.filterContent));
    }
    else if (!isFilterNeed.target.checked) {
      this.isFilterRequired = false;
    }
  }

  validate(value) {  // Filter - to Display minimul issue count row
    return value['Issue count'] == this.minIssueCount;
  }

  minimulIssueRows: any = [];
  minArrayValue(array, methodController?) {
    let minimumValue = Math.min.apply(Math, array);
    !methodController ? this.minimulIssueRow(minimumValue) : console.log("Ignoring Minimul Finder")
    return Math.min.apply(Math, array);
  };

  minimulIssueRow(minimumValue) {
    if (this.uploadedData.tableRows.filter(filteredRows => filteredRows['Issue count'] == minimumValue).length > 0) {
      this.minimulIssueRows = this.uploadedData.tableRows.filter(filteredRows => filteredRows['Issue count'] == minimumValue)
      console.log("Minimum issue count rows " + this.minimulIssueRows);
    }
  }

  refill;
  onSelectFile(selectedFile) { // Excel Reader 
    this.uploadedData.filterContent = [];
    this.extractDataService.extractor(selectedFile).subscribe(extractedData => { //Calling injected Service to extract data and return back with values
      console.log("data Extraction Success" + JSON.stringify(extractedData));
      this.uploadedData.tableHeaders = extractedData['tableHeaders'];
      this.uploadedData.tableRows = extractedData['tableRows'];
      this.uploadedData.filterContent = extractedData['filterContent'];
      this.isFileUploaded = true; this.refill = '';
    }, err => {
      console.log('Error OCcured' + JSON.stringify(err));
    })
  }

  ngOnDestroy() { //OndEstry to detech changes -Invoke from test units
    if (!this.cdRef['destroyed']) {
      this.cdRef.detectChanges();
    }
  }

}
