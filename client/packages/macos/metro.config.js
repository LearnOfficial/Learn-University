/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


const { makeMetroConfig } = require("@rnx-kit/metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const path = require("path");

module.exports = makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  }
});
