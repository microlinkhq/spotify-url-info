'use strict'

const fetch = require('isomorphic-unfetch')
const test = require('ava')

const { getLink, getData } = require('..')(fetch)

test('getting data for empty url should return rejection', async t => {
  const error = await t.throwsAsync(() => getData(''), {
    instanceOf: TypeError
  })
  t.is(error.message, "Couldn't parse '' as valid URL")
})

test('getting data for non url string should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getData('arti39anptrackspotify:://https'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'arti39anptrackspotify:://https' as valid URL"
  )
})

test('getting data for non spotify url string should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getData('http://google.com/5a2w2tgpLwv26BYJf2qYwu'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'http://google.com/5a2w2tgpLwv26BYJf2qYwu' as valid URL"
  )
})

test('getting data for a deleted spotify url should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getData('https://open.spotify.com/playlist/7E6aXqOtSnwECFLiCosTmM'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't find scripts to get the data.\nPlease report the problem at https://github.com/microlinkhq/spotify-url-info/issues."
  )
})

test('get data for spotify track', async t => {
  const url = 'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas'
  const data = await getData(url)

  t.is(data.type, 'track')
  t.is(data.name, 'Immaterial')
  t.is(getLink(data), url)
})

test('get data for spotify artist', async t => {
  const url = 'https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu'
  const data = await getData(url)

  t.is(data.type, 'artist')
  t.is(data.name, 'SOPHIE')
  t.is(getLink(data), url)
})

test('get data for spotify album', async t => {
  const url = 'https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
  const data = await getData(url)

  t.is(data.type, 'album')
  t.is(data.name, 'PRODUCT')
  t.is(getLink(data), url)
})

test('get data for spotify playlist', async t => {
  const data = await getData(
    'https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  )

  t.is(data.type, 'playlist')
  t.is(data.name, 'SOPHIE – PRODUCT')
  t.is(
    getLink(data),
    'https://open.spotify.com/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  )
})

test('get data for spotify episode', async t => {
  const data = await getData(
    'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
  )

  t.is(data.type, 'episode')
  t.is(data.name, 'Hasty Treat - Modules in Node')
})

test('validate duration for get data spotify track', async t => {
  // this link populates as .duration from spotify
  const url = 'https://open.spotify.com/track/56rgqDNRIqKq0qIMdu7r4r'
  const data = await getData(url)
  t.is(data.duration, 176000)
  t.is(data.duration_ms, 176000)
  t.is(data.type, 'track')
  t.is(data.name, 'Get Lost (feat. Ashe) - Ford. Remix')
  t.is(getLink(data), url)
})
