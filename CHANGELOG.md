# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 3.2.15 (2024-05-24)

### 3.2.14 (2024-05-07)

### 3.2.13 (2024-02-08)

### 3.2.12 (2024-01-31)

### 3.2.11 (2024-01-31)

### 3.2.10 (2023-12-06)

### 3.2.9 (2023-10-23)

### 3.2.8 (2023-09-23)

### 3.2.7 (2023-09-23)

### 3.2.6 (2023-07-29)

### 3.2.5 (2023-05-18)

### 3.2.4 (2023-05-13)

### 3.2.3 (2022-12-29)


### Bug Fixes

* **build:** prevent publish under release commit ([4556002](https://github.com/microlinkhq/spotify-url-info/commit/45560028becb1260b12ffb16e9e664c9909fa31f))

### 3.2.2 (2022-12-29)

### [3.2.1](https://github.com/microlinkhq/spotify-url-info/compare/v3.2.0-0...v3.2.1) (2022-12-29)


### Bug Fixes

* remove old types ([84a9873](https://github.com/microlinkhq/spotify-url-info/commit/84a987327a3901ec3622afdfebef16fa230cb473))

## 3.2.0 (2022-12-29)

## [3.2.0-0](https://github.com/microlinkhq/spotify-url-info/compare/v3.1.10...v3.2.0-0) (2022-12-29)

### 3.1.10 (2022-12-12)

### 3.1.9 (2022-10-01)

### 3.1.8 (2022-09-09)

### 3.1.7 (2022-09-02)

### 3.1.6 (2022-09-02)

### [3.1.5](https://github.com/microlinkhq/spotify-url-info/compare/v3.1.4...v3.1.5) (2022-09-02)


### Bug Fixes

* changes in Spotify embeds ([53a5401](https://github.com/microlinkhq/spotify-url-info/commit/53a5401ac34a92681c3174ecbe63ed4550720f07))
* ensure spotify URL is valid ([c2e3436](https://github.com/microlinkhq/spotify-url-info/commit/c2e343651ba1df801532501259705bec80b0d5c3))

### 3.1.4 (2022-08-05)

### 3.1.3 (2022-08-05)


### Bug Fixes

* get description from an episode ([2aba83d](https://github.com/microlinkhq/spotify-url-info/commit/2aba83da3ab8b3ba39363b487f35c503f86e3bd2))

### 3.1.2 (2022-05-15)

### 3.1.1 (2022-05-02)


### Bug Fixes

* add named exports ([92dd313](https://github.com/microlinkhq/spotify-url-info/commit/92dd313b4513f88da382afda05d76dd6a94532b5)), closes [#92](https://github.com/microlinkhq/spotify-url-info/issues/92)

## [3.1.0](https://github.com/microlinkhq/spotify-url-info/compare/v3.0.7...v3.1.0) (2022-04-12)


### Features

* add getDetails which returns both preview and tracks ([7e72e4d](https://github.com/microlinkhq/spotify-url-info/commit/7e72e4d047907b287a97c3e0cd7be0bf9eff197d))

### 3.0.7 (2022-04-11)

### 3.0.6 (2022-04-08)

### 3.0.5 (2022-04-02)

### 3.0.4 (2022-04-02)

### 3.0.3 (2022-04-01)

### 3.0.2 (2022-03-29)

### 3.0.1 (2022-03-29)

## [3.0.0](https://github.com/microlinkhq/spotify-url-info/compare/v2.2.9...v3.0.0) (2022-03-20)


### ⚠ BREAKING CHANGES

* The library will be shipped without a default fetch agent.

### Features

* pass fetch agent as necessary dependency ([649778b](https://github.com/microlinkhq/spotify-url-info/commit/649778be126d9ced15228f7c8c7f9ee85d7e9f7c))

### 2.2.9 (2022-03-20)

### 2.2.8 (2022-03-20)

### 2.2.7 (2022-03-02)

### 2.2.6 (2022-02-24)

### 2.2.5 (2022-01-30)


### Bug Fixes

* files meta field ([0679da6](https://github.com/microlinkhq/spotify-url-info/commit/0679da64572287bce4b0d96ff65a6840e2df17b2)), closes [#77](https://github.com/microlinkhq/spotify-url-info/issues/77)

### [2.2.4](https://github.com/microlinkhq/spotify-url-info/compare/v2.2.3...v2.2.4) (2022-01-29)

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
