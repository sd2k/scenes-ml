import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import grafanaConfig from './.config/webpack/webpack.config';

const config = async (env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);
  return merge(baseConfig, {
    experiments: {
      // Required to load WASM modules.
      asyncWebAssembly: true,
    },
    resolve: {
      fallback: {
        fs: false,
      },
    },
    module: {
      rules: [
        {
          test: /\@bsull\/augurs\/.*\.js$/,
          resolve: {
            fullySpecified: false
          }
        },
      ]
    },
  });
};

export default config;
