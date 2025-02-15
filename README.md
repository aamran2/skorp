# Next.js SellAuth Demo

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![npm](https://img.shields.io/badge/npm-9-orange?style=flat&logo=npm)](https://npmjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> This is a proof of concept and fun project that might be extended over time with new features and improvements. Feel free to watch this space for updates.

A simple e-commerce demo built with Next.js 15 and integrated with SellAuth. This project showcases a responsive UI using Tailwind CSS and Shadcn UI components.

## Features

- 🚀 Built with Next.js 15 and React 19
- 🎨 Modern UI with Tailwind CSS and Shadcn UI
- 🌙 Dark mode support with next-themes
- 🔒 SellAuth integration for payment processing
- 📱 Fully responsive design

## Getting Started

### Requirements:
- [Node.js](https://nodejs.org/en/download/)

### Installation:
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and update the values:
   ```bash
   NEXT_PUBLIC_SELLAUTH_SHOP_ID=shop_id_here
   NEXT_PUBLIC_SELLAUTH_IS_MODAL=true
   ```

   To get the required IDs:

   **ShopId**
   - Find your Shop ID in the SellAuth Dashboard under API section
   - Visit: https://dash.sellauth.com/api

   **ProductId**
   - View your product IDs in the Products section  
   - Visit: https://dash.sellauth.com/products

   **VariantId**
   - Find variant IDs in the Product Edit page
   - Visit: https://dash.sellauth.com/products/edit/{ProductId}

   After getting the IDs, update the `data/products.ts` file with your SellAuth product and variant IDs:
   ```typescript
   {
     id: 1,
     sellAuthProductId: PRODUCT_ID_HERE,
     variants: [
       {
         sellAuthVariantId: VARIANT_ID_HERE,
       }
     ]
   }
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be running at [http://localhost:2222](http://localhost:2222), 

## Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server with Turbopack

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- SellAuth
