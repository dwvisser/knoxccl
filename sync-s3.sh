#!/usr/bin/env bash
S3_BUCKET=s3://aws-website-knoxcclbeta-e4hkg/
CDN_ID=E1JB5T7J476T64
echo "Syncing any changes to $S3_BUCKET"
cd dist
aws s3 sync . $S3_BUCKET --exclude="*.xcf"
echo "If interesting site changes, see README for how to publicize."
echo "Remember to invalidate any changed files so browsers get latest:"
echo "  > aws cloudfront create-invalidation --distribution-id $CDN_ID --paths [...]"
