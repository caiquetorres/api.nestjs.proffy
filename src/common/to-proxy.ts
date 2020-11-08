export interface ToProxy<TProxy> {
    toProxy(...params: unknown[]): TProxy
}
