module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists, and add it if not
    const tableDescription = await queryInterface.describeTable(
      "Notifications"
    );
    if (!tableDescription.createdAt) {
      await queryInterface.addColumn("Notifications", "CreatedAt", {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Only remove the column if it exists
    const tableDescription = await queryInterface.describeTable(
      "Notifications"
    );
    if (tableDescription.createdAt) {
      await queryInterface.removeColumn("Notifications", "CreatedAt");
    }
  },
};
