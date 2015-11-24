# App4all

[![Build Status](https://travis-ci.org/ponchoblesa/app4all.svg?branch=master)](https://travis-ci.org/ponchoblesa/app4all)

Simple screens examples of good practices in web applications. The aim of this application is to show the correct usage of HTML5 tags and ARIA attributes in order to develop an accessible web application compatible with screen readers and keyboard users.

It also pretends to follow all the good practices of an Ember application. So every piece of code is tried to be located in its correct place with its best approach and it has been programmed following TDD.

## Check the build, test and documentation

* [App4all](http://ponchoblesa.github.io/app4all/)
* [Test](http://ponchoblesa.github.io/app4all/tests/)
* [Documentation](http://ponchoblesa.github.io/app4all/docs/)

## CSS test

There are two style sheets recomended to be included in development environment. The files '_a11y-test.scss' and '_a11y-test2.scss' check posible mistakes in the html structure. For production, remove the reference to these files in 'app.scss'.

## Navigation

The approach for the navigation in small screens is a "checkbox status trick", which expands or collapses the links checking this status only with CSS, improving then the performance of the application. In order to make this approach accessible to keyboard users and assistive technologies:

* It is simulated the focus in label when it is over the checkbox.
* It is included 'aria-controls' to indicate that the navigation links will be expanded or collapsed.
* It is added a tool-tip to the check-box which is read by assistive technologies when the user has the focus on it.
* This tool-tip is hidden since it is not content of the application, so it is not read when the user select to read the entire application.

It was necessary to bind some aria attributes to the ember checkbox component. There was also needed to extend the link component in order to detect the space pressed event and trigger the action. Because we want to have this behaviour in the entire application, this is done using an initializer.

# To run and compile this code locally

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [Cordova](https://www.npmjs.com/package/cordova)
* [Android SDK](https://developer.android.com/sdk/index.html)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
* `ember cordova:build --platform android` (Android apk)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

