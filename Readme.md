A dynamic, interactive web interface for customizing your drink set by selecting a bottle and choosing from best-selling flavor pouches. The experience is user-friendly, responsive, and designed to reflect selections in real-time with intuitive UI feedback and live pricing.

📦 Features Overview
✅ 1. Choose the Number of Flavor Sets (Dynamic Adjustment)
Automatically updates based on the total number of flavor pouches selected.

Flavor Set Tabs:

1 Selah Bottle & 4 Flavor Packs

1 Selah Bottle & 10 Flavor Packs

1 Selah Bottle & 16 Flavor Packs

Tab selection adjusts automatically as the user increases or decreases product quantity in the checkout.

✅ 2. Choose Your Bottle
Bottle selection is exclusive — only one bottle can be selected at a time.

On selection:

The bottle is added to the checkout section.

Any previously selected bottle is removed.

The Flavor Set tab in Part 1 updates accordingly (defaults to "1 Selah Bottle & 4 Flavor Packs").

✅ 3. Sort Your Box with Best-Selling Flavors (Category Tabs)
A tabbed interface allows users to switch between product categories like:

Caffeine

Electrolyte

(More categories can be added)

The selected tab:

Highlights with background and white text.

Dynamically updates the visible product list in the next section.

✅ 4. Choose Your Flavor (Quantity Control)
Each product has + and - buttons to control quantity.

When a user:

Clicks +: Product is added to checkout.

Clicks -: Quantity decreases or the product is removed at 0.

Checkout reflects:

Real-time updates.

Accurate total quantities.

Automatic switch of Flavor Set Tabs (as per total quantity logic: 4, 10, 16+).

📌 Example Flow:
User selects 2 Peach Iced Tea + 5 Orange Sport
Checkout shows:

Peach Iced Tea: 2

Orange Sport: 5

Total: 7 products → Flavor set tab switches to 10 Flavor Packs

✅ 5. Final Checkout Section & Progress Bar
Displays all selected products (bottle + flavors).

Progress Bar indicates:

3 products → Minimal fill

8 products → Half-filled

16 & 24 products → Fully filled proportionally

Progress updates dynamically with every interaction.

✅ 6. Dynamic Pricing Checkout Button
Checkout button shows:

Live product count.

Dynamic price ($1 per product).

Example:

20 products → $20

💡 Key Highlights
Fully interactive product selection system.

Seamless user experience with real-time UI updates.

Modular structure: easy to scale or add more product types.

Responsive design for mobile and desktop.

🛠 Tech Stack (Assumed / Recommend Adding if implemented)
HTML, CSS, JavaScript

React / Vue / Angular (ypu can also use)

State Management for real-time UI syncing

SCSS / TailwindCSS for styling

Optional: LocalStorage / Redux / Context API for preserving state

🚀 Setup Instructions
bash
Copy
Edit
# Clone the repository
git clone https://github.com/gauranshsahu/Build-Your-Set.git
cd Build-Your-Set

# Install dependencies (if applicable)
npm install

# Run the app locally
npm start

🙌 Contributors
Gauransh Sahu 