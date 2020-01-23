export class ListModel {
    public id: number;
    public name: string;
    public isSelected: boolean;

    public constructor(fields?: Partial<ListModel>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
