export type SpotifyType = 'album' | 'artist' | 'episode' | 'playlist' | 'track'

export interface ImageSource {
  url: string
  width?: number
  height?: number
}

export interface Track {
  artist: string
  duration?: number
  name: string
  previewUrl?: string
  uri: string
}

export interface Preview {
  date: string | null
  title: string
  type: SpotifyType
  track: string
  description?: string
  artist: string
  image?: string
  audio?: string
  link: string
  embed: string
}

export interface Details {
  preview: Preview
  tracks: Track[]
}

export interface SpotifyUrlInfo {
  getLink: (data: unknown) => string
  getData: (url: string, opts?: RequestInit) => Promise<unknown>
  getPreview: (url: string, opts?: RequestInit) => Promise<Preview>
  getTracks: (url: string, opts?: RequestInit) => Promise<Track[]>
  getDetails: (url: string, opts?: RequestInit) => Promise<Details>
}

export interface SpotifyUrlInfoModule {
  (fetch: typeof fetch): SpotifyUrlInfo
  parseData: (html: string) => unknown
  throwError: (message: string, html: string) => never
}

export default SpotifyUrlInfoModule
