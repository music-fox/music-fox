'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
     "Music",
     [
       {
         musicUrl: `https://open.spotify.com/embed/track/4ecVWqbtW6phQGpZMAyqIU`,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        musicUrl: `https://open.spotify.com/embed/track/6TqXcAFInzjp0bODyvrWEq`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ],
     {}
   )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Music", null, {})
  }
};
