import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';

@Component({
	selector: 'app-search-country',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './search-country.component.html',
	styleUrl: './search-country.component.css',
})
export class SearchCountryComponent {
	countries: Country[] = [];

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
}
