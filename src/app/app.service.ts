import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _showContainer = new Subject<boolean>();
    public readonly showContainer$ = this._showContainer.asObservable();

    public showContainer(value: boolean): void {
        this._showContainer.next(value);
    }
}
