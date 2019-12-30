// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        elevate: path.resolve(__dirname, "./src/view/elevate/main.ts")
    },
    watch: true,
    output: {
        path: path.join(__dirname, "public", "server"),
        filename: "[name].app.js",
        chunkFilename: "[name].app.js"
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            contracts: path.resolve(__dirname, "src/contracts/"),
            client: path.resolve(__dirname, "src/view/client/"),
            commons: path.resolve(__dirname, "src/commons/")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [
                    path.resolve(__dirname, "./src/view")
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    context: __dirname,
                    configFile: require.resolve("./tsconfig.webpack.json")
                },
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    "sass-loader"
                ],
            }, {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                    }
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}
