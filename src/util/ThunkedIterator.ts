/**
 * An iterator implementation for (thunks)[https://en.wikipedia.org/wiki/Thunk]
 * This is especially useful for dynamic user statuses.
 */
export class ThunkedIterator<T> {
	values: Iterator<T>;

	constructor(arr: Array<() => T>) {
		this.values = ThunkedIterator.cycleThunk(arr);
	}

	next(): IteratorResult<T> {
		return this.values.next();
	}

	private static* cycleThunk<U>(arr: Array<(() => U)>): Generator<U, void, void> {
		while (true) {
			for (const item of arr) {
				yield item();
			}
		}
	};
}
