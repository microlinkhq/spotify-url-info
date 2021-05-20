const { getTracks } = require("..");

test("getting data for empty url should return rejection", () => {
  expect.assertions(1);
  return expect(getTracks("")).rejects.toThrow();
});

test("getting data for non url string should return rejection", () => {
  expect.assertions(1);
  return expect(getTracks("arti39anptrackspotify:://https")).rejects.toThrow();
});

test("getting data for non spotify url string should return rejection", () => {
  expect.assertions(1);
  return expect(
    getTracks("http://google.com/5a2w2tgpLwv26BYJf2qYwu")
  ).rejects.toThrow();
});

test("get tracks for spotify track", () => {
  expect.assertions(3);
  return getTracks(
    "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas"
  ).then(result => {
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].name).toBe("Immaterial");
    expect(result[0].external_urls.spotify).toContain("open.spotify.com/track");
  });
});

test("get tracks for spotify artist", () => {
  expect.assertions(3);
  return getTracks(
    "https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu"
  ).then(result => {
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].artists[0].name).toBe("SOPHIE");
    expect(result[0].external_urls.spotify).toContain("open.spotify.com/track");
  });
});

test("get tracks for spotify album", () => {
  expect.assertions(3);
  return getTracks(
    "https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai"
  ).then(result => {
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].name).toBe("BIPP");
    expect(result[0].external_urls.spotify).toContain("open.spotify.com/track");
  });
});

test("get tracks for spotify playlist", () => {
  expect.assertions(3);
  return getTracks(
    "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
  ).then(result => {
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].name).toBe("BIPP");
    expect(result[0].external_urls.spotify).toContain("/track/");
  });
});

test("get tracks for spotify episode", () => {
  expect.assertions(3);
  return getTracks(
    "http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E"
  ).then(result => {
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].name).toBe("Hasty Treat - Modules in Node");
    expect(result[0].external_urls.spotify).toContain("/episode/");
  });
});
