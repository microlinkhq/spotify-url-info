# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.3](https://github.com/microlinkhq/spotify-url-info/compare/v2.2.2...v2.2.3) (2021-05-21)


### Bug Fixes

* add typings files ([5f98597](https://github.com/microlinkhq/spotify-url-info/commit/5f98597f45bceadf9c05e4ed9ccbe03d7fa80ebc))

### [2.2.2](https://github.com/microlinkhq/spotify-url-info/compare/v2.2.1...v2.2.2) (2021-05-21)

### [2.2.1](https://github.com/karlsander/spotify-url-info/compare/v2.2.1-0...v2.2.1) (2021-05-21)


### Bug Fixes

* coverage ([d4c3a62](https://github.com/karlsander/spotify-url-info/commit/d4c3a6237d751332d5ecbade0fd64381309571db))

### 2.2.0

- add `getTracks` feature (thanks [@DaliborTrampota](https://github.com/DaliborTrampota)!)

### 2.1.0

Warning: The data returned from `getData` can change at any time. For example, the newer podcast embed does not provide `dominantColor` anymore. I do not consider that a breaking change for this library. The only guarantee is that you get the data spotify makes available. You need to add safety checks in your application code. Only the data shape returned by `getPreview` is guaranteed.

- fixes an issue with encoded data in the parsed html page (issue #55)
- add support for scraping a different type of embed page, currently used in podcast episodes (fixes issue #54)

### 2.0.0

- Drop support for EOL node versions, which is technically breaking 🤷‍♂️

### 1.4.0

- Support for podcast episodes on spotify (contributed by @kikobeats)
- new `description` and `date` fields in the preview object (contributed by @kikobeats)

### 1.3.1

- update dependencies

### 1.3.0

- remove lockfile

### 1.2.0

- now uses Himalaya for html parsing instead of cheerio, its more complex / brittle but the bundle is way smaller so it can be used inside apps

### 1.1.1

- generate embed url for preview with string concatination instead of using spotifyURL package
- bump dependency versions

### 1.1.0

- add embed field to `getPreview` result

### 1.0.0

- first public release
