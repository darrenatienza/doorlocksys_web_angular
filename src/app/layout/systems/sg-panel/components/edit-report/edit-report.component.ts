import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReportService, SgReport } from '../../../../../shared';

@Component({
    selector: 'app-edit-report',
    templateUrl: './edit-report.component.html',
    styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
    form: FormGroup;

    @Input() reportID;
    @Output() show_read_all_report_html = new EventEmitter();
    detail = {};
    constructor(formBuilder: FormBuilder,
        private parserFormatter: NgbDateParserFormatter, private reportService: ReportService) {
        this.form = formBuilder.group({
            date: ['', Validators.required],
            desc: ['', Validators.required],
            acts: ['', Validators.required],
            personnel: ['', Validators.required],
            rmks: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.loadDetails();
    }
    loadDetails() {
        this.reportService.getDetails(this.reportID).subscribe(data => {
            this.form.patchValue({

                date: this.parserFormatter.parse(data.date),
                desc: data.desc,
                acts: data.acts,
                personnel: data.personnel,
                rmks: data.rmks,
            });
        }
            , error => console.log(error));
    }
    save() {
        const obj = new SgReport();
        obj.desc = this.form.controls.desc.value;
        obj.acts = this.form.controls.acts.value;
        obj.personnel = this.form.controls.personnel.value;
        obj.date = this.parserFormatter.format(this.form.controls.date.value);
        obj.rmks = this.form.controls.rmks.value;
        this.reportService.update(this.reportID, obj).subscribe(data => { console.log(data); this.cancel(); }, error => console.log(error));
    }

    onFocus(name) {
        if (this.form.controls[name].value === '') {
            this.form.controls[name].setValue('• ');
        }
    }

    onKeyup(event, name) {
        const keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            let value = '';
            value = this.form.controls[name].value;
            this.form.controls[name].setValue(value += '• ');
        }
        const txtval = this.form.controls[name];
        if (txtval.value.substr(txtval.value.length - 1) === '\n') {
            this.form.controls[name].setValue(txtval.value.substring(0, txtval.value.length - 1));
        }
    }
    cancel() {
        // tell the parent component (AppComponent)
        this.show_read_all_report_html.emit({
            title: ''
        });
    }

}
