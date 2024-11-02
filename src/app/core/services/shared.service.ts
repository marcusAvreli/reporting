import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class SharedService {

    messageSource: BehaviorSubject<any|null> = new BehaviorSubject<any | null>(null);

    constructor() { }
}