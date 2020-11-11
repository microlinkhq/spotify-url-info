# spotify-url-info

[![npm link](https://img.shields.io/npm/v/spotify-url-info.svg)](https://www.npmjs.com/package/spotify-url-info)
[![Build Status](https://travis-ci.org/karlsander/spotify-url-info.svg?branch=master)](https://travis-ci.org/karlsander/spotify-url-info)

This package can fetch useful metdata for spotify urls without needing a spotify API key. This is accomplished by some very light scraping. My usecase is providing a customized mini player preview.

**Warning:** This library will not work directly in the browser, because the spotify page that it scrapes does not allow cross-origion requests. You can use it in node.js, in serverless functions and in react native. Alternatively use a CORS proxy.

## Usage

```bash
npm install spotfiy-url-info
```

```javascript
var { getData, getPreview } = require("spotify-url-info");
```

There are two functions: getData provides the full available data, in a shape that is very similar to [what the spotify API returns](https://developer.spotify.com/documentation/web-api/reference/object-model/) and getPreview always returns the same fields for different types of resources (album, artist, playlist, track). The preview track is the first in the Album, Playlist, etc. Both take a spotify URL (play. or open.) as input and return a Promise.

```javascript
await getPreview("https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas");
```

returns

```json
{
  "title": "Immaterial",
  "type": "track",
  "track": "Immaterial",
  "artist": "SOPHIE",
  "image": "https://i.scdn.co/image/d6f496a6708d22a2f867e5acb84afb0eb0b07bc1",
  "audio": "https://p.scdn.co/mp3-preview/6be8eb12ff18ae09b7a6d38ff1e5327fd128a74e?cid=162b7dc01f3a4a2ca32ed3cec83d1e02",
  "link": "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas",
  "embed": "https://embed.spotify.com/?uri=spotify:track:5nTtCOCds6I0PHMNtqelas",
  "date": "2018-06-15",
  "description": "description of a podcast episode"
}
```

The fields `description` and `date` will be undefined for some types of media that don't have this information.

```javascript
await getData("https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas");
```

returns any raw data we can scrape from spotify. There are no guarantees about the shape of this data, because it varies with different media and scraping methods. Handle it carefully.

```javascript
await getTracks("https://open.spotify.com/playlist/3Q4cPwMHY95ZHXtmcU2xvH");
```

returns array with tracks. Below is array with one track with guaranteed properties.

```json
[
  {
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu"
        },
        "href": "https://api.spotify.com/v1/artists/5a2w2tgpLwv26BYJf2qYwu",
        "id": "5a2w2tgpLwv26BYJf2qYwu",
        "name": "SOPHIE",
        "type": "artist",
        "uri": "spotify:artist:5a2w2tgpLwv26BYJf2qYwu"
      }
    ],
    "duration_ms": 188520,
    "episode": false,
    "explicit": false,
    "external_urls": {
      "spotify": "https://open.spotify.com/track/18yTgk0VgjB9XDj8h2q6Td"
    },
    "href": "https://api.spotify.com/v1/tracks/18yTgk0VgjB9XDj8h2q6Td",
    "id": "18yTgk0VgjB9XDj8h2q6Td",
    "name": "JUST LIKE WE NEVER SAID GOODBYE",
    "popularity": 34,
    "preview_url": "https://p.scdn.co/mp3-preview/d5790004de973f83756311075125ffc965e522c8?cid=a46f5c5745a14fbf826186da8da5ecc3",
    "type": "track",
    "uri": "spotify:track:18yTgk0VgjB9XDj8h2q6Td"
  }
]
```

## Caveats

This uses cheerio to scrape the spotify twitter widget so it is unsanctioned and likely to break. I'll have the tests run on a schedule on travis ci so that I get notified when it will inevitably break. Then I can hopefully fix it. A more stable alternative is scraping the opengraph tags for the links with [open-graph-scraper](https://github.com/jshemas/openGraphScraper). The biggest issues there are no audio previews for artists and the number of requests it can take to get all the needed metadata.

## Changelog

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

````

```

```
````
