'use strict'

const fetch = require('isomorphic-unfetch')
const test = require('ava')

const { getTracks } = require('..')(fetch)

test('getting data for empty url should return rejection', async t => {
  const error = await t.throwsAsync(() => getTracks(''), {
    instanceOf: TypeError
  })
  t.is(error.message, "Couldn't parse '' as valid URL")
})

test('getting data for non url string should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getTracks('arti39anptrackspotify:://https'),
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
    () => getTracks('http://google.com/5a2w2tgpLwv26BYJf2qYwu'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'http://google.com/5a2w2tgpLwv26BYJf2qYwu' as valid URL"
  )
})

test('get tracks for spotify track', async t => {
  const url = 'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas'
  const tracks = await getTracks(url)
  t.true(Array.isArray(tracks))
  t.is(tracks[0].name, 'Immaterial')
  t.is(tracks[0].previewUrl.includes('/mp3-preview/'), true)
})

test('get tracks for spotify artist', async t => {
  const url = 'https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu'
  const tracks = await getTracks(url)
  t.true(Array.isArray(tracks))
  t.is(tracks[0].name, 'Reason Why (feat. Kim Petras & BC Kingdom)')
  t.is(tracks[0].previewUrl.includes('/mp3-preview/'), true)
})

test('get tracks for spotify album', async t => {
  const url = 'https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
  const tracks = await getTracks(url)
  t.true(Array.isArray(tracks))
  t.is(tracks[1].name, 'ELLE')
  t.is(tracks[1].previewUrl.includes('/mp3-preview/'), true)
})

test('get tracks for spotify playlist', async t => {
  const url = 'https://open.spotify.com/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  const tracks = await getTracks(url)
  t.true(Array.isArray(tracks))
  t.is(tracks[1].name, 'ELLE')
  t.is(tracks[1].previewUrl.includes('/mp3-preview/'), true)
})

test('get tracks for spotify episode', async t => {
  const url = 'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
  const tracks = await getTracks(url)
  t.true(Array.isArray(tracks))
  t.is(tracks[0].name, 'Hasty Treat - Modules in Node')
  t.is(tracks[0].previewUrl.includes('.spotifycdn.'), true)
})
