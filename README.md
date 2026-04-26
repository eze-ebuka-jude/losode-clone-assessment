# **Losode - Ecommerce Application**

A modern, full-stack ecommerce application built with **Next.js 16**, **React 19**, and **TypeScript**. Losode features a seamless shopping experience with product browsing, cart management, secure checkout, and integrated payment processing using **Paystack**.

## **Features**

✨ **Core Features:**

- **Product Browsing** - Browse products with filtering and search capabilities
- **Shopping Cart** - Add/remove items, persistent cart storage
- **Checkout System** - Multi-step checkout process with customer information collection
- **Secure Payment Processing** - Integrated Paystack payment gateway
- **Order Management** - Order confirmation and verification
- **Responsive Design** - Mobile-friendly UI using Ant Design components
- **Performance Optimized** - Image optimization, code splitting, lazy loading with Suspense

---

## **Tech Stack**

### **Frontend Framework**

- **Next.js** `16.2.4` - React meta-framework with App Router
- **React** `19.2.4` - UI library
- **TypeScript** `5` - Type-safe development

### **UI & Styling**

- **Ant Design** `6.3.6` - Component library with icons
- **Tailwind CSS** `4` - Utility-first CSS framework
- **Ant Design Icons** `6.1.1` - Icon set

### **State Management**

- **Redux Toolkit** `2.11.2` - State management
- **React-Redux** `9.2.0` - React bindings for Redux
- **Redux-Persist** `6.0.0` - Local storage persistence

### **Data Fetching**

- **React Query (TanStack Query)** `5.100.1` - Server state management
- **Axios** `1.15.2` - HTTP client

### **Development Tools**

- **ESLint** `9` - Code linting
- **PostCSS** `4` - CSS transformation

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** `18.17.0` or higher
- **npm** or **yarn** package manager
- **Paystack Account** (for payment processing)

---

## **Setup Instructions**

### **Step 1: Clone the Repository**

```bash
git clone <repository-url>
cd losode-app
```

### **Step 2: Install Dependencies**

```bash
npm install
# or
yarn install
```

### **Step 3: Configure Environment Variables**

## Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables) section)

## **Environment Variables**

Create a `.env.local` file in the root directory with the following variables:

```env
# Paystack Payment Gateway
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# API Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://dummyjson.com

# Application
NODE_ENV=development
```

### **Getting Paystack Keys:**

1. Visit [Paystack Dashboard](https://dashboard.paystack.com)
2. Sign in or create an account
3. Navigate to **Settings → Developer**
4. Copy your **Public Key** and **Secret Key**
5. Use `pk_test_` and `sk_test_` for development
6. Use `pk_live_` and `sk_live_` for production

> ⚠️ **Important**: Never commit `.env.local` to version control. Add it to `.gitignore`.

---

## **Running the Application**

### **Development Server**

Start the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### **Production Build**

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### **Linting**

Check code quality:

```bash
npm run lint
```

---

## **State Management**

The application uses **local state** as well as **Redux Toolkit** with **Redux-Persist** for state management.

---

### **Environment Variables for Production**

Update `.env.local` with production values:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production
```

---

### **Code Standards**

- Use TypeScript for type safety
- Follow ESLint rules: `npm run lint`
- Write meaningful commit messages
- Test components before submitting PR
