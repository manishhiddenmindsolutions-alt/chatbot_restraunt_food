# 🍽️ HMS Restaurant — Culinary AI Assistant

HMS Restaurant (powered by **HMS Culinary AI**) is a premium, responsive dining and food discovery web application built with **React**, **TypeScript**, and **Vite**. The platform acts as an intelligent portal for exploring seasonal specials, customizing orders, and managing table checks, leveraging an advanced **n8n orchestration pipeline** as its conversational agent backend.

---

## ✨ Features

*   **💬 AI Culinary Assistant**: Converse with the virtual host in plain English (e.g., *"Show me Italian specialties"*, *"Do you have healthy snacks?"*, or *"Add FD001 to my order"*).
*   **🥗 Dietary & Allergen Auditing**: The assistant audits precise ingredients, caloric metrics, and allergen components dynamically based on user questions.
*   **🛒 Interactive Floating Chat Widget**:
    *   **Tabbed Navigation**: Move seamlessly between **Messages**, **Home**, **Gourmet Database**, and **FAQs**.
    *   **Word-by-Word Streaming**: Renders response updates progressively for a high-end, responsive chat feel.
    *   **Gourmet Card Slider**: Displays matching culinary options with price details, ratings, and instant add-to-order controls inside the conversation bubble.
    *   **Live Check Tab**: Integrates an active customer cart session that tracks total checkout amounts.
*   **📊 Curated Specials Grid**: Displays premium glassmorphic cards listing dish status tags (`Popular`, `Signature`, `Healthy`, `Chef Choice`), calories, ratings, and chef customization buttons.
*   **🔌 Smart Webhook Connection Check**: Executes background pings against the n8n webhook API on startup to display system statuses ("Assistant Online") and fails over to local simulations gracefully.

---

## 🛠️ Technology Stack

*   **Frontend**: React 19, TypeScript, Vite 8
*   **Styling**: Custom Glassmorphic design variables with warm linen themes, responsive typography, and premium micro-animations
*   **Icons**: Lucide React
*   **Backend Integration**: n8n Webhook Pipeline (`https://n8n.propwiseai.in/`)

---

## 📁 File Structure

```text
chatbot_restraunt_food/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and media assets (e.g. gourmet_dish.png)
│   ├── components/         # React application components
│   │   ├── ChatWidget.tsx  # Floating multi-tab AI Chat Widget & Checkout UI
│   │   ├── Header.tsx      # Platform navigation, Kitchen status & Webhook indicators
│   │   ├── Hero.tsx        # Hero banner, action buttons & quick-ask suggestion pills
│   │   └── PropertyGrid.tsx# Featured gourmet menu grid & mockup database (reused property layout)
│   ├── services/
│   │   └── agentService.ts # n8n Webhook API connectors, mock data, and response parsers
│   ├── App.css             # Main layout adjustments
│   ├── App.tsx             # Root page template, startup ping hooks, and header bindings
│   ├── index.css           # Core styling tokens, color schemes, and custom webfonts
│   └── main.tsx            # Application entry point
├── eslint.config.js        # ESLint environment configurations
├── tsconfig.json           # Global TypeScript preferences
└── vite.config.ts          # Vite bundler configurations & API proxy rules
```

---

## 🔌 API & Integration Details

The app communicates with an n8n webhook workflow that manages custom dining recommendations:

*   **Webhook Endpoint**: `https://n8n.propwiseai.in/webhook/72a0f8cd-1e22-4fbf-a324-85d296f738c0`
*   **Vite Local Proxy Route**: `/api-webhook/webhook/72a0f8cd-1e22-4fbf-a324-85d296f738c0` (proxies traffic to bypass CORS during local development)
*   **Request Payload**:
    ```json
    {
      "message": "Recommend Italian dishes",
      "sessionId": "hms_session_x7y8z9"
    }
    ```
*   **Response Handling**: Parses output content structures containing detailed markdown strings and optional lists of structured dish items (`foodItems[]`).

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chatbot_restraunt_food.git
   cd chatbot_restraunt_food
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To run the application locally in development mode with HMR and proxy configurations:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build

Build the project for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Styling and Design Tokens

All styles are configured using CSS variables in `src/index.css` to present a warm, high-end restaurant theme:
*   **Linen Background**: `var(--bg-primary)` (`#faf9f6`)
*   **Card Background**: `var(--bg-secondary)` (`#ffffff`)
*   **Charcoal Text**: `var(--text-primary)` (`#1f1b18`)
*   **Artisan Orange Accent**: `var(--accent-orange)` (`#ea580c`)
*   **Amber Gold Accent**: `var(--accent-gold)` (`#b45309`)
*   **Fresh Green Accent**: `var(--accent-emerald)` (`#16a34a`)
