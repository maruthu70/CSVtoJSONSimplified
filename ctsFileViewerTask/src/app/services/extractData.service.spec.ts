import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { objectToArrayPipe } from '../pipes/objectTransformer.pipe';
import { filterPipe } from '../pipes/filter.pipe';
import { extractDataService } from './extractData.service';
import { dataContainer } from '../dataModel/data.model';
declare var $: any;
describe('Service: FormService', () => {
    console.log("service test unit")

    let component: AppComponent;
    let service: extractDataService;
    let fixture: ComponentFixture<AppComponent>; let file;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent, objectToArrayPipe, filterPipe
            ],
            imports: [FormsModule],
            providers: [extractDataService]
        }).compileComponents();
    }));

    it('Consuming Application Component', async(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        service = TestBed.get(extractDataService);  //Consuming service, since excel reader in service method.
        expect(component).toBeTruthy();
        fixture.detectChanges();
    }));


    it('Invoking File selector', (() => {
        setTimeout(() => { //OnDestroy will destroy the current modules. hence added detection manually and timeout. 
            const el = fixture.debugElement.nativeElement;
            el.querySelector('#fileSelector').click();
            el.querySelector('#fileSelector').dispatchEvent(new Event('click'));
            fixture.detectChanges();
        }, 10)

        let newFile = [{

            'lastModified'
                :
                '1530964475238',
            'lastModifiedDate'
                :
                'Sat Jul 07 2018 17:24:35 GMT+0530 (India Standard Time)',
            'name'
                :
                'issues.csv',
            'size'
                :
                '157',
            'type'
                :
                '',
            'webkitRelativePath'
                :
                ''
        }]
    
        let returner = service.extractor(file);
        expect(returner.hasError).toBe(false);


    }));


});


