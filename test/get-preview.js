'use strict'

const { fetch } = require('cross-fetch')
const test = require('ava')

const { getPreview } = require('..')(fetch)

test('getting preview for empty url should return rejection', async t => {
  const error = await t.throwsAsync(() => getPreview(''), {
    instanceOf: TypeError
  })
  t.is(error.message, "Couldn't parse '' as valid URL")
})

test('getting preview for non url string should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getPreview('arti39anptrackspotify:://https'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'arti39anptrackspotify:://https' as valid URL"
  )
})

test('getting preview for non spotify url string should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getPreview('http://google.com/5a2w2tgpLwv26BYJf2qYwu'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'http://google.com/5a2w2tgpLwv26BYJf2qYwu' as valid URL"
  )
})

test.skip('getting preview for non spotify url string that looks like a spotify url should return rejection', async t => {
  const error = await t.throwsAsync(
    () => getPreview('http://google.com/track/5nTtCOCds6I0PHMNtqelas'),
    {
      instanceOf: TypeError
    }
  )
  t.is(
    error.message,
    "Couldn't parse 'http://google.com/track/5nTtCOCds6I0PHMNtqelas' as valid URL"
  )
})

test('get preview for spotify track', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas'
  )

  t.is(preview.title, 'Immaterial')
  t.is(preview.date, '2018-06-15')
  t.is(preview.description, undefined)
  t.is(preview.type, 'track')
  t.is(preview.artist, 'SOPHIE')
  t.is(preview.track, 'Immaterial')
  t.true(preview.image.includes('://'))
  t.true(preview.audio.includes('/mp3-preview/'))
  t.true(preview.link.includes('open.spotify.com/track/'))
  t.true(preview.embed.includes('https://embed.spotify.com/?uri=spotify:track'))
})

test('get preview for spotify artist', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu'
  )

  t.is(preview.date, undefined)
  t.is(preview.description, undefined)
  t.is(preview.track, 'Immaterial')
  t.is(preview.title, 'SOPHIE')
  t.is(preview.type, 'artist')
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:artist:5a2w2tgpLwv26BYJf2qYwu'
  )

  t.true(preview.artist.includes('SOPHIE'))
  t.true(preview.image.includes('://'))
  t.true(preview.audio.includes('/mp3-preview/'))
  t.true(preview.link.includes('open.spotify.com/artist/'))
})

test('get preview for spotify album', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/album/7vQKfsKKrI0xObMqojazHR'
  )

  t.is(preview.date, '2019-09-06')
  t.is(preview.description, undefined)
  t.is(preview.title, "OIL OF EVERY PEARL'S UN-INSIDES NON-STOP REMIX ALBUM")
  t.is(preview.type, 'album')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'Cold World')
  t.is(preview.image.includes('://'), true)
  t.true(preview.audio.includes('/mp3-preview/'))
  t.is(preview.link.includes('open.spotify.com/album/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:album:7vQKfsKKrI0xObMqojazHR'
  )
})

test('get preview for spotify playlist', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
  )

  t.is(preview.date, undefined)
  t.is(preview.description, undefined)
  t.is(preview.title, 'SOPHIE – PRODUCT')
  t.is(preview.type, 'playlist')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'BIPP')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio.includes('/mp3-preview/'), true)
  t.is(preview.link.includes('/playlist/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:playlist:3Q4cPwMHY95ZHXtmcU2xvH'
  )
})

test('get preview for spotify episode', async t => {
  const preview = await getPreview(
    'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
  )

  t.is(preview.title, 'Hasty Treat - Modules in Node')
  t.is(preview.description.includes('In this Hasty Treat'), true)
  t.is(preview.type, 'episode')
  t.is(preview.artist.includes('Wes Bos & Scott Tolinski'), true)
  t.is(preview.track, 'Syntax - Tasty Web Development Treats')
  t.is(preview.date, '2020-01-06')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio.includes('/mp3-preview/'), true)
  t.is(preview.link.includes('/episode/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:episode:64TORH3xleuD1wcnFsrH1E'
  )
})

test('get preview for spotify playlist with episode inside', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/playlist/1hMCPzPBQRkLRuwspFp2eA'
  )

  t.is(preview.date, undefined)
  t.is(
    preview.description,
    'https:&#x2F;&#x2F;github.com&#x2F;microlinkhq&#x2F;spotify-url-info'
  )
  t.is(preview.title, 'spotify-url-info')
  t.is(preview.type, 'playlist')
  t.is(preview.artist, 'Zosia Okk')
  t.is(preview.track, 'Jealous - Eyedress Speed up')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio.includes('/mp3-preview/'), true)
  t.is(preview.link.includes('open.spotify.com/playlist/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:playlist:1hMCPzPBQRkLRuwspFp2eA'
  )
})

test('get preview for spotify collaboratie playlist', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/playlist/29n3VgifrVF9ZxFV9B6yRA'
  )

  t.is(preview.date, undefined)
  t.is(preview.description, 'feat Joseba')
  t.is(preview.title, '🤘 ROCK')
  t.is(preview.type, 'playlist')
  t.is(preview.artist, 'Metalocalypse: Dethklok')
  t.is(preview.track, 'Awaken')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio.includes('/mp3-preview/'), true)
  t.is(preview.link.includes('open.spotify.com/playlist/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:playlist:29n3VgifrVF9ZxFV9B6yRA'
  )
})

test('get preview for spotify album with constructed uri', async t => {
  const preview = await getPreview('spotify:album:7vQKfsKKrI0xObMqojazHR')

  t.is(preview.date, '2019-09-06')
  t.is(preview.description, undefined)
  t.is(preview.title, "OIL OF EVERY PEARL'S UN-INSIDES NON-STOP REMIX ALBUM")
  t.is(preview.type, 'album')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'Cold World')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio.includes('/mp3-preview/'), true)
  t.is(preview.link.includes('open.spotify.com/album/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:album:7vQKfsKKrI0xObMqojazHR'
  )
})

test('get preview for spotify album with play url', async t => {
  const preview = await getPreview(
    'https://play.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
  )

  t.is(preview.date, '2015-11-27')
  t.is(preview.description, undefined)
  t.is(preview.title, 'PRODUCT')
  t.is(preview.type, 'album')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'BIPP')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio, null)
  t.is(preview.link.includes('open.spotify.com/album/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
  )
})

test('get preview for spotify Album with twitter embed url', async t => {
  const preview = await getPreview(
    'https://open.spotify.com/embed/album/4tDBsfbHRJ9OdcMO9bmnai?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter'
  )

  t.is(preview.date, '2015-11-27')
  t.is(preview.description, undefined)
  t.is(preview.title, 'PRODUCT')
  t.is(preview.type, 'album')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'BIPP')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio, null)
  t.is(preview.link.includes('open.spotify.com/album/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
  )
})

test('get preview for spotify Track with constructed embed url', async t => {
  const preview = await getPreview(
    'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
  )

  t.is(preview.date, '2015-11-27')
  t.is(preview.description, undefined)
  t.is(preview.title, 'PRODUCT')
  t.is(preview.type, 'album')
  t.is(preview.artist.includes('SOPHIE'), true)
  t.is(preview.track, 'BIPP')
  t.is(preview.image.includes('://'), true)
  t.is(preview.audio, null)
  t.is(preview.link.includes('open.spotify.com/album/'), true)
  t.is(
    preview.embed,
    'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
  )
})
