# Deployment Flow
1. Develop in master branch, commit and push to origin.
2. Change to `to-deploy-in-gh-pages` branch.
3. Merge `master` into `to-deploy-in-gh-pages` with:

    `git merge master`.

4. Push the merge to origin:

    `git push -u origin to-deploy-in-gh-pages`

5. From the `to-deploy-in-gh-pages` branch run:

    `npm run predeploy && npm run deploy`

6. Enjoy your new features in https://gugol2.github.io/bookshelf-react