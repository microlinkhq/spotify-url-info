const { getPreview } = require("..");

test("getting preview for empty url should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("")).rejects.toThrow();
});

test("getting preview for non url string should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("arti39anptrackspotify:://https")).rejects.toThrow();
});

test("getting preview for non spotify url string should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("http://google.com/5a2w2tgpLwv26BYJf2qYwu")).rejects.toThrow();
});

xtest("getting preview for non spotify url string that looks like a spotify url should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("http://google.com/track/5nTtCOCds6I0PHMNtqelas")).rejects.toThrow();
});


test("get preview for spotify track", () => {
  expect.assertions(10);
  return getPreview("https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas").then(result => {
    expect(result.title).toBe("Immaterial");
    expect(result.date).toBe("2018-06-15");
    expect(result.description).toBeUndefined();
    expect(result.type).toBe("track");
    expect(result.artist).toBe("SOPHIE");
    expect(result.track).toBe("Immaterial");
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("open.spotify.com/track/");
    expect(result.embed).toContain("https://embed.spotify.com/?uri=spotify:track");
  });
});

test("get preview for spotify artist", () => {
  expect.assertions(10);
  return getPreview("https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu").then(result => {
    expect(result.date).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("SOPHIE");
    expect(result.type).toBe("artist");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("open.spotify.com/artist/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:artist:5a2w2tgpLwv26BYJf2qYwu");
  });
});

test("get preview for spotify album", () => {
  expect.assertions(10);
  return getPreview("https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai").then(result => {
    expect(result.date).toBe("2015-11-27");
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai");
  });
});

test("get preview for spotify playlist", () => {
  expect.assertions(10);
  return getPreview("https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH").then(result => {
    expect(result.date).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("SOPHIE – PRODUCT");
    expect(result.type).toBe("playlist");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("/playlist/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:playlist:3Q4cPwMHY95ZHXtmcU2xvH");
  });
});

test("get preview for spotify episode", () => {
  expect.assertions(10);
  return getPreview("http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E").then(result => {
    expect(result.title).toBe("Hasty Treat - Modules in Node");
    expect(result.description).toContain("In this Hasty Treat");
    expect(result.type).toBe("episode");
    expect(result.artist).toContain("Wes Bos & Scott Tolinski");
    expect(result.track).toBeDefined();
    expect(result.date).toBe("2020-01-06");
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("/episode/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:episode:64TORH3xleuD1wcnFsrH1E");
  });
});

test("get preview for spotify album with constructed uri", () => {
  expect.assertions(10);
  return getPreview("spotify:album:4tDBsfbHRJ9OdcMO9bmnai").then(result => {
    expect(result.date).toBe("2015-11-27");
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai");
  });
});

test("get preview for spotify album with play url", () => {
  expect.assertions(10);
  return getPreview("https://play.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai").then(result => {
    expect(result.date).toBe("2015-11-27");
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai");
  });
});

xtest("get preview for spotify Album with twitter embed url", () => {
  expect.assertions(10);
  return getPreview("https://open.spotify.com/embed/album/4tDBsfbHRJ9OdcMO9bmnai?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter").then(result => {
    expect(result.date).toBe("2015-11-27");
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai");
  });
});

test("get preview for spotify Track with constructed embed url", () => {
  expect.assertions(10);
  return getPreview("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai").then(result => {
    expect(result.date).toBe("2015-11-27");
    expect(result.description).toBeUndefined();
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
    expect(result.embed).toBe("https://embed.spotify.com/?uri=spotify:album:4tDBsfbHRJ9OdcMO9bmnai");
  });
});