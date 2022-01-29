declare module 'spotify-url-info' {
  export function getData(url: string, options?: object): any;

  export function getPreview(url: string, options?: object): Promise<Preview>;

  export interface Preview {
    title: string;
    type: string;
    track: string;
    artist: string;
    image: string;
    audio: string;
    link: string;
    embed: string;
    date: string;
    description: string;
  }

  export function getTracks(url: string, options?: object): Promise<Tracks[]>;

  export interface Tracks {
    artists?: ArtistsEntity[] | null;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    type: string;
    uri: string;
  }
  export interface ArtistsEntity {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  export interface ExternalUrls {
    spotify: string;
  }
}
