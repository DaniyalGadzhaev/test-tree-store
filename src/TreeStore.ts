type Item = {
    id: string | number;
    parent: string | number;
    type?: string | null;
};

export class TreeStore {
    private items: Item[];
    private itemsById: Map<string | number, Item>;
    private childrenByParent: Map<string | number, Item[]>;

    constructor(items: Item[]) {
        this.items = items;
        this.itemsById = new Map();
        this.childrenByParent = new Map();

        for (const item of items) {
            this.itemsById.set(item.id, item);
            if (!this.childrenByParent.has(item.parent)) {
                this.childrenByParent.set(item.parent, []);
            }
            this.childrenByParent.get(item.parent)?.push(item);
        }
    }

    getAll(): Item[] {
        return this.items;
    }

    getItem(id: string | number): Item | undefined {
        return this.itemsById.get(id);
    }

    getChildren(id: string | number): Item[] {
        return this.childrenByParent.get(id) || [];
    }

    getAllChildren(id: string | number): Item[] {
        const result: Item[] = [];
        const stack: Item[] = this.getChildren(id);
    
        while (stack.length) {
            const current = stack.pop()!;
            result.push(current);
            stack.push(...this.getChildren(current.id));
        }
    
        return result.sort((a, b) => (a.id > b.id ? 1 : -1));
    }

    getAllParents(id: string | number): Item[] {
        const result: Item[] = [];
        let current = this.getItem(id);

        while (current && current.parent !== 'root') {
            current = this.getItem(current.parent);
            if (current) {
                result.push(current);
            }
        }

        return result;
    }
}
