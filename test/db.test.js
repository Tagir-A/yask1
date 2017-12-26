import { tester } from 'graphql-tester';
import * as utils from './constants'

const testDB = tester({
    url: 'http://localhost:3000/graphql/',
    contentType: "application/json"
})
const userQuery = JSON.stringify({
    query: '{user(id: 1) {login}}'
   })
const usersQuery = JSON.stringify({
    query: '{users {login}}'
   })

test('tests config', () => {
        expect(true).toEqual(true);
});
describe('test db creation', () => {
    test('should return user',async () => {
        expect.assertions(3)
        const {status, success, data} = await testDB(userQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.user.login).toEqual('veged')
    });
    test('should return users', async () => {
        expect.assertions(6)
        const { status, success, data } = await testDB(usersQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.users.length).toEqual(3)
        data.users.forEach((user, i) => {
            expect(user.login).toEqual(utils.originalLogins[i])
        })
    });
});