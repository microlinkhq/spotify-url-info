'use strict'

const test = require('ava')

const { getData } = require('..')

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

test('get data for spotify track', async t => {
  const data = await getData(
    'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas'
  )

  t.is(data.type, 'track')
  t.is(data.name, 'Immaterial')
  t.true(data.external_urls.spotify?.includes('open.spotify.com/track'))
})

test('get data for spotify artist', async t => {
  const data = await getData(
    'https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu'
  )

  t.is(data.type, 'artist')
  t.is(data.name, 'SOPHIE')
  t.true(data.external_urls.spotify?.includes('open.spotify.com/artist'))
})

test('get data for spotify album', async t => {
  const data = await getData(
    'https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
  )

  t.is(data.type, 'album')
  t.is(data.name, 'PRODUCT')
  t.true(data.external_urls.spotify?.includes('open.spotify.com/album'))
})

test('get data for spotify playlist', async t => {
  const data = await getData(
    'https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  )

  t.is(data.type, 'playlist')
  t.is(data.name, 'SOPHIE – PRODUCT')
  t.true(data.external_urls.spotify?.includes('/playlist/'))
})

test('get data for spotify episode', async t => {
  const data = await getData(
    'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
  )

  t.is(data.type, 'episode')
  t.is(data.name, 'Hasty Treat - Modules in Node')
  t.true(data.external_urls.spotify?.includes('/episode/'))
})
