'use strict';
let playerss = [{
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  firstName: 'Mike',
  lastName: 'Johnson',
  email: 'MikeJohn@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  firstName: 'Tom',
  lastName: 'Hilton',
  email: 'TOMHILTON@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  firstName: 'Jackie',
  lastName: 'Nik',
  email: 'jackNick@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
}
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('players', playerss);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('players', null, {});
  }
};
