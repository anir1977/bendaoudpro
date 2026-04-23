/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'guesswatches.com' },
      { protocol: 'https', hostname: 'festinawatches.com' },
      { protocol: 'https', hostname: 'www.danielkleinwatchusa.com' },
      { protocol: 'https', hostname: 'watch-connection.com' },
      { protocol: 'https', hostname: 'scontent.fcmn7-1.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
}

module.exports = nextConfig
