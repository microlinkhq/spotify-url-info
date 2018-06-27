const { getData, getPreview, parseIntoPreview } = require("./index");

test("get data for spotify Track", () => {
  expect.assertions(4);
  return getData("https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas").then(
    result => {
      expect(result.type).toBe("track");
      expect(result.name).toBe("Immaterial");
      expect(result.external_urls.spotify).toContain("open.spotify.com/track");
      expect(result.dominantColor).toContain("#");
    }
  );
});

test("get data for spotify artist", () => {
  expect.assertions(4);
  return getData("https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu").then(
    result => {
      expect(result.type).toBe("artist");
      expect(result.name).toBe("SOPHIE");
      expect(result.external_urls.spotify).toContain("open.spotify.com/artist");
      expect(result.dominantColor).toContain("#");
    }
  );
});

test("get data for spotify album", () => {
  expect.assertions(4);
  return getData("https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai").then(
    result => {
      expect(result.type).toBe("album");
      expect(result.name).toBe("PRODUCT");
      expect(result.external_urls.spotify).toContain("open.spotify.com/album");
      expect(result.dominantColor).toContain("#");
    }
  );
});

test("get data for spotify playlist", () => {
  expect.assertions(4);
  return getData(
    "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
  ).then(result => {
    expect(result.type).toBe("playlist");
    expect(result.name).toBe("SOPHIE – PRODUCT");
    expect(result.external_urls.spotify).toContain("/playlist/");
    expect(result.dominantColor).toContain("#");
  });
});

test("get preview for spotify Track", () => {
  expect.assertions(7);
  return getPreview(
    "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas"
  ).then(result => {
    expect(result.title).toBe("Immaterial");
    expect(result.type).toBe("track");
    expect(result.artist).toBe("SOPHIE");
    expect(result.track).toBe("Immaterial");
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("open.spotify.com/track/");
  });
});

test("get preview for spotify artist", () => {
  expect.assertions(7);
  return getPreview(
    "https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu"
  ).then(result => {
    expect(result.title).toBe("SOPHIE");
    expect(result.type).toBe("artist");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("open.spotify.com/artist/");
  });
});

test("get preview for spotify album", () => {
  expect.assertions(7);
  return getPreview(
    "https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai"
  ).then(result => {
    expect(result.title).toBe("PRODUCT");
    expect(result.type).toBe("album");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toBeNull();
    expect(result.link).toContain("open.spotify.com/album/");
  });
});

test("get preview for spotify playlist", () => {
  expect.assertions(7);
  return getPreview(
    "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
  ).then(result => {
    expect(result.title).toBe("SOPHIE – PRODUCT");
    expect(result.type).toBe("playlist");
    expect(result.artist).toContain("SOPHIE");
    expect(result.track).toBeDefined();
    expect(result.image).toContain("://");
    expect(result.audio).toContain("/mp3-preview/");
    expect(result.link).toContain("/playlist/");
  });
});

test("getting data for empty url should return rejection", () => {
  expect.assertions(1);
  return expect(getData("")).rejects.toThrow();
});

test("getting preview for empty url should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("")).rejects.toThrow();
});

test("getting data for non url string should return rejection", () => {
  expect.assertions(1);
  return expect(getData("arti39anptrackspotify:://https")).rejects.toThrow();
});

test("getting preview for non url string should return rejection", () => {
  expect.assertions(1);
  return expect(getPreview("arti39anptrackspotify:://https")).rejects.toThrow();
});

test("getting data for non spotify url string should return rejection", () => {
  expect.assertions(1);
  return expect(
    getData("http://google.com/5a2w2tgpLwv26BYJf2qYwu")
  ).rejects.toThrow();
});

test("getting preview for non spotify url string should return rejection", () => {
  expect.assertions(1);
  return expect(
    getPreview("http://google.com/5a2w2tgpLwv26BYJf2qYwu")
  ).rejects.toThrow();
});
