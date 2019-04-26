# Website for KnoxCCL

Files for the Citizens' Climate Lobby chapter site in Knoxville, TN. Visit the
website at [knoxccl.org](http://knoxccl.org).

I use WebPack to bundle JavaScript libraries for the page, and Google's Workbox utility to
generate the `service-worker.js` file. Execute the followingcommands to deploy:
 
    npx webpack --mode=production
    workbox generateSW workbox-config.js

Note: the `test-server.sh` runs these 2 commands for you.

Now, `dist/index.js` and `service-worker.js` will be up to date with the source code. If
satisfied, then this is a good time to `git commit` and `git push`. The following command will
push the files to AWS Simple Storage Service:

    ./sync-s3.sh

The script is not in the Git repository, since it has some bucket info I don't want to
publicize. It will tell you what you need to do to create the appropriate invalidations on
CloudFront. In order to make sure that users always pull up the latest site version:

* It is very important that whenever `index.html` changes, to invalidate both `/` and
  `/index.html`.
* The `service-worker.js` file needs to be updated (see above), copied to S3 (sometimes the
  sync script fails to do this, so an `aws s3 cp` command must be done), and invalidated for
  pretty much any site changes.

## Whenever an update is made to the web site...

Make sure to update (or have someone else update) in these other places, too, where
appropriate.

* [Facebook](https://www.facebook.com/Citizens-Climate-Lobby-Knoxville-Chapter-159872501112806/)
* [Meetup.com](https://www.meetup.com/Citizens-Climate-Lobby-Knoxville/)
* [Google Calendar](https://calendar.google.com/calendar?cid=NWtnc2w2aGl0OG4wMDJraGd0bTVpaW9wazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)
* [Slack](https://knoxccl.slack.com/)
* [Google Group](https://groups.google.com/forum/#!forum/knoxccl)
