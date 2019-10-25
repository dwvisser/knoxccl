#!/usr/bin/env bash
S3_BUCKET=s3://aws-website-knoxcclbeta-e4hkg/
CDN_ID=E1JB5T7J476T64
echo "Syncing any updates in dist to $S3_BUCKET"
echo
cd cd `git rev-parse --show-toplevel`
aws s3 sync dist $S3_BUCKET
echo "You may want to publicize significant site changes. See the README."
echo
echo "Remember to invalidate any changed files so browsers get latest:"
echo "  > aws cloudfront create-invalidation --distribution-id $CDN_ID --paths [...]"
