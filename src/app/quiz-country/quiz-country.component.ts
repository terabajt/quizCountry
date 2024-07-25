import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country';

@Component({
	selector: 'app-quiz-country',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './quiz-country.component.html',
	styleUrl: './quiz-country.component.css',
})
export class QuizCountryComponent implements OnInit {
	@ViewChild('countryName') countryName!: ElementRef;

	currentCountry!: Country;
	constructor(private countriesService: CountriesService) {}

	ngOnInit() {
		this.getRandomCountry();
	}

	getRandomCountry() {
		this.countriesService.getRandomCountry().subscribe((data: any) => {
			this.currentCountry = {
				name: data.name.common,
				flag: data.flag,
				population: data.population,
			};
		});
	}
	onRandomCountry() {
		this.getRandomCountry();
	}
	onCheckCountry() {
		const countryName = this.countryName.nativeElement.value;
		if (countryName === this.currentCountry.name) {
			alert('Gratulacje! Udzieliłeś poprawnej odpowiedzi!');
			this.getRandomCountry();
			this.countryName.nativeElement.value = '';
		} else {
			alert('Spróbuj ponownie albo wybierz inną flagę.');
		}
	}
}
