const { redirect } = require("next/dist/server/api-utils");
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // async redirects() {
  //   return [];
  // },
};
