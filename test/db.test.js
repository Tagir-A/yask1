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
const eventQuery = JSON.stringify({
    query: '{event(id: 1) {title}}'
   })
const eventsQuery = JSON.stringify({
    query: '{events {title}}'
   })
const roomQuery = JSON.stringify({
    query: '{room(id: 1) {title}}'
   })
const roomsQuery = JSON.stringify({
    query: '{rooms {title}}'
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
    test('should return event',async () => {
        expect.assertions(3)
        const {status, success, data} = await testDB(eventQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.event.title).toEqual('ШРИ 2018 - начало')
    });
    test('should return events', async () => {
        expect.assertions(6)
        const { status, success, data } = await testDB(eventsQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.events.length).toEqual(3)
        data.events.forEach((event, i) => {
            expect(event.title).toEqual(utils.originalEvents[i])
        })
    });
    test('should return room',async () => {
        expect.assertions(3)
        const {status, success, data} = await testDB(roomQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.room.title).toEqual('404')
    });
    test('should return rooms', async () => {
        expect.assertions(8)
        const { status, success, data } = await testDB(roomsQuery)
        expect(status).toEqual(200)
        expect(success).toEqual(true)
        expect(data.rooms.length).toEqual(5)
        data.rooms.forEach((room, i) => {
            expect(room.title).toEqual(utils.originalRooms[i])
        })
    });
});