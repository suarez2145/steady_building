const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        // specifies where i want the output new generated css file to go and name 
        filename: 'js/bundle.js'
    },

    
    devServer: {
        // folder from which webpack should serve our files 
        contentBase: './dist'
    },
    plugins: [
        // this  inserts the js.bundle script in our index.html and  copies our src index.html file into the dist folder
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // this is the starting file we want to use and copy 
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            // specifies where i want the output new generated css file to go and name 
            filename: "css/main.css",
        }),

    ],
    module: {
        rules: [
            { 
                // this 'test' property - tests all the files that end with .js to find the javascript files and 
                // then the 'use' property tells webpack to use babel-loader to convert to es5 from es6 
                // which we configure in the babel config file
                test: /\.js$/,
                // this "excludes" tells webpack to not test any files in the node_modules folder 
                // because there are thousands of files and its not neccesary for our production code.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },


            },
            
            



            {
                test: /\.css$/, 
                exclude: /node_modules/,
                use: [
                    // replaced styleloader with MiniextractPlugin.loader because it loads faster Asynchronously and styleloader gives client page a lag  
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader', options: {importLoaders: 1}
                    },
                    'postcss-loader'
                ],

            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/,
                exclude: /node_modules/,
            }),
        ],
        },

}; 