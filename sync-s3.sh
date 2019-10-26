#!/usr/bin/env bash
S3_BUCKET=s3://aws-website-knoxcclbeta-e4hkg/
CDN_ID=E1JB5T7J476T64
echo "Syncing assets that rarely change, based on size only."
echo
cd `git rev-parse --show-toplevel`
aws s3 sync dist $S3_BUCKET --size-only --exclude "*" --include "agendas/*" \
    --include "images/*" --include "newsletters/*" --include "photos/*" --include "*.woff*" \
    --include "*.eot" --include "*.svg" --include "*.jpg" --include "*.ttf"
echo
echo "Syncing assets that are more likely to change, considering timestamps, too."
echo "S3 syncing is rough, and may upload some files that didn't change."
echo
aws s3 sync dist $S3_BUCKET --exclude "agendas/*" --exclude "images/*" \
    --exclude "newsletters/*" --exclude "photos/*" --exclude "*.woff*" --exclude "*.eot" \
    --exclude "*.svg" --exclude "*.jpg" --exclude "*.ttf"
echo
echo "Remember to invalidate any changed files so browsers get latest:"
echo "  > aws cloudfront create-invalidation --distribution-id $CDN_ID --paths [...]"
echo "You may also want to publicize significant site changes. See the README."