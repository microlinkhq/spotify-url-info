const spotifyURI = require("spotify-uri");
const { fetch } = require("cross-fetch");
const { parse } = require("himalaya");

function getData(url) {
  let parsedURL = {};
  try {
    parsedURL = spotifyURI.parse(url);
  } catch (error) {
    return Promise.reject(new Error(`Couldn't parse ${url} as valid URL`));
  }
  if (!parsedURL.type) {
    return Promise.reject(new Error(`Failed to parse ${url} as Spotify URL`));
  }
  const embedURL = spotifyURI.formatEmbedURL(parsedURL);
  return fetch(embedURL)
    .then(res => res.text())
    .then(parse)
    .then(embed =>
      JSON.parse(
        embed
          .filter(e => e.tagName === "html")[0]
          .children.filter(e => e.tagName === "body")[0]
          .children.filter(
            e =>
              e.tagName === "script" &&
              e.attributes.findIndex(a => a.value === "resource") !== -1
          )[0].children[0].content
      )
    )
    .then(sanityCheck);
}

function getPreview(url) {
  return getData(url).then(parseIntoPreview);
}

function parseIntoPreview(data) {
  const firstTrack = getFirstTrack(data);
  const images = data.type === "track" ? data.album.images : data.images;
  return Promise.resolve({
    title: data.name,
    type: data.type,
    track: firstTrack.name,
    artist: firstTrack.artists.map(a => a.name).join(" & "),
    image: images.reduce((a, b) => (a.width > b.width ? a : b)).url,
    audio: firstTrack.preview_url,
    link: data.external_urls.spotify,
    embed: "https://embed.spotify.com/?uri=" + data.uri
  });
}

function sanityCheck(data) {
  if (!data || !data.type || !data.name) {
    return Promise.reject(
      new Error("Data doesn't seem to be of the right shape to parse")
    );
  }
  if (
    data.type != "track" &&
    data.type != "album" &&
    data.type != "playlist" &&
    data.type != "artist"
  ) {
    return Promise.reject(
      new Error(
        "Not an album, artist, track or playlist. Only these types can be parsed"
      )
    );
  }
  return Promise.resolve(data);
}

function getFirstTrack(data) {
  switch (data.type) {
    case "track":
      return data;
    case "playlist":
      return data.tracks.items[0].track;
    case "album":
      return data.tracks.items[0];
    case "artist":
      return data.tracks[0];
    default:
      return data;
  }
}

module.exports.getData = getData;
module.exports.getPreview = getPreview;
