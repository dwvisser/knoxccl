# Website for KnoxCCL

Files for the Citizens' Climate Lobby chapter site in Knoxville, TN. Visit the
website at [knoxccl.org](http://knoxccl.org).

I use Google's Workbox utility to generate the `service-worker.js` file. Execute the following
commands to deploy:

    workbox generateSW workbox-config.js

This will update the `service-worker.js` file.

    ./sync-s3.sh

Not in repo, since it has some bucket info I don't want to publicize. It will tell you
what you need to do to create the appropriate invalidations on CloudFront.