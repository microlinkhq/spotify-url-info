'use strict'

const test = require('ava')

const { getTracks } = require('..')

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
  const result = await getTracks(
    'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas'
  )
  t.true(Array.isArray(result))
  t.is(result[0].name, 'Immaterial')
  t.true(result[0].external_urls.spotify.includes('/track/'))
})

test('get tracks for spotify artist', async t => {
  const result = await getTracks(
    'https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu'
  )
  t.true(Array.isArray(result))
  t.is(result[0].name, 'Immaterial')
  t.true(result[0].external_urls.spotify.includes('/track/'))
})

test('get tracks for spotify album', async t => {
  const result = await getTracks(
    'https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
  )
  t.true(Array.isArray(result))
  t.is(result[0].name, 'BIPP')
  t.true(result[0].external_urls.spotify.includes('/track/'))
})

test('get tracks for spotify playlist', async t => {
  const result = await getTracks(
    'https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  )
  t.true(Array.isArray(result))
  t.is(result[0].name, 'BIPP')
  t.true(result[0].external_urls.spotify.includes('/track/'))
})

test('get tracks for spotify episode', async t => {
  const result = await getTracks(
    'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
  )
  t.true(Array.isArray(result))
  t.is(result[0].name, 'Hasty Treat - Modules in Node')
  t.true(result[0].external_urls.spotify.includes('/episode/'))
})
