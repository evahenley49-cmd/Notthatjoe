# joehenley.com

The personal site of Joseph Henley, a doctor in south London. (Not the Joe Henley from TV.)

It's plain HTML, CSS and JavaScript with no build step. Open `index.html` in a browser to preview it.

## Things to fill in

Everything you need to change is at the top of **`script.js`**:

- **`CONTACT_EMAIL`**: put an email address here to show the "Say hello" section. While it's empty, that section stays hidden.
- **`PRODUCTS`**: the merch. Each item has a name, blurb, optional price and a list of `options`
  (one button per version in the shop, each with a label and its Fourthwall product link).
- **`SHOP_URL`**: the main shop address, used for the "See the whole shop" button.

## Selling the merch

This site doesn't take payments itself. The easiest route is a print-on-demand shop, which prints, ships and handles payment for you:

1. Make a free shop on a site like Fourthwall, Teemill or Redbubble.
2. Upload the print-ready designs from the `designs/` folder (4500×5400 PNGs with see-through backgrounds). Files ending `-navy-ink` or `-pink-ink` go on light products (white, yellow). Files ending `-white-ink` or `-yellow-ink` go on dark ones (navy, black, pink).
3. Copy each product's link into its `url` in `script.js`.

Keep the designs about *this* Joe. Putting the other Joe Henley's name, photo or *The Voice* branding on things you sell could get the shop taken down.

## Publishing

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Point it at this folder, then point `joehenley.com` at the host.
