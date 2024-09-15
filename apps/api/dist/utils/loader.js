"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const tslib_1 = require("tslib");
const dataloader_1 = tslib_1.__importDefault(require("dataloader"));
class Loader {
    constructor(fetcher, notFoundData) {
        this.fetcher = fetcher;
        this.notFoundData = notFoundData;
        const batchLoadFn = async (ids) => {
            return this.batchIds(ids);
        };
        const options = {
            cacheKeyFn: (id) => id.toString(),
        };
        this.dataLoader = new dataloader_1.default(batchLoadFn, options);
    }
    async batchIds(ids) {
        const data = await this.fetcher.listByKeys([...ids]);
        const orderedData = ids.map((id) => {
            const result = this.findByKey(data, id);
            if (result === undefined) {
                return this.returnDefault(id);
            }
            return result;
        });
        return orderedData;
    }
    // In the instance that the key is not the id, this method can be overridden to update the key with the correct value
    returnDefault(id) {
        return { ...this.notFoundData, id };
    }
    // // In the instance that the key is not the id, this method can be overridden to point to a different key
    findByKey(data, id) {
        return data.find((d) => d.id.toString() === id.toString());
    }
    async loadMany(ids) {
        const result = await this.dataLoader.loadMany(ids);
        if (result.some((e) => e instanceof Error)) {
            throw new Error(result
                .filter((e) => e instanceof Error)
                .map((e) => e.message)
                .join(','));
        }
        return result;
    }
    async load(id) {
        const result = await this.dataLoader.load(id);
        if (result instanceof Error) {
            throw new Error(result.message);
        }
        return result;
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map