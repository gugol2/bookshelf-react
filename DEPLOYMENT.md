# Deployment Flow 

## Traditional || Manual
1. Develop in master branch, commit and push to origin.
2. Change to `to-deploy-in-gh-pages` branch.
3. Merge `master` into `to-deploy-in-gh-pages` with:

    `git merge master`.

4. Push the merge to origin:

    `git push -u origin to-deploy-in-gh-pages`

5. From the `to-deploy-in-gh-pages` branch run:

    `npm run predeploy && npm run deploy`

6. Enjoy your new features in https://gugol2.github.io/bookshelf-react

## Github CI/CD Action
Just push the code you want deployed from the `to-deploy-in-gh-pages` branch
and the Action in the file `deploy-to-gh-pages.yml` will take care of deploying it to gh-pages.

So:

1. Push the merge to origin:

    `git push -u origin to-deploy-in-gh-pages`

2.  Enjoy your new features in https://gugol2.github.io/bookshelf-react