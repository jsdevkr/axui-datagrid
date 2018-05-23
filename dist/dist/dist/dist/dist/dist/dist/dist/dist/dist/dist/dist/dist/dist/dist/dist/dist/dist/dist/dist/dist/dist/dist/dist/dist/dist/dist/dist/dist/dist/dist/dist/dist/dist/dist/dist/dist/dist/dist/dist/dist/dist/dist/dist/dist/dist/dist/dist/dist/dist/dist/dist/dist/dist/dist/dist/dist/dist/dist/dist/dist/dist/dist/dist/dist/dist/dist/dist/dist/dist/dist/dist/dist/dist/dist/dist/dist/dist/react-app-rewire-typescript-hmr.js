var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
var path = require('path');
var tsLoaderMatcher = function (rule) {
    // return rule.loader && rule.loader.indexOf(`ts-loader${path.sep}`) !== -1;
    return rule.test && rule.test.toString() === /\.(ts|tsx)$/.toString();
};
var getLoader = function (rules, matcher) {
    var loader;
    rules.some(function (rule) {
        return (loader = matcher(rule)
            ? rule
            : getLoader(rule.use || rule.oneOf || [], matcher));
    });
    return loader;
};
var getTsLoader = function (rules) {
    return getLoader(rules, tsLoaderMatcher);
};
module.exports = function (config, env, babelPlugins) {
    if (babelPlugins === void 0) {
        babelPlugins = [];
    }
    if (env === 'production')
        return config;
    var tsLoader = getTsLoader(config.module.rules);
    if (!tsLoader) {
        console.log('ts-loader not found');
        return config;
    }
    if (tsLoader.loader) {
        if (!tsLoader.use)
            tsLoader.use = [];
        tsLoader.use.push(tsLoader.loader);
        delete tsLoader.loader;
    }
    // Replace loader with array of loaders with  use: []
    tsLoader.use = [
        {
            loader: require.resolve('babel-loader'),
            options: {
                cacheDirectory: true,
                plugins: __spread(['react-hot-loader/babel'], babelPlugins),
            },
        },
        {
            loader: require.resolve('ts-loader'),
            options: {
                transpileOnly: true,
                configFile: 'tsconfig.dev.json',
            },
        },
    ];
    return config;
};
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map
//# sourceMappingURL=react-app-rewire-typescript-hmr.js.map