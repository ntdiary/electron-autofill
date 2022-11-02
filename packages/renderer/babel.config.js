const assumptions = {
  "setPublicClassFields": true
};

const plugins = [
  ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}],
  ["@babel/plugin-proposal-class-properties"],
];

const presets = ["@babel/preset-typescript"]

export default {
  assumptions,
  plugins,
  presets,
}
