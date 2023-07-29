'use strict'

const mapValuesDeep = require('map-values-deep')
const { readFile } = require('fs/promises')

const path = require('path')
const test = require('ava')

const { parseData } = require('..')

const toTypeof = value => typeof value

const expected = mapValuesDeep(
  {
    type: 'track',
    name: 'Immaterial',
    uri: 'spotify:track:5nTtCOCds6I0PHMNtqelas',
    id: '5nTtCOCds6I0PHMNtqelas',
    title: 'Immaterial',
    artists: [
      {
        name: 'SOPHIE',
        uri: 'spotify:artist:5a2w2tgpLwv26BYJf2qYwu'
      }
    ],
    coverArt: {
      extractedColors: {
        colorDark: {
          hex: '#785870'
        },
        colorLight: {
          hex: '#926B88'
        }
      },
      sources: [
        {
          url: 'https://i.scdn.co/image/ab67616d00001e026b03d8c63599cc94263d7d60',
          width: 300,
          height: 300
        },
        {
          url: 'https://i.scdn.co/image/ab67616d000048516b03d8c63599cc94263d7d60',
          width: 64,
          height: 64
        },
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2736b03d8c63599cc94263d7d60',
          width: 640,
          height: 640
        }
      ]
    },
    releaseDate: {
      isoString: '2018-06-15T00:00:00Z'
    },
    duration: 232806,
    maxDuration: 232806,
    isPlayable: true,
    isExplicit: false,
    audioPreview: {
      url: 'https://p.scdn.co/mp3-preview/97b5eb03593683855fffada4248fcfffe4dcc263',
      format: 'MP3_96'
    },
    hasVideo: false,
    relatedEntityUri: 'spotify:artist:5a2w2tgpLwv26BYJf2qYwu'
  },
  toTypeof
)

test('from base64', async t => {
  const html = await readFile(
    path.join(__dirname, './fixtures/base64.html'),
    'utf-8'
  )

  const data = parseData(html)
  t.deepEqual(mapValuesDeep(data, toTypeof), expected)
})

test('from nextjs', async t => {
  const html = await readFile(
    path.join(__dirname, './fixtures/nextjs.html'),
    'utf-8'
  )

  const data = parseData(html)
  t.deepEqual(mapValuesDeep(data, toTypeof), expected)
})
