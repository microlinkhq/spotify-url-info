'use strict'

const test = require('ava')

const { getPreview } = require('..')

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
  t.true(preview.image?.includes('://'))
  t.true(preview.audio?.includes('/mp3-preview/'))
  t.true(preview.link?.includes('open.spotify.com/track/'))
  t.true(
    preview.embed?.includes('https://embed.spotify.com/?uri=spotify:track')
  )
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

  t.true(preview.artist?.includes('SOPHIE'))
  t.true(preview.image?.includes('://'))
  t.true(preview.audio?.includes('/mp3-preview/'))
  t.true(preview.link?.includes('open.spotify.com/artist/'))
})

// test('get preview for spotify album', () => {
//   expect.assertions(10)
//   return getPreview(
//     'https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
//   ).then(result => {
//     expect(result.date).toBe('2015-11-27')
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('PRODUCT')
//     expect(result.type).toBe('album')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toBeNull()
//     expect(result.link).toContain('open.spotify.com/album/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//     )
//   })
// })

// test('get preview for spotify playlist', () => {
//   expect.assertions(10)
//   return getPreview(
//     'https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH'
//   ).then(result => {
//     expect(result.date).toBeUndefined()
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('SOPHIE – PRODUCT')
//     expect(result.type).toBe('playlist')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toContain('/mp3-preview/')
//     expect(result.link).toContain('/playlist/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:playlist:3Q4cPwMHY95ZHXtmcU2xvH'
//     )
//   })
// })

// test('get preview for spotify episode', () => {
//   expect.assertions(10)
//   return getPreview(
//     'http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E'
//   ).then(result => {
//     expect(result.title).toBe('Hasty Treat - Modules in Node')
//     expect(result.description).toContain('In this Hasty Treat')
//     expect(result.type).toBe('episode')
//     expect(result.artist).toContain('Wes Bos & Scott Tolinski')
//     expect(result.track).toBeDefined()
//     expect(result.date).toBe('2020-01-06')
//     expect(result.image).toContain('://')
//     expect(result.audio).toContain('/mp3-preview/')
//     expect(result.link).toContain('/episode/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:episode:64TORH3xleuD1wcnFsrH1E'
//     )
//   })
// })

// test('get preview for spotify album with constructed uri', () => {
//   expect.assertions(10)
//   return getPreview('spotify:album:4tDBsfbHRJ9OdcMO9bmnai').then(result => {
//     expect(result.date).toBe('2015-11-27')
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('PRODUCT')
//     expect(result.type).toBe('album')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toBeNull()
//     expect(result.link).toContain('open.spotify.com/album/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//     )
//   })
// })

// test('get preview for spotify album with play url', () => {
//   expect.assertions(10)
//   return getPreview(
//     'https://play.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai'
//   ).then(result => {
//     expect(result.date).toBe('2015-11-27')
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('PRODUCT')
//     expect(result.type).toBe('album')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toBeNull()
//     expect(result.link).toContain('open.spotify.com/album/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//     )
//   })
// })

// xtest('get preview for spotify Album with twitter embed url', () => {
//   expect.assertions(10)
//   return getPreview(
//     'https://open.spotify.com/embed/album/4tDBsfbHRJ9OdcMO9bmnai?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter'
//   ).then(result => {
//     expect(result.date).toBe('2015-11-27')
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('PRODUCT')
//     expect(result.type).toBe('album')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toBeNull()
//     expect(result.link).toContain('open.spotify.com/album/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//     )
//   })
// })

// test('get preview for spotify Track with constructed embed url', () => {
//   expect.assertions(10)
//   return getPreview(
//     'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//   ).then(result => {
//     expect(result.date).toBe('2015-11-27')
//     expect(result.description).toBeUndefined()
//     expect(result.title).toBe('PRODUCT')
//     expect(result.type).toBe('album')
//     expect(result.artist).toContain('SOPHIE')
//     expect(result.track).toBeDefined()
//     expect(result.image).toContain('://')
//     expect(result.audio).toBeNull()
//     expect(result.link).toContain('open.spotify.com/album/')
//     expect(result.embed).toBe(
//       'https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai'
//     )
//   })
// })
