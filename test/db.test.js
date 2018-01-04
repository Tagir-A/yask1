import { tester } from 'graphql-tester';
import * as utils from './constants';
import * as mutations from './mutations';

const testDB = tester({
  url: 'http://localhost:3000/graphql/',
  contentType: 'application/json'
});
const userQuery = JSON.stringify({
  query: '{user(id: 1) {login}}'
});
const usersQuery = JSON.stringify({
  query: '{users {login}}'
});
const eventQuery = JSON.stringify({
  query: '{event(id: 1) {title}}'
});
const eventsQuery = JSON.stringify({
  query: '{events {title}}'
});
const roomQuery = JSON.stringify({
  query: '{room(id: 1) {title}}'
});
const roomsQuery = JSON.stringify({
  query: '{rooms {title}}'
});

test('tests config', () => {
  expect(true).toEqual(true);
});
describe('test db creation', () => {
  test('should return user', async () => {
    expect.assertions(3);
    const {status, success, data} = await testDB(userQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.user.login).toEqual('veged');
  });
  test('should return users', async () => {
    expect.assertions(6);
    const { status, success, data } = await testDB(usersQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.users.length).toEqual(3);
    data.users.forEach((user, i) => {
      expect(user.login).toEqual(utils.originalLogins[i]);
    });
  });
  test('should return event', async () => {
    expect.assertions(3);
    const {status, success, data} = await testDB(eventQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.event.title).toEqual('ШРИ 2018 - начало');
  });
  test('should return events', async () => {
    expect.assertions(6);
    const { status, success, data } = await testDB(eventsQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.events.length).toEqual(3);
    data.events.forEach((event, i) => {
      expect(event.title).toEqual(utils.originalEvents[i]);
    });
  });
  test('should return room', async () => {
    expect.assertions(3);
    const {status, success, data} = await testDB(roomQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.room.title).toEqual('404');
  });
  test('should return rooms', async () => {
    expect.assertions(8);
    const { status, success, data } = await testDB(roomsQuery);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.rooms.length).toEqual(5);
    data.rooms.forEach((room, i) => {
      expect(room.title).toEqual(utils.originalRooms[i]);
    });
  });
});
describe('test db mutations', () => {
  test('should create user', async () => {
    expect.assertions(3);
    const { status, success, data } = await testDB(mutations.createUser);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.createUser.login).toEqual('lakuka');
  });
  test('should update user', async () => {
    expect.assertions(3);
    const { status, success, data } = await testDB(mutations.updateUser);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.updateUser.login).toEqual('lakukaracha');
  });
  test('should remove user', async () => {
    expect.assertions(4);
    const { status: mStatus, success: mSuccess, data: mData } = await testDB(mutations.removeUser);
    const { data } = await testDB(usersQuery);
    expect(mStatus).toEqual(200);
    expect(mSuccess).toEqual(true);
    expect(mData.removeUser.login).toEqual('lakukaracha');
    expect(data.users.length).toEqual(3);
  });
  test('should create room', async () => {
    expect.assertions(3);
    const { status, success, data } = await testDB(mutations.createRoom);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.createRoom.title).toEqual('Roomka');
  });
  test('should update room', async () => {
    expect.assertions(3);
    const { status, success, data } = await testDB(mutations.updateRoom);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.updateRoom.title).toEqual('Beef');
  });
  test('should remove room', async () => {
    expect.assertions(4);
    const { status: mStatus, success: mSuccess, data: mData } = await testDB(mutations.removeRoom);
    const { data } = await testDB(roomsQuery);
    expect(mStatus).toEqual(200);
    expect(mSuccess).toEqual(true);
    expect(mData.removeRoom.title).toEqual('Beef');
    expect(data.rooms.length).toEqual(5);
  });
  test('should create event', async () => {
    expect.assertions(5);
    const { status, success, data } = await testDB(mutations.createEvent);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.createEvent.title).toEqual('Evento');
    expect(data.createEvent.room.title).toEqual('Деньги');
    expect(data.createEvent.users.length).toEqual(2);
  });
  test('should update event', async () => {
    expect.assertions(3);
    const { status, success, data } = await testDB(mutations.updateEvent);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.updateEvent.title).toEqual('Eventos');
  });
  test('should remove user from event', async () => {
    expect.assertions(4);
    const { status, success, data } = await testDB(mutations.removeUserFromEvent);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.removeUserFromEvent.title).toEqual('Eventos');
    expect(data.removeUserFromEvent.users.length).toEqual(1);
  });
  test('should add user to event', async () => {
    expect.assertions(4);
    const { status, success, data } = await testDB(mutations.addUserToEvent);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.addUserToEvent.title).toEqual('Eventos');
    expect(data.addUserToEvent.users.length).toEqual(2);
  });
  test('should change event room', async () => {
    expect.assertions(4);
    const { status, success, data } = await testDB(mutations.changeEventRoom);
    expect(status).toEqual(200);
    expect(success).toEqual(true);
    expect(data.changeEventRoom.title).toEqual('Eventos');
    expect(data.changeEventRoom.room.title).toEqual('404');
  });
  test('should remove event', async () => {
    expect.assertions(4);
    const { status: mStatus, success: mSuccess, data: mData } = await testDB(mutations.removeEvent);
    const { data } = await testDB(eventsQuery);
    expect(mStatus).toEqual(200);
    expect(mSuccess).toEqual(true);
    expect(mData.removeEvent.title).toEqual('Eventos');
    expect(data.events.length).toEqual(3);
  });
});
