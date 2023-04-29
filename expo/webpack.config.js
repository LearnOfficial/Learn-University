const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["nativewind"],
      }
    },
    argv
  );
  // Customize the config before returning it.
  config.module.rules.push({
    test: /\.css$/i,
    use: ["postcss-loader"]
  });
  return config;
};
