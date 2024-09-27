import { Component, OnInit, inject, signal } from "@angular/core";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  standalone: true,
  imports: [DataViewModule,CommonModule, CardModule, ButtonModule, DialogModule, MessageModule, InputTextareaModule,ReactiveFormsModule],
})
export class ContactFormComponent  {
  contactForm: FormGroup;
  successMessage: boolean = false;
  contact = {
    email: '',
    message: ''
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Logic to send the contact message goes here
      this.successMessage = true;
      this.contactForm.reset();
    }
  }
}
