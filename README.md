# ShopVibe 🛒

A clean e-commerce UI I built to practice React fundamentals, state management, and component design.

## What I Built

This is a mini shopping app where you can browse products, search/filter them, and manage a shopping cart. Nothing fancy on the backend - it pulls products from a free API and stores your cart in the browser.

### The Main Stuff

**Product Grid**
- Shows 20 products from DummyJSON API
- Each card has the product image, name, price, category, and stock count
- Stock updates live when you add things to cart

**Search & Filters**
- Type to search (with a small delay so it doesn't lag)
- Pick a category from the dropdown
- Sort by price (low to high or high to low)
- One button to clear everything

**Shopping Cart**
- Slides out from the side
- Add stuff, remove stuff, change quantities
- Can't add more than what's in stock
- Stays saved even if you refresh the page

## Running It Locally

```bash
# grab the code
git clone https://github.com/karanpraja902/BetterWay.git
cd BetterWay

# install stuff
npm install

# start it up
npm run dev
```

Then open http://localhost:5173

## How It's Organized

```
src/
├── components/
│   ├── Header/         → top bar with cart button
│   ├── ProductCard/    → individual product cards
│   ├── ProductGrid/    → the grid of all products
│   ├── Filters/        → search box and dropdowns
│   └── Cart/           → the slide-out cart
├── context/
│   └── CartContext.jsx → where cart state lives
├── hooks/
│   ├── useProducts.js  → fetches products from API
│   └── useDebounce.js  → delays search input
├── App.jsx             → main component
└── index.css           → all the styling
```

## Tech Used

- React 18 with hooks
- Vite for fast dev server
- Context + useReducer for state
- Plain CSS (no libraries)
- localStorage for saving cart

## Things I Focused On

- Keeping components small and focused
- Not re-rendering stuff unnecessarily (used React.memo)
- Making filters work together properly
- Handling edge cases (empty states, out of stock, etc.)
- Clean, readable code

## Notes

Products come from: https://dummyjson.com/products

Feel free to use this as a starting point or reference for your own projects.

---

Made while learning React ✌️
