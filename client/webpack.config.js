const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        // this is the entry point for files
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js',
            editor: './src/js/editor.js',
        },
        // this is the output for our bundles
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        // the plugin generates the html file
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'JATE',
            }),
            // this is the service worker plugin, it creates the service worker file
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js',
            }),
            // this is the manifest plugin, it creates the manifest.json file
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: 'JATE',
                short_name: 'JATE',
                description: 'Just another text editor',
                background_color: '#225ca3',
                theme_color: '#225ca3',
                start_url: './',
                publicPath: './',
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'),
                    },
                ],
            }),
        ],

        // this is the module that will handle the css and js files
        module: {
            // rules for the CSS and JS files
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    // this is the babel loader to transpile the js files
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                        },
                    },
                },
            ],
        },
    };
};
