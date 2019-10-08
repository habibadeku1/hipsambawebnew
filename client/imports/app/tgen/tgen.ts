import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MeteorObservable } from 'meteor-rxjs';

import { TGens } from '../../../../imports/collections/tgens';

import { Random } from 'meteor/random'




@Component({
  selector: 'tgen',
  templateUrl: "tgen.html"
})
export class TGenComponent implements OnInit {

  submitAttempt: boolean = false;

  addForm: FormGroup;

  acode;

  gcode;

  errman;

  emsg;

  pmsg;

  buttonsubmit;

  constructor(
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      pno: ['', Validators.compose([Validators.maxLength(11), Validators.required, Validators.pattern("[0-9]*")])]
    });

    this.buttonsubmit = false;

  }

  save() {

    MeteorObservable.subscribe('checkemailpno').subscribe(() => {


      this.submitAttempt = true;

      if (!this.addForm.valid) {

        this.errman = 'Oops, something went wrong, please check your email and phone number.'
        return;
      }
      else {

        if (TGens.collection.findOne({ pno: this.addForm.get(['pno']).value })) {
          this.errman = 'This Phone number is already registered.'
        }

        else if (TGens.collection.findOne({ email: this.addForm.get(['email']).value })) {
          this.errman = 'This Email is already registered.'
        }

        else {
          this.acode = Random.id(6).toUpperCase();

          MeteorObservable.call('genTickCode', this.addForm.get(['email']).value, this.addForm.get(['pno']).value, this.acode).subscribe({

            next: () => {


              this.gcode = this.acode;

              this.emsg = this.addForm.get(['email']).value;

              this.pmsg = this.addForm.get(['pno']).value;

              MeteorObservable.call('sendmail', this.emsg, this.gcode).subscribe({

                next: () => {}
              })

            },
            error: (e: Error) => {
              this.handleError(e);
            }
          });

        }



      }

    })


  }

  handleError(e: Error): void {

    console.error(e.message);

    console.error(e.stack);

  }


}

