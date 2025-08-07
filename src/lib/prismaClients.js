const { PrismaClient } = require("@prisma/client");

const clients = {};

const regionEnvMap = {
  japan: "JP_DATABASE_URL",
  vietnam: "VN_DATABASE_URL",
};

function getPrismaClient(region) {
  const regionKey = regionEnvMap[region] ? region : "japan";

  if (!clients[regionKey]) {
    const dbUrl = process.env[regionEnvMap[regionKey]];
    if (!dbUrl) {
      throw new Error(`Missing DB URL for region: ${regionKey}`);
    }

    clients[regionKey] = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }

  return clients[regionKey];
}

module.exports = {
  getPrismaClient,
};
