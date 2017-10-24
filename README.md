# [![module logo][module-logo-path]][module-logo-url]

[module-logo-path]: /resources/logo-sm.png

[module-logo-url]: /README.md

[![NPM version][npm-image]][npm-url] 
[![Dependency Status][daviddm-image]][daviddm-url] 
[![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)

> Plot serial chart data to an image and save it to filesystem from shell. Compatible with node 8.x

## Attention: By mistake I have chosen a package name which is a registered trademark of a company. This package is not related to this company and the name of this module will change in the near future! Name suggestions can be submitted as ticket:)

## Installation

```sh
$ npm install -g chartio
```

## Usage

```sh
$ type datafile.data | chartio --title measurement --width 2048
$ chartio --title measurement --width 2048 --inputfile tests.dat --outfile tests.png
```

## Demo

![Demo](/demo.gif)

## Parameter details and help

[COMMANDLINE-ARGUMENTS.md](COMMANDLINE-ARGUMENTS.md)

## License

MIT © [s-a](https://github.com/s-a)

[npm-image]: https://badge.fury.io/js/chartio.svg

[npm-url]: https://npmjs.org/package/chartio

[daviddm-image]: https://david-dm.org/s-a/chartio.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/s-a/chartio
