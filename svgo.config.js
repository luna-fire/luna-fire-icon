const { extendDefaultPlugins } = require("svgo");

const COMMON_PREFIX = "luna-fire";

// https://github.com/svg/svgo/blob/master/plugins/prefixIds.js#L160-L167
const getBasename = (path) => {
  // extract everything after latest slash or backslash
  const matched = path.match(/[/\\]([^/\\]+)$/);
  if (matched) {
    return matched[1];
  }
  return "";
};

module.exports = {
  plugins: extendDefaultPlugins([
    {
      name: "prefixIds",
      params: {
        prefix: (node, extra) => {
          if (!(extra && extra.path && extra.path.length > 0)) {
            throw new Error("svg file path is invalid");
          }

          const filename = getBasename(extra.path);
          return `${COMMON_PREFIX}-${filename}`;
        },
      },
    },
  ]),
};
