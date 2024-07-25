import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CountriesService {
	constructor(private http: HttpClient) {}

	getCountriesByName(name: string) {
		return this.http.get(`https://restcountries.com/v3.1/name/${name}`);
	}
	getRandomCountry() {
		return this.http.get(`https://restcountries.com/v3.1/all`).pipe(
			map((countries: any[]) => {
				const randomIndex = Math.floor(Math.random() * countries.length);
				return countries[randomIndex];
			}) as OperatorFunction<Object, any>
		);
	}
}
