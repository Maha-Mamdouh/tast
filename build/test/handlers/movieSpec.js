"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movies_1 = require("../../models/movies");
const store = new movies_1.MovieStore();
describe("movie Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a movie', async () => {
        const result = await store.create({
            id: 1,
            name: 'the west wing',
            release_date: '5/12'
        });
        expect(result).toEqual({
            id: 1,
            name: 'the west wing',
            release_date: '5/12'
        });
    });
    it('index method should return a list of movie', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: 'the west wing',
                release_date: '5/12'
            }]);
    });
    it('show method should return the correct movie', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'the west wing',
            release_date: '5/12'
        });
    });
    it('delete method should remove the movie', async () => {
        store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
