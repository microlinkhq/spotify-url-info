<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink logo">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/spotify-url-info.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/spotify-url-info.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/spotify.url-info)
[![NPM Status](https://img.shields.io/npm/dm/spotify-url-info.svg?style=flat-square)](https://www.npmjs.org/package/spotify-url-info)

> Get metadata from Spotify URLs.

## Install

```bash
npm install spotify-url-info
```

## Usage

```js
const { getData, getPreview, getTracks } = require('spotify-url-info')
```

There are two functions:

- `.getData`: Provides the full available data, in a shape that is very similar to [what the spotify API returns](https://developer.spotify.com/documentation/web-api/reference/object-model/).
- `.getPreview`: Always returns the same fields for different types of resources (album, artist, playlist, track). The preview track is the first in the Album, Playlist, etc.

Both take a spotify URL (play. or open.) as input and return a Promise.

```js
getPreview('https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas')
  .then(data => console.log(data))
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

```js
getData('https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas')
  .then(data => console.log(data))
```

returns any raw data we can scrape from spotify. There are no guarantees about the shape of this data, because it varies with different media and scraping methods. Handle it carefully.

```js
getTracks('https://open.spotify.com/playlist/3Q4cPwMHY95ZHXtmcU2xvH')
  .then(data => console.log(data))
```

Returns array with tracks. Below is array with an example track. This data is passed on straight from spotify, so the shape could change. Only the first 100 tracks will be returned.

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

## License

**spotify-url-info** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/spotify-url-info/blob/master/LICENSE.md) License.<br>
Authored by [Karl Sander](https://github.com/karlsander) and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/spotify-url-info/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
