<div align="center">
  <img
    src="https://raw.githubusercontent.com/grafana/scenes/main/docusaurus/website/static/img/logo.svg"
    alt="Grafana Logo"
    width="100px"
    padding="40px"
  />
  <h1>@grafana-ml/scenes-ml</h1>
  <p>Add Machine Learning functionality to your Scenes.</p>
</div>

## What is this?

This library contains a collection of `@grafana/scenes` objects which can be added to your Scenes to run interactive, responsive machine learning algorithms directly in the browser.

`@grafana-ml/scenes-ml` currently contains implementations of the following:

- forecasting (using the MSTL/ETS algorithms)
- outlier detection (using the median absolute difference or DBSCAN algorithms)
- changepoint detection (using either Bayesian Online Changepoint Detection or Autoregressive Gaussian Process Changepoint Detection)

Under the hood, the heavy lifting is largely powered by the [`augurs`][augurs] library, which runs inside WebAssembly.
See that library for more information on the underlying algorithms.

## Usage

See the [library README](./packages/scenes-ml/README.md) for usage documentation.

`@grafana-ml/scenes-ml` is designed to be used in Grafana app plugins or Grafana core as a standard npm dependency. However, because of the WASM module in a dependency, a couple of changes are required to an app plugin's build process.

1. Run `npm set @grafana-ml:registry=https://us-npm.pkg.dev/grafanalabs-dev/ml-npm-dev/` to tell `npm` to use a custom registry to find `scenes-ml`.
1. Run `npx google-artifactregistry-auth` and follow the instructions to authenticate with the custom npm registry.
1. Install `@grafana-ml/scenes-ml` using `yarn add @grafana-ml/scenes-ml` or `npm install @grafana-ml/scenes-ml` to add `scenes-ml` to your dependencies.
1. Update your plugin's webpack config to enable the `asyncWebAssembly` experiment option:

   ```typescript
   // in webpack.config.ts, alongside your package.json
   import type { Configuration } from 'webpack';
   import { merge } from 'webpack-merge';
   import { getPluginId } from './.config/webpack/utils';
   import grafanaConfig from './.config/webpack/webpack.config';

   const config = async (env): Promise<Configuration> => {
     const baseConfig = grafanaConfig(env);
     return merge(baseConfig, {
       experiments: {
         // Required to load WASM modules.
         asyncWebAssembly: true,
       },
     });
   };

   export default config;
   ```

## Development

To work on `@grafana-ml/scenes-ml`, please follow the guides below.

### Setting up local version of `@grafana-ml/scenes-ml` with an app plugin

1. Run `YARN_IGNORE_PATH=1 yarn link` from `packages/scenes-ml` directory.
1. Run `yarn dev` from `packages/scenes-ml` directory.
1. Run `yarn link @grafana-ml/scenes-ml` from app plugin directory.
1. Start app plugin development server.

### Demo app

Alternatively, use the [demo app](./packages/scenes-ml-app/README.md) included in this repository.

[augurs]: https://github.com/grafana/augurs
