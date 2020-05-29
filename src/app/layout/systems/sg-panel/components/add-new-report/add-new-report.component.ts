import { SgReport } from './../../../../../shared/entities/sg/sg-report';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '../../../../../shared';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-add-new-report',
    templateUrl: './add-new-report.component.html',
    styleUrls: ['./add-new-report.component.scss']
})
export class AddNewReportComponent implements OnInit {
    addNewForm: FormGroup;

    @Output() show_read_all_report_html = new EventEmitter();
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    constructor(formBuilder: FormBuilder,
        private parserFormatter: NgbDateParserFormatter,
        private reportService: ReportService,
    ) {
        this.addNewForm = formBuilder.group({
            date: ['', Validators.required],
            desc: ['', Validators.required],
            acts: ['', Validators.required],
            personnel: ['', Validators.required],
            rmks: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.getLastReport();
    }
    getLastReport() {
        this.reportService.getLastReport().subscribe(data => {
            const form = this.addNewForm.controls;
            form.acts.setValue(data.acts);
            form.personnel.setValue(data.personnel);
            form.rmks.setValue(data.rmks);
        }, error => {
            console.log(error);
        });
    }
    onFocus(name) {
        if (this.addNewForm.controls[name].value === '') {
            this.addNewForm.controls[name].setValue('• ');
        }
    }

    save() {
        if (this.addNewForm.valid) {
            const obj = new SgReport();
            obj.desc = this.addNewForm.controls.desc.value;
            obj.acts = this.addNewForm.controls.acts.value;
            obj.personnel = this.addNewForm.controls.personnel.value;
            obj.date = this.parserFormatter.format(this.addNewForm.controls.date.value);
            obj.rmks = this.addNewForm.controls.rmks.value;
            this.reportService.addNew(obj).subscribe(data => {
                const id = data;
                if (id !== 0) {
                    this.saveConfirmation.show();
                    // do something after save
                    this.showReportList();

                    console.log(id);
                }
            }, error => {
                console.log(error);
            });
        }

    }
    showReportList() {
        this.show_read_all_report_html.emit({
            title: ''

        });
    }
    onKeyup(event, name) {
        const keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            let value = '';
            value = this.addNewForm.controls[name].value;
            this.addNewForm.controls[name].setValue(value += '• ');
        }
        const txtval = this.addNewForm.controls[name];
        if (txtval.value.substr(txtval.value.length - 1) === '\n') {
            this.addNewForm.controls[name].setValue(txtval.value.substring(0, txtval.value.length - 1));
        }
    }
    cancel() {
        // tell the parent component (AppComponent)
        this.show_read_all_report_html.emit({
            title: ''

        });
    }
}
