

const createBitGetter = (array: Uint8Array) => {
    const errorText = (index: number, shiftIdx: number) => {
        if(shiftIdx > 7) {
            throw new Error("Index can't be more than 7");
        }

        if( index < 0 || index >= array.length) {
            throw new Error("The value doesn't exist on this index. Try another one");
        }
    }
    const get = (index: number, shiftIdx: number) => {
        errorText(index, shiftIdx)
        return Number((array[index] & (1 << shiftIdx)) !== 0);
    }

    const set = (index: number, shiftIdx: number, newValue: 1 | 0) => {
        errorText(index, shiftIdx)
        const resetBit = array[index] & ~(1 << shiftIdx);
        const setBit = array[index] | (1 << shiftIdx);
        array[index] = !!newValue ? setBit : resetBit;
        return undefined;
    }

    return { get, set }
}



const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));
console.log(bitGetter.get(0, 7)); // 1
console.log(bitGetter.get(1, 1)); // 0
console.log(bitGetter.set(0, 1, 0));
console.log(bitGetter.get(0, 1)); // 0
