import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from './app.service';
import { ListModel } from './list.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    showContainer: boolean;
    inputValue: string;
    subscription: Subscription;
    items = [
        new ListModel({ id: 1, name: 'first item', isSelected: false }),
        new ListModel({ id: 2, name: 'second item', isSelected: false }),
        new ListModel({ id: 3, name: 'third item', isSelected: false })
    ];

    constructor(private service: AppService) { }

    ngOnInit(): void {
        this.subscription = this.service.showContainer$.subscribe(x => this.showContainer = x);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onItemClick(item: ListModel): void {
        item.isSelected = !item.isSelected;
    }

    onItemRemove(id: number): void {
        const index = this.items.findIndex(x => x.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    onItemCreate(): void {
        const maxExistingId = Math.max(...this.items.map(x => x.id), 0);
        this.items.push(new ListModel({ id: maxExistingId + 1, name: this.inputValue }));
    }

    onContainerToggle(): void {
        this.service.showContainer(!this.showContainer);
    }
}
