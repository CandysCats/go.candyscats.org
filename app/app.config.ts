export default defineAppConfig({
  title: "Candy's Cats",
  documentation: 'https://docs.sink.cool',
  github: 'https://github.com/miantiao-me/sink',
  coffee: 'https://sink.cool/coffee',
  twitter: 'https://sink.cool/x',
  telegram: 'https://sink.cool/telegram',
  description: "Short, friendly links for Candy's Cats. One easy link for every adoption story, volunteer signup, and way to give.",
  image: 'https://go.candyscats.org/banner.png',
  previewTTL: 300, // 5 minutes
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
  reserveSlug: [
    'dashboard',
  ],
})
