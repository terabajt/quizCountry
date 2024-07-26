import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Country } from './models/country';
import { CountriesService } from './services/countries.service';
import { CommonModule } from '@angular/common';
import { QuizCountryComponent } from './quiz-country/quiz-country.component';
import { SearchCountryComponent } from './search-country/search-country.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, QuizCountryComponent, SearchCountryComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'restCountriesFrontend';
	loading = true;
	mode = 'search';

	constructor(private country: CountriesService) {}

	getCurrentMode() {
		return this.mode;
	}
	setCurrentMode(mode: string) {
		this.mode = mode;
	}
}
