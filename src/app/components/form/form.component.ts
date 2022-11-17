import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  value: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      formNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(Number.MAX_SAFE_INTEGER),
          Validators.minLength(Number.MAX_SAFE_INTEGER),
        ],
      ],
      earthNumber: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  form: FormGroup;

  onSubmit() {
    let phoneNumber = this.form.value.phone.replace(/\D/g, '');
    let areaNumber = this.form.value.phone.replace(/\D/g, '');

    this.value = {
      formNumber: this.form.value.formNumber,
      areaNumber,
      phoneNumber,
    };
  }

  ngOnInit() {}
}
