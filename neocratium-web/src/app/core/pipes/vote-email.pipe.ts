import { Pipe, PipeTransform } from '@angular/core';
import { VoteService } from './../../shared/services/vote.service';
import { map } from 'rxjs/operators';

@Pipe({
	name: 'voteEmail'
})
export class VoteEmailPipe implements PipeTransform {
	email;
	constructor(private voteService: VoteService) {}
	transform(value: any, args?: any): any {
		return this.voteService.getUserName(value).map(arr => {
			this.email = arr.map((v: any) => v.email);
			return this.email;
		});
	}
}
