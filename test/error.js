'use strict'

const test = require('ava')

const { throwError } = require('..')

test('error provides details about next steps', async t => {
  const error = await t.throws(() =>
    throwError("Couldn't find scripts to get the data.")
  )
  t.is(
    error.message,
    "Couldn't find scripts to get the data.\nPlease report the problem at https://github.com/microlinkhq/spotify-url-info/issues."
  )
})
