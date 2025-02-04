# Website for KnoxCCL

Files for the Citizens' Climate Lobby chapter site in Knoxville, TN. Visit the
website at [knoxccl.org](http://knoxccl.org).

## Contributing

In general, work in feature branches in your own fork. When you are satisfied
with your changes, create a pull request requesting to merge to `master` on
[https://github.com/dwvisser/knoxccl](dwvisser/knoxccl). When the pull request
is accepted and merged, a new version of the website is automatically built and
deployed on GitHub Pages infrastructure.

## Development

This site's interface is powered by the following:

* [Bootstrap](https://getbootstrap.com/)
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* [Lazyload](https://github.com/tuupola/lazyload#readme)
* [Popper.js](https://popper.js.org/)
* [Dark-Mode-Toggle](https://github.com/googlechromelabs/dark-mode-toggle#readme)
* [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) functionality
  is implemented using [Workbox](https://developers.google.com/web/tools/workbox)

### Setup

1. Install [Node](https://nodejs.org/) v22. I like to use
   [fnm](https://fnm.vercel.app/) to accomplish this. If fnm is properly
   initialized in your shell environment, simply changing your working
   directory to the project root will result in fnm offering to install the
   correct version of Node, and setting your `PATH` to use it.
2. In the project root directory, run `npm ci` to install the environment
   specified in [package.json](package.json) and
   [package-lock.json](package-lock.json).
3. The next two commands will build and serve up a local version of the site:

   ```shell
   npm run build
   npm run serve
   ```

Further details are given in the next subsection.

### Guide

[NPM](https://docs.npmjs.com/about-npm/) and [WebPack](https://webpack.js.org)
are used to bundle JavaScript and CSS libraries for the page. There are several
`npm run` targets at your disposal:

* `clean` - Removes the *dist* build folder and its contents.
* `develop` - Build JS/CSS, including service-worker.js, with fewer optimizations
  for easier debugging.
* `build` - Same as 'develop', but optimizing for deployment.
* `serve` - Launches a local static content web server from the *dist* folder.

### Source Structure

* *.booststraprc* - Used to configure `bootstrap-loader` and include only what
  is needed by the site
* *.github/workflows/main.yml* - Specifies the GitHub Actions workflow for
  building the site.
* *.gitignore* - What files and folders Git should ignore.
* *package.json* - NPM dependencies, see
  [docs.npmjs.com](https://docs.npmjs.com/creating-a-package-json-file)
* *package-lock.json* - describes exact dependency installations at a point in
  time; see [docs.npmjs.com](https://docs.npmjs.com/files/package-lock.json)
* *postcss.config.js* - seems to be necessary for CSS loader, initially set to
  empty config
* *README.md* - this file
* *serve.sh* - Helpful script for launching a static HTTP server for local
  testing
* *src/* - Files that are processed by WebPack build processes to generate
  output in *dist/*.
* *src/index.js* - The WebPack entry point
* *static/* - Static content files that get copied, unmodified, by WebPack into
  *dist*.
* *webpack.config.js* - Defines the WebPack build process

In addition, these folders are generated when building the site and are
*.gitignore*'d:

* *dist/* - Where WebPack builds the working static site.
* *node_modules/* - Where all NPM dependences are placed

### How to Promote a Current Announcement Visually

In [newsletters.html](static/newsletters.html), there should be a single div
element at the top with the `id` attribute set to "splash_src". It also needs a
`data-expires` attribute set to an expiration date in YYYY-MM-DD format, and an
initial `style` attribute of "display:none". The JavaScript code will copy the
div contents to the top of the Home tab, and make sure it displays on the
Newsletters tab as well. Once the expiration date is passed, it will stay
invisible, and not be copied to the Home tab. **Important**: The `id` attribute
is supposed to be unique on the page, so make sure to remove it from any
previous announcements.

### Local Build and Test

Before creating a pull request, make sure to create a production build, and
serve it locally, as a final sanity check.

```shell
npm run clean
npm run build
```

The *dist* build folder will be removed by the first command, and re-built by
the second command. You can then test the built version of the site with:

```shell
npm run serve
```

The above command depends on having Python 3 installed (most Linux distributions
do). If the site is ready for deployment, commit the changes to Git.

```shell
git add […]
git commit
git push
```

Remember, while it is good to "backup" by pushing `develop` and feature
branches, only pushes to the `master` branch on the main repository will result
in the website being redeployed/updated.

## To Publicize Significant Site Changes…

Make sure to update (or have someone else update), where appropriate.

* [Facebook](https://www.facebook.com/Citizens-Climate-Lobby-Knoxville-Chapter-159872501112806/)
