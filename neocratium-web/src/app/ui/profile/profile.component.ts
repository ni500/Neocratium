import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	email: string;
	emailSent = false;

	emailFormControl = new FormControl(this.email, [Validators.required, Validators.email]);

	errorMessage: string;

	matcher = new MyErrorStateMatcher();

	constructor(public auth: AuthService, private router: Router) {}

	ngOnInit() {
		const url = this.router.url;
		this.auth.confirmSignIn(url);
	}

	async sendEmailLink(email) {
		console.log(email);
		console.log(this.email);
		try {
			await this.auth.sendEmailLink(email);
			this.emailSent = true;
		} catch (err) {
			this.errorMessage = err.message;
		}
	}

	contact() {
		window.open('mailto:nicolas@vaki.co');
	}
}
