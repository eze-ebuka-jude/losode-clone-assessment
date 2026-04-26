# Paystack Integration Setup Guide

This document outlines the setup required to complete the Paystack payment integration for the Losode ecommerce app.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Paystack Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Your API URL (for Paystack webhooks)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Getting Your Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com)
2. Create an account or log in
3. Navigate to **Settings → Developer**
4. Copy your **Public Key** and **Secret Key**
5. For testing, use test keys (starting with `pk_test_` and `sk_test_`)
6. For production, use live keys (starting with `pk_live_` and `sk_live_`)

## File Structure Created

```
src/
├── types/
│   └── paystack.ts              # Paystack TypeScript types
├── lib/
│   ├── paystack.ts              # Paystack API helpers
│   └── store/slices/
│       └── checkoutSlice.ts      # Redux slice for checkout state
├── components/Checkout/
│   ├── Checkout.tsx             # Main checkout orchestrator component
│   ├── PaymentForm.tsx          # Customer information form
│   ├── OrderSummary.tsx         # Order summary display
│   ├── OrderConfirmation.tsx    # Success confirmation page
│   └── PaymentError.tsx         # Error handling component
├── app/
│   ├── checkout/
│   │   ├── page.tsx             # Checkout page route
│   │   └── confirmation/
│   │       └── page.tsx         # Confirmation page route
│   └── api/payment/
│       ├── initiate/route.ts    # Payment initialization endpoint
│       ├── verify/route.ts      # Payment verification endpoint
│       └── webhook/route.ts     # Paystack webhook handler
```

## Implementation Details

### 1. Types (`src/types/paystack.ts`)

Defines all TypeScript interfaces for:

- `CheckoutFormData`: Customer shipping information
- `PaystackInitializeResponse`: Response from Paystack payment initialization
- `PaystackVerifyResponse`: Response from payment verification
- `Order`: Order object structure
- Payment request/response types

### 2. API Helpers (`src/lib/paystack.ts`)

Core functions for Paystack integration:

- `initializePayment()`: Start a payment transaction
- `verifyPayment()`: Verify payment completion
- `generatePaymentReference()`: Create unique order references
- `calculateTotalAmount()`: Sum up cart totals
- `validatePaystackWebhook()`: Validate webhook signatures

### 3. Redux Slice (`src/lib/store/slices/checkoutSlice.ts`)

State management for checkout:

- `setCheckoutForm`: Store customer information
- `setProcessing`: Track payment processing state
- `setError`: Store error messages
- `setOrder`: Store completed order
- `clearCheckout`: Reset checkout state

### 4. API Routes

#### `/api/payment/initiate` (POST)

**Purpose**: Initialize payment with Paystack
**Input**:

```json
{
  "checkoutForm": { email, firstName, lastName, phone, address, city, state, zipCode, country },
  "cartItems": [{ productId, product: { title, price }, quantity }]
}
```

**Output**:

```json
{
  "success": true,
  "reference": "ORD-1234567890-abc123",
  "authorization_url": "https://checkout.paystack.com/...",
  "access_code": "...",
  "totalAmount": 50000
}
```

#### `/api/payment/verify` (POST)

**Purpose**: Verify payment after user returns from Paystack
**Input**:

```json
{
  "reference": "ORD-1234567890-abc123"
}
```

**Output**:

```json
{
  "success": true,
  "status": "success",
  "reference": "ORD-1234567890-abc123",
  "amount": 50000,
  "order": {
    /* order details */
  }
}
```

#### `/api/payment/webhook` (POST)

**Purpose**: Receive payment events from Paystack

- Add this URL to Paystack dashboard: `https://yourdomain.com/api/payment/webhook`
- Handles: `charge.success`, `charge.failed`, `transfer.success`, `transfer.failed`

### 5. Components

#### `Checkout.tsx` (Main Orchestrator)

- Manages checkout workflow (form → payment → confirmation)
- Handles payment initialization and verification
- Manages error states
- Redirects based on cart state

#### `PaymentForm.tsx`

- Ant Design form with customer information fields
- Client-side validation
- Loading states during submission

#### `OrderSummary.tsx`

- Displays cart items with prices
- Calculates subtotal, tax, and total
- Shows "Pay Now" button

#### `OrderConfirmation.tsx`

- Shows success message
- Displays order details and reference
- Copy-to-clipboard functionality for order reference
- Shows customer shipping information

#### `PaymentError.tsx`

- Error display with retry/cancel options
- Recovery instructions for failed payments

## Payment Flow Diagram

```
1. User navigates to /checkout with items in cart
   ↓
2. PaymentForm collects customer information
   ↓
3. User submits form → calls /api/payment/initiate
   ↓
4. Frontend receives authorization_url from Paystack
   ↓
5. User redirected to Paystack payment page
   ↓
6. User completes payment (success or fails)
   ↓
7. Paystack redirects back to /checkout?reference=ORD-...
   ↓
8. Frontend calls /api/payment/verify with reference
   ↓
9. Backend verifies with Paystack servers
   ↓
10. Show confirmation page OR error page
```

## Testing with Paystack

### Test Cards

Use these in test mode:

| Card Number         | CVV          | Expiry          |
| ------------------- | ------------ | --------------- |
| 4084 0085 5050 0446 | Any 3 digits | Any future date |
| 5399 8343 1983 1381 | Any 3 digits | Any future date |

### Test OTP

Enter `123456` when prompted

## Next Steps for Production

1. **Database Integration**
   - Update `/api/payment/verify` to save orders to database
   - Store customer info and payment status
   - Create order ID and track order history

2. **Email Notifications**
   - Send confirmation email to customer
   - Send order notification to admin

3. **Cart Clearing**
   - After successful payment, dispatch `clearCart()` action
   - Update in `Checkout.tsx` line 138

4. **Webhook Implementation**
   - Add database updates in `/api/payment/webhook`
   - Handle refunds and failed charges
   - Send notifications based on events

5. **Security Enhancements**
   - Add rate limiting on payment endpoints
   - Implement CSRF protection (built-in Next.js)
   - Add request signing/verification

6. **Error Handling**
   - Add retry logic for failed API calls
   - Implement exponential backoff for retries
   - Add logging/monitoring

7. **UI/UX Improvements**
   - Add loading animations
   - Implement success toast notifications
   - Add order tracking page

## Troubleshooting

### "Failed to initialize payment"

- Check if `PAYSTACK_SECRET_KEY` is correctly set
- Verify cart items have valid prices
- Check network connection to Paystack API

### "Payment verification failed"

- Ensure `reference` from URL matches order reference
- Check if payment was actually completed in Paystack
- Verify webhook is configured correctly

### Cart not clearing after payment

- Uncomment `dispatch(clearCart())` in Checkout.tsx
- Import `clearCart` from cartSlice
- Ensure Redux store is properly configured

## API Documentation References

- [Paystack API Docs](https://paystack.com/docs/api/)
- [Paystack Webhooks](https://paystack.com/docs/webhooks/)
- [Initialize Transaction](https://paystack.com/docs/api/transaction/#initialize)
- [Verify Transaction](https://paystack.com/docs/api/transaction/#verify)
