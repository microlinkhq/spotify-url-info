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
  expect.assertions(1);
  return getPreview(
    "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas"
  ).then(result => {
    expect(result).toEqual({
      title: "Immaterial",
      type: "track",
      track: "Immaterial",
      artist: "SOPHIE",
      image: "https://i.scdn.co/image/d6f496a6708d22a2f867e5acb84afb0eb0b07bc1",
      audio:
        "https://p.scdn.co/mp3-preview/6be8eb12ff18ae09b7a6d38ff1e5327fd128a74e?cid=162b7dc01f3a4a2ca32ed3cec83d1e02",
      link: "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas"
    });
  });
});

test("get preview for spotify artist", () => {
  expect.assertions(1);
  return getPreview(
    "https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu"
  ).then(result => {
    expect(result).toEqual({
      title: "SOPHIE",
      type: "artist",
      track: "Immaterial",
      artist: "SOPHIE",
      image: "https://i.scdn.co/image/ced106b1ff9bb908a468b23c694b33d676c12281",
      audio:
        "https://p.scdn.co/mp3-preview/6be8eb12ff18ae09b7a6d38ff1e5327fd128a74e?cid=162b7dc01f3a4a2ca32ed3cec83d1e02",
      link: "https://open.spotify.com/artist/5a2w2tgpLwv26BYJf2qYwu"
    });
  });
});

test("get preview for spotify album", () => {
  expect.assertions(1);
  return getPreview(
    "https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai"
  ).then(result => {
    expect(result).toEqual({
      title: "PRODUCT",
      type: "album",
      track: "BIPP",
      artist: "SOPHIE",
      image: "https://i.scdn.co/image/e92cb7c68fc7149796f1c1bcde2fdc818a4f90e0",
      audio: null,
      link: "https://open.spotify.com/album/4tDBsfbHRJ9OdcMO9bmnai"
    });
  });
});

test("get preview for spotify playlist", () => {
  expect.assertions(1);
  return getPreview(
    "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
  ).then(result => {
    expect(result).toEqual({
      title: "SOPHIE – PRODUCT",
      type: "playlist",
      track: "BIPP",
      artist: "SOPHIE",
      image:
        "https://mosaic.scdn.co/640/420843f3920a1a69f8b0569d02be3f142e4d72ef6f479f87437f1aafc28db5b9cfed35dc2831a9b376572aea1fc32e389ea919e5183e9351b3c02cd1828c2abb3630d97f0eb2974fdccf5f1596ad2929",
      audio:
        "https://p.scdn.co/mp3-preview/191c77028768a59ea57e8656566be8e30131a0e2?cid=162b7dc01f3a4a2ca32ed3cec83d1e02",
      link:
        "https://open.spotify.com/user/sophiemsmsmsm/playlist/3Q4cPwMHY95ZHXtmcU2xvH"
    });
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
