# trakstar-validations

The "public" folder contains resources like images and html/css as well as the manifest file. This is also where esbuild places the builds of the js files.

The "src" folder contains all the js originals.  Running esbuild will create a minified bundle and place these files in public/build

## Build the JS bundle
npm run build

## Testing
To install in firefox, open `about:debugging#/runtime/this-firefox` in the url bar, and click "Load Temporary Add On", then find the manifest.json file in the public folder and open it. Chrome should be the same idea, but I haven't setup it up yet.
When you make changes to the code, be sure to rebuild with esbuild, and then click "reload" on the temporary extension in firefox. Might be worth setting up an autobuild with watch.
