import { User, UserStore } from '../../models/users'
const store = new UserStore()
describe("user Model", () => {
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
 it('create method should add a user', async () => {
    const result = await store.create({
      id: 1,
      first_name: 'Adam',
      last_name: 'Ali',
      balance: 156512,
      email: 'adamali@123',
      password: 'passwordadam'
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'Adam',
      last_name: 'Ali',
      balance: 156512,
      email: 'adamali@123',
      password: 'passwordadam'
    });
  });
  it('index method should return a list of user', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      first_name: 'Adam',
      last_name: 'Ali',
      balance: 156512,
      email: 'adamali@123',
      password: 'passwordadam'
    }]);
  });
  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      first_name: 'Adam',
      last_name: 'Ali',
      balance: 156512,
      email: 'adamali@123',
      password: 'passwordadam'
    });
  });
  it('delete method should remove the user', async () => {
    store.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });
});