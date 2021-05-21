'use strict'

const spotifyURI = require('spotify-uri')
const { fetch } = require('cross-fetch')
const { parse } = require('himalaya')

const SUPPORTED_TYPES = ['album', 'artist', 'episode', 'playlist', 'track']

function getData (url) {
  let parsedURL = {}

  try {
    parsedURL = spotifyURI.parse(url)
  } catch (error) {
    return Promise.reject(new TypeError(`Couldn't parse '${url}' as valid URL`))
  }

  if (!parsedURL.type) {
    return Promise.reject(
      new TypeError(`Failed to parse '${url}' as Spotify URL`)
    )
  }

  const embedURL = spotifyURI.formatEmbedURL(parsedURL)

  return fetch(embedURL)
    .then(res => res.text())
    .then(parse)
    .then(embed => {
      const scripts = embed
        .filter(e => e.tagName === 'html')[0]
        .children.filter(e => e.tagName === 'body')[0]
        .children.filter(e => e.tagName === 'script')
      const resourceScript = scripts.filter(
        e => e.attributes.findIndex(a => a.value === 'resource') !== -1
      )
      const hydrateScript = scripts.filter(
        e => e.children[0] && /%22data%22%|"data":/.test(e.children[0].content)
      )

      if (resourceScript.length > 0) {
        // found data in the older embed style
        return JSON.parse(
          decodeURIComponent(resourceScript[0].children[0].content)
        )
      } else if (hydrateScript.length > 0) {
        // found hydration data
        // parsing via looking for { to be a little bit resistant to code changes
        const scriptContent = hydrateScript[0].children[0].content.includes(
          '%22data%22%'
        )
          ? decodeURIComponent(hydrateScript[0].children[0].content)
          : hydrateScript[0].children[0].content
        const data = JSON.parse(
          '{' +
            scriptContent
              .split('{')
              .slice(1)
              .join('{')
              .trim()
        ).data
        return data.entity ? data.entity : data
      } else {
        return Promise.reject(
          new Error(
            "Couldn't find any data in embed page that we know how to parse"
          )
        )
      }
    })
    .then(sanityCheck)
}

function parseIntoPreview (data) {
  const track = getFirstTrack(data)
  const images = data.type === 'track' ? data.album.images : data.images
  const date = data.album ? data.album.release_date : data.release_date

  return Promise.resolve({
    date,
    title: data.name,
    type: data.type,
    track: track.name,
    description: data.description || undefined,
    artist: track.artists.map(a => a.name).join(' & '),
    image: images.reduce((a, b) => (a.width > b.width ? a : b)).url,
    audio: track.preview_url,
    link: data.external_urls.spotify,
    embed: `https://embed.spotify.com/?uri=${data.uri}`
  })
}

function parseIntoTrackArray (data) {
  if (!data.tracks) {
    // Is a track or a podcast episode
    return Promise.resolve([data])
  } else if (data.tracks.items) {
    if (data.tracks.items[0].track) {
      // Is a playlist
      return Promise.resolve(data.tracks.items.map(t => t.track))
    } else {
      // Is an album
      return Promise.resolve(data.tracks.items)
    }
  } else {
    // Is an artist
    return Promise.resolve(data.tracks)
  }
}

function getFirstTrack (data) {
  switch (data.type) {
    case 'track':
      return data
    case 'playlist':
      return data.tracks.items[0].track
    case 'album':
      return data.tracks.items[0]
    case 'artist':
      return data.tracks[0]
    case 'episode':
      return {
        artists: data.show.publisher.split(' and ').map(name => ({ name })),
        name: data.show.name,
        preview_url: data.audio_preview_url
      }
    default:
      return data
  }
}

function sanityCheck (data) {
  if (!data || !data.type || !data.name) {
    return Promise.reject(
      new Error("Data doesn't seem to be of the right shape to parse")
    )
  }

  if (!SUPPORTED_TYPES.includes(data.type)) {
    return Promise.reject(
      new Error(
        `Not an ${SUPPORTED_TYPES.join(', ')}. Only these types can be parsed`
      )
    )
  }
  return Promise.resolve(data)
}

module.exports.getData = getData

module.exports.getPreview = url => getData(url).then(parseIntoPreview)

module.exports.getTracks = url => getData(url).then(parseIntoTrackArray)
