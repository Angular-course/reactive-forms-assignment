import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    signupForm: FormGroup;
    submitted = false;
    projectStatus = ['Stable', 'Critical', 'Finished'];
    projectData = {
        projectName: '',
        email: '',
        projectStatus: ''
    };

    ngOnInit() {
        this.signupForm = new FormGroup({
            // the following has the normal custom validator
            // 'projectName': new FormControl(null, [Validators.required, this.forbiddenName]),
            'projectName': new FormControl(null, Validators.required, this.forbiddenName),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'projectStatus': new FormControl('Stable')
        });
    }

    onSubmit() {
        this.projectData.projectName = this.signupForm.value.projectName;
        this.projectData.email = this.signupForm.value.email;
        this.projectData.projectStatus = this.signupForm.value.projectStatus;
        this.submitted = true;
        this.signupForm.reset();
    }

    // normal custom validator
    /*forbiddenName = (control: FormControl): { [s: string]: boolean } => {
        if (control.value === 'Test') {
            return {'isForbiddenProjectName': true};
        }
        return null;
    }*/

    // custom asynchronous validator
    forbiddenName = (control: FormControl): Promise<any> | Observable<any> => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test') {
                    resolve({'isForbiddenProjectName': true});
                }
                resolve(null);
            }, 1500);
        });
        return promise;
    }
}
