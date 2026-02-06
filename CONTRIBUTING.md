# Contributing to `qortexone-plugins`

## Table of Contents

## Get Started

So...feel ready to jump in? Let's do this. 👏🏻 💯

### Forking the Repository

Ok. So you're gonna want some code right? Go ahead and fork the repository into your own GitHub account and clone that code to your local machine. GitHub's [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) documentation has a great step by step guide if you are not sure how to do this.

If you cloned a fork, you can add the upstream dependency like so:

```bash
git remote add upstream git@github.com:backstage/community-plugins.git
git pull upstream main
```

After you have cloned the Community Plugins repository, you should run the following commands once to set things up for development:

```bash
# jump in to the community-plugins repo that you cloned
cd qortexone-plugins
# install the root dependencies so that you can create workspaces if needed
yarn install
# navigate to a workspace that you're working on
cd workspaces/linguist
# install the workspace dependencies
yarn install
```