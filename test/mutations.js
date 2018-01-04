export const createUser = JSON.stringify({
  query: 'mutation {createUser(input: {login: "lakuka", homeFloor: 2}) {id, login}}'
});
export const updateUser = JSON.stringify({
  query: 'mutation {updateUser(id: 4, input: {login: "lakukaracha", homeFloor: 2}) {id, login}}'
});
export const removeUser = JSON.stringify({
  query: 'mutation {removeUser(id: 4) {id, login}}'
});
export const createRoom = JSON.stringify({
  query: 'mutation {createRoom(input: {title: "Roomka", capacity: 2, floor: 69}) {id, title}}'
});
export const updateRoom = JSON.stringify({
  query: 'mutation {updateRoom(id: 6, input: {title: "Beef", capacity: 2, floor: 69}) {id, title}}'
});
export const removeRoom = JSON.stringify({
  query: 'mutation {removeRoom(id: 6) {id, title}}'
});
export const createEvent = JSON.stringify({
  query: 'mutation {createEvent(input: {title: "Evento", dateStart: "2018-01-04T11:16:39.935Z", dateEnd: "2018-01-04T12:16:39.935Z"}, usersIds: [1,2], roomId: 2) {id, title, users{login}, room{title}}}'
});
export const updateEvent = JSON.stringify({
  query: 'mutation {updateEvent(id: 4, input: {title: "Eventos", dateStart: "2018-01-04T11:16:39.935Z", dateEnd: "2018-01-04T12:16:39.935Z"}) {id, title}}'
});
export const removeUserFromEvent = JSON.stringify({
  query: 'mutation {removeUserFromEvent(id: 4, userId: 2) {id, title, users{login}}}'
});
export const addUserToEvent = JSON.stringify({
  query: 'mutation {addUserToEvent(id: 4, userId: 3) {id, title, users{login}}}'
});
export const changeEventRoom = JSON.stringify({
  query: 'mutation {changeEventRoom(id: 4, roomId: 1) {id, title, room{title}}}'
});
export const removeEvent = JSON.stringify({
  query: 'mutation {removeEvent(id: 4) {id, title}}'
});
