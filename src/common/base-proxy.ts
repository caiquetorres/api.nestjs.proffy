export class BaseProxy<TModel> {
    constructor(partial: Partial<TModel>) {
        Object.assign(this, partial)
    }
}
