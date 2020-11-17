
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // this @fullman/postcss-purgecss is what we need in order to get rid of all the css im not using in the css file that MiniCssExtractPlugin.loader creates !! 
        // this speeds up my page by not having to load all the tailwind css attributes 

        // add this to line below to line 11 to set up purge for PRODUCTION build only after purge know what classes you will be using. currently purge will run after anychange even in production
        // process.env.NODE_ENV ==='production &&
        require('@fullhuman/postcss-purgecss')({
            content: [
                // list of all files that contain html files for our projects 
                './src/index.html'
            ],
            // this is the regex so purgecss knows what classes from tailwindcss to look for 
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })

]
};