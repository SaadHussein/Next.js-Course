const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "Mee",
        mongodb_password: "Saad2001..",
        mongodb_clustername: "clustertolearn",
        mongodb_database: "my-site",
      },
    };
  }

  return {
    env: {
      mongodb_username: "Mee",
      mongodb_password: "Saad2001..",
      mongodb_clustername: "clustertolearn",
      mongodb_database: "my-site",
    },
  };
};
