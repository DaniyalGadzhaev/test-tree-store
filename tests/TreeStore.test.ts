import { TreeStore } from '../src/TreeStore';

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

describe('TreeStore', () => {
    let ts: TreeStore;

    beforeEach(() => {
        ts = new TreeStore(items);
    });

    test('getAll() should return all items', () => {
        expect(ts.getAll()).toEqual(items);
    });

    test('getItem() should return correct item by id', () => {
        expect(ts.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
    });

    test('getChildren() should return direct children of an item', () => {
        expect(ts.getChildren(4)).toEqual([{ id: 7, parent: 4, type: null }, { id: 8, parent: 4, type: null }]);
        expect(ts.getChildren(5)).toEqual([]);
        expect(ts.getChildren(2)).toEqual([{ id: 4, parent: 2, type: 'test' }, { id: 5, parent: 2, type: 'test' }, { id: 6, parent: 2, type: 'test' }]);
    });

    test('getAllChildren() should return all descendants', () => {
        expect(ts.getAllChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
    });

    test('getAllParents() should return all ancestors', () => {
        expect(ts.getAllParents(7)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
    });
});
