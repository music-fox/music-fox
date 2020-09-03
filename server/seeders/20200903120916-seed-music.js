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
         musicUrl: `<iframe src="https://open.spotify.com/embed/track/4ecVWqbtW6phQGpZMAyqIU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        musicUrl: `<iframe src="https://open.spotify.com/embed/track/6TqXcAFInzjp0bODyvrWEq" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
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
