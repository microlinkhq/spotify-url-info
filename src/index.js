'use strict'

const spotifyURI = require('spotify-uri')
const { parse } = require('himalaya')

const TYPE = {
  ALBUM: 'album',
  ARTIST: 'artist',
  EPISODE: 'episode',
  PLAYLIST: 'playlist',
  TRACK: 'track'
}

const ERROR = {
  REPORT:
    'Please report the problem at https://github.com/microlinkhq/spotify-url-info/issues.',
  NOT_DATA: "Couldn't find any data in embed page that we know how to parse.",
  NOT_SCRIPTS: "Couldn't find scripts to get the data."
}

const SUPPORTED_TYPES = Object.values(TYPE)

const throwError = message => {
  throw new TypeError(`${message}\n${ERROR.REPORT}`)
}

const parseData = html => {
  const embed = parse(html)

  let scripts = embed.find(el => el.tagName === 'html')
  if (scripts === undefined) return throwError(ERROR.NOT_SCRIPTS)

  scripts = scripts.children
    .find(el => el.tagName === 'body')
    .children.filter(({ tagName }) => tagName === 'script')

  let script = scripts.find(script =>
    script.attributes.some(({ value }) => value === 'resource')
  )

  if (script !== undefined) {
    return normalizeData({
      data: JSON.parse(Buffer.from(script.children[0].content, 'base64'))
    })
  }

  script = scripts.find(script =>
    script.attributes.some(({ value }) => value === 'initial-state')
  )

  if (script !== undefined) {
    const data = JSON.parse(Buffer.from(script.children[0].content, 'base64'))
      .data.entity
    return normalizeData({ data })
  }

  script = scripts.find(script =>
    script.attributes.some(({ value }) => value === '__NEXT_DATA__')
  )

  if (script !== undefined) {
    const string = Buffer.from(script.children[0].content)
    const data = JSON.parse(string).props.pageProps.state?.data.entity
    if (data !== undefined) return normalizeData({ data })
  }

  return throwError(ERROR.NOT_DATA)
}

const createGetData = fetch => async (url, opts) => {
  const parsedUrl = getParsedUrl(url)
  const embedURL = spotifyURI.formatEmbedURL(parsedUrl)
  const response = await fetch(embedURL, opts)
  const text = await response.text()
  return parseData(text)
}

function getParsedUrl (url) {
  try {
    const parsedURL = spotifyURI.parse(url)
    if (!parsedURL.type) throw new TypeError()
    return spotifyURI.formatEmbedURL(parsedURL)
  } catch (_) {
    throw new TypeError(`Couldn't parse '${url}' as valid URL`)
  }
}

const getImages = data => data.coverArt?.sources || data.images

const getDate = data => data.releaseDate?.isoString || data.release_date

const getLink = data => spotifyURI.formatOpenURL(data.uri)

function getArtistTrack (track) {
  return track.show
    ? track.show.publisher
    : []
        .concat(track.artists)
        .filter(Boolean)
        .map(a => a.name)
        .reduce(
          (acc, name, index, array) =>
            index === 0
              ? name
              : acc + (array.length - 1 === index ? ' & ' : ', ') + name,
          ''
        )
}

const getTracks = data => data.trackList ? data.trackList.map(toTrack) : [toTrack(data)]

function getPreview (data) {
  const [track] = getTracks(data)
  const date = getDate(data)

  return {
    date: date ? new Date(date).toISOString() : date,
    title: data.name,
    type: data.type,
    track: track.name,
    description: data.description || data.subtitle || track.description,
    artist: track.artist,
    image: getImages(data).reduce((a, b) => (a.width > b.width ? a : b)).url,
    audio: track.previewUrl,
    link: getLink(data),
    embed: `https://embed.spotify.com/?uri=${data.uri}`
  }
}

const toTrack = track => ({
  artist: getArtistTrack(track) || track.subtitle,
  duration: track.duration,
  name: track.title,
  previewUrl: track.isPlayable ? track.audioPreview.url : undefined,
  uri: track.uri
})

const normalizeData = ({ data }) => {
  if (!data || !data.type || !data.name) {
    throw new Error("Data doesn't seem to be of the right shape to parse")
  }

  if (!SUPPORTED_TYPES.includes(data.type)) {
    throw new Error(
      `Not an ${SUPPORTED_TYPES.join(', ')}. Only these types can be parsed`
    )
  }

  data.type = data.uri.split(':')[1]

  return data
}

module.exports = fetch => {
  const getData = createGetData(fetch)
  return {
    getLink,
    getData,
    getPreview: (url, opts) => getData(url, opts).then(getPreview),
    getTracks: (url, opts) => getData(url, opts).then(getTracks),
    getDetails: (url, opts) =>
      getData(url, opts).then(data => ({
        preview: getPreview(data),
        tracks: getTracks(data)
      }))
  }
}

module.exports.parseData = parseData
