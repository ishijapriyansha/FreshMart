# FreshMart Groceries

A modern e-commerce application for grocery shopping built with React, TypeScript, and Tailwind CSS.

## Features

- Browse products by category (Fruit, Drinks, Bakery)
- Search functionality
- Shopping cart with real-time updates
- Special offers and discounts
  - Buy 6 cans of Coca-Cola, get 1 free
  - Buy 3 croissants, get a free coffee
- Responsive design for all devices
- Real-time stock updates
- Checkout process

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
(Make sure all adblocker extensions are disabled)
1. Clone the repository
```bash
git clone https://github.com/ishijapriyansha/FreshMart
cd QURB
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Implementation Details

### Architecture

The application follows a modern React architecture with:
- State management using Zustand
- Component-based structure
- TypeScript for type safety
- Tailwind CSS for styling

### Key Components

1. **Product Management**
   - Products are fetched from the API and cached
   - Category filtering and search functionality
   - Real-time stock level display
   - Responsive product grid layout

2. **Shopping Cart**
   - Real-time cart updates
   - Quantity management
   - Special offers automatically applied
   - Persistent cart state across pages

3. **Special Offers System**
   - Automatic application of offers when conditions are met
   - Clear display of free items in cart
   - Real-time recalculation when cart changes

### Business Logic

1. **Product Display**
   - Stock levels influence UI:
     - "Available" shown for 10+ items
     - Exact count shown for <10 items
     - Add to cart disabled when out of stock

2. **Cart Management**
   - Add/remove items
   - Quantity adjustments
   - Real-time total calculation
   - Special offers automatically applied/removed

3. **Offer Implementation**
   - System monitors cart for offer triggers
   - Free items added automatically
   - Offers removed if conditions no longer met
   - Clear labeling of free items

4. **Search and Filtering**
   - Real-time search across:
     - Product names
     - Descriptions
     - Categories
   - Category-based filtering
   - Combined search and category filtering

### Data Flow

1. **Product Data**
   ```
   API → useProductStore → ProductGrid → ProductCard
   ```

2. **Cart Operations**
   ```
   ProductCard → useCartStore → CartItem → OrderSummary
   ```

3. **Offer Processing**
   ```
   useCartStore → offers.ts → Cart Display
   ```

### Error Handling

- API failures gracefully handled
- Loading states for better UX
- Fallback UI for empty states
- Type-safe operations with TypeScript

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Lucide React 
- Vite 