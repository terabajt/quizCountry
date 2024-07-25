import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Country } from './models/country';
import { CountriesService } from './services/countries.service';
import { CommonModule } from '@angular/common';
import { QuizCountryComponent } from './quiz-country/quiz-country.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, QuizCountryComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'restCountriesFrontend';
	countries: Country[] = [];
	loading = true;
	mode = 'search';

	constructor(private country: CountriesService) {}

	onSearchChange(searchValue: string): void {
		this.country.getCountriesByName(searchValue).subscribe((data: any) => {
			this.countries = data.map((country: any) => ({
				name: country.name.common,
				flag: country.flag,
				population: country.population,
			}));
			console.log(this.countries);
		});
	}

	onSortChange(sortValue: string): void {
		if (sortValue === 'ascName') {
			this.countries.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortValue === 'descName') {
			this.countries.sort((a, b) => b.name.localeCompare(a.name));
		} else if (sortValue === 'ascPopulation') {
			this.countries.sort((a, b) => a.population - b.population);
		} else if (sortValue === 'descPopulation') {
			this.countries.sort((a, b) => b.population - a.population);
		}
	}
	getCurrentMode() {
		return this.mode;
	}
	setCurrentMode(mode: string) {
		this.mode = mode;
	}
}
