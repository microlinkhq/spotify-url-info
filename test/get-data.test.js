const { getData } = require("..");

test("getting data for empty url should return rejection", () => {
  expect.assertions(1);
  return expect(getData("")).rejects.toThrow();
});

test("getting data for non url string should return rejection", () => {
  expect.assertions(1);
  return expect(getData("arti39anptrackspotify:://https")).rejects.toThrow();
});

test("getting data for non spotify url string should return rejection", () => {
  expect.assertions(1);
  return expect(
    getData("http://google.com/5a2w2tgpLwv26BYJf2qYwu")
  ).rejects.toThrow();
});

test("get data for spotify track", () => {
  expect.assertions(3);
  return getData("https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas").then(
    result => {
      expect(result.type).toBe("track");
      expect(result.name).toBe("Immaterial");
      expect(result.external_urls.spotify).toContain("open.spotify.com/track");
    }
  );
});

test("get data for spotify artist", () => {
  expect.assertions(3);
  return getData("https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu").then(
    result => {
      expect(result.type).toBe("artist");
      expect(result.name).toBe("SOPHIE");
      expect(result.external_urls.spotify).toContain("open.spotify.com/artist");
    }
  );
});

test("get data for spotify album", () => {
  expect.assertions(3);
  return getData("https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai").then(
    result => {
      expect(result.type).toBe("album");
      expect(result.name).toBe("PRODUCT");
      expect(result.external_urls.spotify).toContain("open.spotify.com/album");
    }
  );
});

test("get data for spotify playlist", () => {
  expect.assertions(3);
  return getData(
    "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
  ).then(result => {
    expect(result.type).toBe("playlist");
    expect(result.name).toBe("SOPHIE – PRODUCT");
    expect(result.external_urls.spotify).toContain("/playlist/");
  });
});

test("get data for spotify episode", () => {
  expect.assertions(3);
  return getData("http://open.spotify.com/episode/64TORH3xleuD1wcnFsrH1E").then(
    result => {
      expect(result.type).toBe("episode");
      expect(result.name).toBe("Hasty Treat - Modules in Node");
      expect(result.external_urls.spotify).toContain("/episode/");
    }
  );
});
