# Next themeable tenant scaffold

- Run: npm install && npm run dev
- Switch tenant via the header select — themes are loaded from /public/themes/*.json
- Extend:
  - Add more theme keys (e.g. typography scale, component variants)
  - Persist tenant config on backend and load on server for SEO (use getServerSideProps or fetch on server)
  - Add a small admin UI to create/update theme JSON per tenant