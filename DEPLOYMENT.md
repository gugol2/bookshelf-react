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

## New Github CI/CD Action
Just push a tag from the `master` branch
and the Action in the file `deploy-to-gh-pages.yml` will take care of deploying it to gh-pages.

So:

1. Push your tag to origin:

    `git push origin <tag_name>`

    Or configure your local repo to push the tags referenced by the commits that you are pushing with `git config --local push.followTags true`
    
    That way you only have to commit your changes, then create your tag and lastly do only one push `git push`

2.  Enjoy your new features in https://gugol2.github.io/bookshelf-react