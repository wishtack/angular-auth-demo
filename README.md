# Wishtack's Angular Authentication and Authorization Demonstration

This project is a demonstration of one way of implementing authentication and authorization in Angular.

It was presented on [Angular Air 122](https://www.youtube.com/watch?v=wllwLD_HW8k).

The implementation is divided into 5 steps (thus, 5 branches):
- 0-boilerplate
- 1-authentication
- 2-guard
- 3-signout
- 4-cross-window-sync ;)
- 5-expiration

## Install

The ReST API is implemented in Python so you will need python (including pip and virtualenv) and npm (or yarn).

```shell
virtualenv venv
. venv/bin/activate # Enter the virtualenv.
pip install -r requirements.txt # Install python dependencies.
yarn install # Install JS dependencies.
```

Then you can open your browser on [http://localhost:4200](http://localhost:4200)

## Start

```shell
. venv/bin/activate # Enter the virtualenv.
yarn start
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
