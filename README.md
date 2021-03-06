# 0xdeface.me Demo Monorepo

[![Build Status](https://travis-ci.com/0xdefaceme/demo.svg?branch=master)](https://travis-ci.com/0xdefaceme/demo)

We're currently developing a demo of the 0xdeface protocol in this repository.
To allow for easier debugging and development, all components are in here. In
the future, we'll probably split out components into reusable chunks.

## Installation

Install ganache-cli or [ethnode](https://github.com/vrde/ethnode) and run it.
Then:

```bash
$ git clone git@github.com:0xdefaceme/demo.git
$ npm i
$ truffle migrate
$ npm run dev
```

The front end is accessible at http://localhost:3000.

## Style Guide

### Javascript

We use prettier to format our JavaScript code. That's why there's a `//@format`
on the top of every `.js` file. As we're using ESNEXT modifiers, it's required
to enable `babylon` when using prettier. In vim this can be done by adding

```
let g:prettier#config#parser = 'babylon'
```

to your `.vimrc`.

### Solidity

We're using Ethlint a.k.a. Solium for linting Solidity. It integrates with
[many IDEs](https://github.com/duaraghav8/Ethlint/blob/master/docs/user-guide.rst#ide--editor-integrations).

## Contributing and License

This project is licensed under the MIT license. We highly value outside
contributions and will merge them as quickly as possible. If you're looking for
work, check the [issues](https://github.com/0xdefaceme/demo/issues). If you
have any other questions, write tim@daubenschuetz.de or open issues.
Happy hacking!
