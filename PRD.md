# 📋 Product Requirements Document (PRD)
## LuxHome — E-CRM Single-Product Ecommerce Platform
### Luxury House Lamps · Academic E-CRM Project

---

> **Document Version:** 1.0.0  
> **Status:** Active  
> **Type:** Academic Project — E-CRM Validation Study  
> **Product:** Premium Luxury House Lamps  
> **Last Updated:** 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Objectives](#2-objectives)
3. [E-CRM Concepts Validated](#3-e-crm-concepts-validated)
4. [Tech Stack & Architecture](#4-tech-stack--architecture)
5. [Features Specification](#5-features-specification)
6. [User Stories](#6-user-stories)
7. [Database Schema](#7-database-schema)
8. [API Structure](#8-api-structure)
9. [Folder Structure](#9-folder-structure)
10. [Admin Flows](#10-admin-flows)
11. [E-CRM Logic Implementation](#11-e-crm-logic-implementation)
12. [Implementation Phases](#12-implementation-phases)
13. [UI/UX Design System](#13-uiux-design-system)
14. [Future Improvements](#14-future-improvements)
15. [Technical Constraints](#15-technical-constraints)
16. [Deployment Strategy](#16-deployment-strategy)

---

## 1. Project Overview

### 1.1 Summary

**LuxHome** is a single-product B2C ecommerce platform purpose-built as an academic project to validate and demonstrate core **Electronic Customer Relationship Management (E-CRM)** concepts. The platform sells one exclusive product: **a premium luxury house lamp**, positioned as an aspirational lifestyle accessory for modern interiors.

The entire system — from storefront to analytics dashboard — is designed to capture, track, and analyze customer data in a way that illustrates real-world E-CRM principles: who buys, how often, how profitable they are, and how engaged they remain.

### 1.2 Product

| Attribute | Detail |
|---|---|
| Product Name | *LuxGlow Signature Lamp* (configurable) |
| Category | Premium Home Lighting / Interior Design |
| Brand Positioning | Luxury, minimalist, architectural lighting |
| Target Customer | Interior design enthusiasts, homeowners 25–55 |
| Price Range | Premium (configurable by admin) |

### 1.3 Business Context

This is **not** a marketplace. The deliberate constraint of a single product forces the system to derive all customer intelligence from behavioral signals: frequency of purchases, feedback activity, order value, and re-engagement patterns. This mirrors real-world CRM scenarios where product diversity is limited but customer data depth is maximized.

---

## 2. Objectives

### 2.1 Academic Objectives

- Demonstrate the implementation of a functional E-CRM system from scratch
- Validate four core E-CRM dimensions using real transactional data
- Build a complete full-stack application using modern industry-grade tooling
- Produce actionable customer analytics through an admin dashboard

### 2.2 Business Objectives

| # | Objective | Metric |
|---|---|---|
| 1 | Capture and retain customer profiles | Total registered clients |
| 2 | Encourage repeat purchases | Purchase frequency rate |
| 3 | Maximize revenue per customer | Customer profitability score |
| 4 | Measure customer engagement | Feedback submission rate |
| 5 | Enable targeted communication | Email campaign open rate |

### 2.3 System Goals

- Provide a seamless, premium shopping experience on the public storefront
- Give administrators full visibility and control over customers, orders, and feedback
- Automate customer identification (new vs. returning) at the point of purchase
- Generate visual CRM analytics without external BI tools

---

## 3. E-CRM Concepts Validated

### 3.1 Purchase Frequency

**Definition:** How often a customer returns to place additional orders.

**Implementation:**
- Each order is timestamped and linked to a client via email
- The system counts total orders per client and calculates average days between purchases
- Customers are segmented into: `One-Time`, `Returning`, `Loyal`, `Champion`
- Admin dashboard displays a frequency distribution chart

**Formula:**
```
Purchase Frequency Score = Total Orders by Client / Total Days as Customer × 30
```

---

### 3.2 Customer Attitude

**Definition:** The sentiment and disposition of customers toward the brand, measured through voluntary feedback.

**Implementation:**
- Footer feedback form available on all public pages
- Only verified existing clients (matched by email) can submit feedback
- Feedback stored in database with timestamp and client linkage
- Admin can view, filter, and flag feedback
- Attitude score derived from: feedback submission rate + message length as engagement proxy

**Formula:**
```
Attitude Index = (Clients with Feedback / Total Clients) × 100
```

---

### 3.3 Customer Profitability

**Definition:** The net revenue contribution of a customer relative to the cost of serving them.

**Implementation:**
- Total spent per client calculated from all completed orders
- Clients ranked by lifetime value (LTV)
- Profitability tiers assigned: `Bronze`, `Silver`, `Gold`, `Platinum`
- Admin dashboard shows a profitability distribution chart and top-10 clients by revenue

**Formula:**
```
Customer LTV = SUM(order.total_price) WHERE client_id = X AND status = 'completed'
Profitability Tier:
  Bronze   → LTV < 1× avg order value
  Silver   → LTV 1–3× avg order value
  Gold     → LTV 3–6× avg order value
  Platinum → LTV > 6× avg order value
```

---

### 3.4 Customer Engagement

**Definition:** The depth and consistency of customer interaction with the brand across touchpoints.

**Implementation:**
- Engagement is composite: orders + feedback + email campaigns received
- Engagement score calculated per client
- Clients flagged as `Dormant`, `Passive`, `Active`, or `Highly Engaged`
- Admin can trigger re-engagement email campaigns targeting dormant segments

**Formula:**
```
Engagement Score = (Order Count × 3) + (Feedback Count × 5) + (Days Since Last Order < 60 ? 2 : 0)
Segments:
  Dormant       → Score 0–3
  Passive       → Score 4–8
  Active        → Score 9–15
  Highly Engaged → Score > 15
```

---

## 4. Tech Stack & Architecture

### 4.1 Technology Stack

#### Frontend
| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | Full-stack React framework |
| TypeScript | 5.x | Type safety across the codebase |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn/ui | Latest | Accessible UI component library |
| Recharts | 2.x | Data visualization for analytics |
| React Hook Form | 7.x | Performant form management |
| Zod | 3.x | Schema validation (client & server) |

#### Backend
| Tool | Version | Purpose |
|---|---|---|
| Next.js API Routes | 15 | Server-side API endpoints |
| Supabase | Local (Docker) | Auth, database hosting, realtime |
| PostgreSQL | 15.x | Primary relational database |
| Prisma ORM | 5.x | Type-safe database client & migrations |
| Resend | Latest | Transactional & marketing emails |

#### DevOps & Tooling
| Tool | Purpose |
|---|---|
| Docker | Local Supabase instance |
| Docker Compose | Service orchestration |
| ESLint + Prettier | Code quality |
| Husky | Pre-commit hooks |

---

### 4.2 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
│  ┌─────────────────────┐    ┌──────────────────────────────┐   │
│  │   Public Storefront  │    │      Admin Dashboard          │   │
│  │  / · /product        │    │  /admin/*                     │   │
│  └─────────┬───────────┘    └──────────────┬───────────────┘   │
└────────────┼──────────────────────────────┼────────────────────┘
             │ HTTP/HTTPS                    │ HTTP/HTTPS
             ▼                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 SERVER                            │
│  ┌───────────────────────┐  ┌──────────────────────────────┐   │
│  │   React Server        │  │   API Routes                  │   │
│  │   Components (RSC)    │  │   /api/clients                │   │
│  │   + Client Components │  │   /api/orders                 │   │
│  └───────────────────────┘  │   /api/feedbacks              │   │
│                              │   /api/products               │   │
│                              │   /api/admin/*                │   │
│                              │   /api/campaigns              │   │
│                              └──────────────┬───────────────┘   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
              ┌───────────────────────────────┤
              ▼                               ▼
┌─────────────────────┐         ┌─────────────────────────────┐
│   SUPABASE (Docker) │         │         RESEND API           │
│  ┌───────────────┐  │         │   Transactional emails       │
│  │  PostgreSQL   │  │         │   Marketing campaigns        │
│  │  (via Prisma) │  │         └─────────────────────────────┘
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Supabase     │  │
│  │  Auth (admin) │  │
│  └───────────────┘  │
└─────────────────────┘
```

### 4.3 Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | SSG + ISR | Static landing page, updated on product change |
| `/product` | SSR | Real-time stock & price data |
| `/admin/*` | CSR (protected) | Dynamic, auth-gated dashboard |
| `/api/*` | Edge/Node runtime | API endpoints |

---

## 5. Features Specification

### 5.1 Public Website

#### 5.1.1 Home Page (`/`)

The landing page establishes the brand identity of LuxHome and showcases the lamp collection with a premium aesthetic.

**Sections:**

| Section | Description |
|---|---|
| **Navigation** | Logo, minimal nav links, cart icon placeholder |
| **Hero** | Full-width cinematic image of the lamp, tagline, CTA button |
| **Product Highlight** | 3-column feature cards: Design, Quality, Elegance |
| **Ambience Gallery** | 3–4 lifestyle photos of the lamp in interior settings |
| **Why LuxGlow** | Icon list of key selling points |
| **Testimonial Preview** | Static curated testimonials (brand trust) |
| **CTA Banner** | Full-width warm-toned CTA: "Illuminate Your Space" → `/product` |
| **Footer** | Logo, links, feedback system, social icons |

**Design Tokens:**
- Color palette: Warm gold (`#C9A84C`), deep charcoal (`#1A1A1A`), ivory white (`#FAF7F0`)
- Typography: Serif for headings (Playfair Display), Sans for body (Inter)
- Motion: Framer Motion subtle entrance animations

---

#### 5.1.2 Product Page (`/product`)

The single-product detail page where all conversions happen.

**Left Column — Media:**
- Primary product image (large, high-resolution)
- Thumbnail gallery (3–5 angles)
- Zoom on hover

**Right Column — Details:**
- Product name + subtitle
- Star rating (static or from feedback count)
- Price (fetched from database)
- Short description (3 lines)
- Quantity selector (min: 1, max: 10, or stock limit)
- Stock status badge (`In Stock`, `Low Stock`, `Out of Stock`)
- Long description accordion (Material, Dimensions, Care)
- Delivery info badge

**Order Form (below or side panel):**

| Field | Type | Validation |
|---|---|---|
| Full Name | Text input | Required, min 2 chars |
| Email | Email input | Required, valid email format |
| Phone | Tel input | Required, Moroccan/international format |
| City | Text input | Required |
| Quantity | Number | Min 1, max stock |
| Message | Textarea | Optional, max 500 chars |

**On Form Submission:**
1. Validate all fields with Zod schema
2. POST to `/api/orders`
3. API checks if client email exists → create or retrieve client
4. Create order record linked to client
5. Calculate `total_price = quantity × product.price`
6. Send confirmation email to client (via Resend)
7. Show success modal with order summary
8. Display order reference number

---

#### 5.1.3 Footer Feedback System

Persistent across all public pages.

**Fields:**
- Email address
- Feedback textarea (max 1000 chars)
- Submit button

**Logic Flow:**
```
User submits feedback
        ↓
Validate email format (Zod)
        ↓
POST /api/feedbacks
        ↓
Query: SELECT * FROM clients WHERE email = ?
        ↓
Found?
  YES → Create feedback record → Show success message
  NO  → Return 403 → Show "Only existing customers can submit feedback"
```

---

### 5.2 Admin Dashboard (`/admin`)

#### 5.2.1 Authentication

- Email + password login form
- Credentials matched against `admins` table (bcrypt hashed passwords)
- Session managed via Supabase Auth or JWT stored in httpOnly cookie
- All `/admin/*` routes protected by middleware
- Redirect to `/admin/login` if unauthenticated

---

#### 5.2.2 Dashboard Overview (`/admin/dashboard`)

**KPI Cards Row:**

| KPI | Calculation |
|---|---|
| Total Revenue | SUM of all completed order total_prices |
| Total Clients | COUNT of clients table |
| Total Orders | COUNT of commands table |
| Avg Order Value | Total Revenue / Total Orders |
| Feedback Rate | Clients with feedbacks / Total Clients × 100 |
| Repeat Purchase Rate | Clients with orders > 1 / Total Clients × 100 |

**Charts:**

| Chart | Type | Data |
|---|---|---|
| Monthly Revenue | Line chart | Revenue grouped by month |
| Orders Over Time | Bar chart | Orders count per month |
| Customer Segments | Pie chart | Engagement tiers distribution |
| Top Cities | Horizontal bar | Orders count per city |
| Profitability Distribution | Bar | Clients per profitability tier |
| Purchase Frequency | Histogram | Order counts per customer |

---

#### 5.2.3 Client Management (`/admin/clients`)

**Table Columns:**
- Client ID (short hash)
- Full Name
- Email
- Phone
- City
- Total Orders
- Total Spent (LTV)
- Profitability Tier (badge)
- Engagement Score
- Registered Date
- Actions

**Features:**
- Search by name or email
- Filter by city, tier, engagement level
- Sort by any column
- Click to expand client profile (order history, feedbacks)
- Export to CSV

**Client Profile View:**
- All personal details
- Order history table
- Submitted feedbacks
- Computed E-CRM metrics (LTV, frequency, engagement score, tier)

---

#### 5.2.4 Orders Management (`/admin/orders`)

**Table Columns:**
- Order ID
- Client Name (linked)
- Product
- Quantity
- Total Price
- Status (badge: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`)
- Order Date
- Actions (change status, view details)

**Features:**
- Filter by status
- Date range filter
- Search by client name or order ID
- Bulk status update

---

#### 5.2.5 Feedback Management (`/admin/feedbacks`)

**Table Columns:**
- Feedback ID
- Client Name (linked)
- Email
- Message (truncated, expandable)
- Submitted At
- Actions (view full, delete)

**Features:**
- Keyword search in messages
- Date filter
- Client link to profile

---

#### 5.2.6 Product Management (`/admin/product`)

Single product configuration panel.

| Field | Type |
|---|---|
| Product Name | Text input |
| Description (short) | Textarea |
| Description (long) | Rich text / Markdown |
| Price | Number input (currency) |
| Stock | Number input |
| Images | File upload (multiple) → stored in Supabase Storage |
| Status | Toggle (active/inactive) |

---

#### 5.2.7 Email Marketing (`/admin/campaigns`)

**Compose Panel:**
- Subject line input
- Rich text email body (with basic formatting)
- Preview panel
- Recipient count badge: "Will send to X clients"
- Send button

**Campaign History Table:**
- Subject
- Sent At
- Recipients Count
- Status

**Logic:**
```
Admin composes and sends campaign
        ↓
POST /api/admin/campaigns
        ↓
Fetch all client emails from database
        ↓
Loop: Resend.send({ to: client.email, subject, html }) for each
        ↓
Log campaign to campaigns table (future entity)
        ↓
Return success count
```

---

## 6. User Stories

### 6.1 Public User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Visitor | See an elegant landing page | I can understand the brand and product |
| US-02 | Visitor | View detailed product information | I can decide to purchase |
| US-03 | Visitor | Select a quantity and fill my details | I can place an order |
| US-04 | New Customer | Submit my order | I receive a confirmation email |
| US-05 | Returning Customer | Place another order with the same email | My order is linked to my existing profile |
| US-06 | Customer | Submit feedback via the footer | I can share my experience |
| US-07 | Non-customer | Be told I cannot submit feedback | I understand the system's logic |
| US-08 | Customer | Receive an order confirmation email | I have proof of my purchase |

### 6.2 Admin User Stories

| ID | As an... | I want to... | So that... |
|---|---|---|---|
| US-09 | Admin | Log in securely | Only I can access the dashboard |
| US-10 | Admin | See KPIs at a glance | I can quickly assess business health |
| US-11 | Admin | View all clients with CRM metrics | I can identify my best customers |
| US-12 | Admin | Click a client to see full profile | I can understand individual customer history |
| US-13 | Admin | Filter clients by engagement tier | I can target specific segments |
| US-14 | Admin | See all orders and change statuses | I can manage fulfillment |
| US-15 | Admin | Read customer feedback | I can understand customer attitude |
| US-16 | Admin | Update product details and stock | I can manage inventory |
| US-17 | Admin | Write and send email campaigns | I can re-engage dormant customers |
| US-18 | Admin | View revenue and growth charts | I can track business growth |

---

## 7. Database Schema

### 7.1 Entity Relationship Diagram (Text)

```
clients (1) ──────────< commands (M)
clients (1) ──────────< feedbacks (M)
products (1) ─────────< commands (M)
admins (standalone — auth only)
```

### 7.2 Full Schema (Prisma SDL)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// CLIENTS
// ─────────────────────────────────────────
model Client {
  id         String     @id @default(cuid())
  full_name  String
  email      String     @unique
  phone      String
  city       String
  created_at DateTime   @default(now())
  updated_at DateTime   @updatedAt

  commands   Command[]
  feedbacks  Feedback[]

  @@map("clients")
}

// ─────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────
model Product {
  id               String    @id @default(cuid())
  name             String
  description      String
  long_description String?
  price            Decimal   @db.Decimal(10, 2)
  image_url        String
  image_gallery    String[]  // Array of image URLs
  stock            Int       @default(0)
  is_active        Boolean   @default(true)
  created_at       DateTime  @default(now())
  updated_at       DateTime  @updatedAt

  commands         Command[]

  @@map("products")
}

// ─────────────────────────────────────────
// COMMANDS (ORDERS)
// ─────────────────────────────────────────
model Command {
  id          String        @id @default(cuid())
  client_id   String
  product_id  String
  quantity    Int
  total_price Decimal       @db.Decimal(10, 2)
  status      CommandStatus @default(PENDING)
  message     String?
  created_at  DateTime      @default(now())
  updated_at  DateTime      @updatedAt

  client      Client        @relation(fields: [client_id], references: [id])
  product     Product       @relation(fields: [product_id], references: [id])

  @@map("commands")
}

enum CommandStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

// ─────────────────────────────────────────
// FEEDBACKS
// ─────────────────────────────────────────
model Feedback {
  id         String   @id @default(cuid())
  client_id  String
  message    String
  created_at DateTime @default(now())

  client     Client   @relation(fields: [client_id], references: [id])

  @@map("feedbacks")
}

// ─────────────────────────────────────────
// ADMINS
// ─────────────────────────────────────────
model Admin {
  id            String   @id @default(cuid())
  email         String   @unique
  password_hash String
  created_at    DateTime @default(now())

  @@map("admins")
}

// ─────────────────────────────────────────
// EMAIL CAMPAIGNS (optional tracking)
// ─────────────────────────────────────────
model Campaign {
  id              String   @id @default(cuid())
  subject         String
  body            String
  recipients_count Int     @default(0)
  status          String   @default("sent")
  sent_at         DateTime @default(now())

  @@map("campaigns")
}
```

### 7.3 Computed Fields (Application Layer)

These are not stored in the database but computed on-the-fly by the API:

| Field | Entity | Formula |
|---|---|---|
| `total_spent` | Client | `SUM(commands.total_price)` |
| `order_count` | Client | `COUNT(commands)` |
| `profitability_tier` | Client | Based on LTV thresholds |
| `engagement_score` | Client | Composite formula (Section 3.4) |
| `engagement_segment` | Client | Based on engagement score |
| `purchase_frequency` | Client | Orders per 30-day period |
| `days_since_last_order` | Client | `NOW() - MAX(commands.created_at)` |

---

## 8. API Structure

### 8.1 Public API Routes

#### Orders

```
POST   /api/orders
```
**Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "quantity": "number",
  "message": "string (optional)"
}
```
**Logic:** Upsert client → Create order → Send email → Return order summary

---

#### Feedbacks

```
POST   /api/feedbacks
```
**Body:**
```json
{
  "email": "string",
  "message": "string"
}
```
**Logic:** Verify client exists → Create feedback or return 403

---

#### Product

```
GET    /api/product
```
**Returns:** Product details, price, stock, images

---

### 8.2 Admin API Routes (Protected — require auth cookie)

#### Auth

```
POST   /api/admin/login
POST   /api/admin/logout
GET    /api/admin/me
```

#### Dashboard Analytics

```
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/revenue?period=monthly
GET    /api/admin/analytics/orders?period=monthly
GET    /api/admin/analytics/cities
GET    /api/admin/analytics/segments
```

#### Clients

```
GET    /api/admin/clients
GET    /api/admin/clients/:id
GET    /api/admin/clients/:id/orders
GET    /api/admin/clients/:id/feedbacks
```

**Query params:** `?search=&city=&tier=&segment=&page=&limit=`

#### Orders

```
GET    /api/admin/orders
GET    /api/admin/orders/:id
PATCH  /api/admin/orders/:id/status
```

**Body for PATCH:**
```json
{ "status": "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" }
```

#### Feedbacks

```
GET    /api/admin/feedbacks
DELETE /api/admin/feedbacks/:id
```

#### Product

```
GET    /api/admin/product
PUT    /api/admin/product/:id
POST   /api/admin/product/:id/images
```

#### Campaigns

```
POST   /api/admin/campaigns
GET    /api/admin/campaigns
```

**Body for POST:**
```json
{
  "subject": "string",
  "body": "string (HTML)"
}
```

---

## 9. Folder Structure

```
luxhome/
│
├── prisma/
│   ├── schema.prisma              # Full Prisma schema
│   └── migrations/                # Auto-generated migration files
│
├── public/
│   ├── images/
│   │   ├── hero-lamp.jpg
│   │   ├── lamp-gallery-1.jpg
│   │   ├── lamp-gallery-2.jpg
│   │   └── logo.svg
│   └── fonts/
│
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page (/)
│   │   │
│   │   ├── product/
│   │   │   └── page.tsx           # Product page (/product)
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin layout (auth guard)
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Admin login
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx       # Analytics dashboard
│   │   │   ├── clients/
│   │   │   │   ├── page.tsx       # Clients table
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # Client profile
│   │   │   ├── orders/
│   │   │   │   └── page.tsx       # Orders management
│   │   │   ├── feedbacks/
│   │   │   │   └── page.tsx       # Feedback management
│   │   │   ├── product/
│   │   │   │   └── page.tsx       # Product management
│   │   │   └── campaigns/
│   │   │       └── page.tsx       # Email campaigns
│   │   │
│   │   └── api/
│   │       ├── orders/
│   │       │   └── route.ts
│   │       ├── feedbacks/
│   │       │   └── route.ts
│   │       ├── product/
│   │       │   └── route.ts
│   │       └── admin/
│   │           ├── login/
│   │           │   └── route.ts
│   │           ├── logout/
│   │           │   └── route.ts
│   │           ├── analytics/
│   │           │   ├── overview/route.ts
│   │           │   ├── revenue/route.ts
│   │           │   └── segments/route.ts
│   │           ├── clients/
│   │           │   ├── route.ts
│   │           │   └── [id]/route.ts
│   │           ├── orders/
│   │           │   ├── route.ts
│   │           │   └── [id]/route.ts
│   │           ├── feedbacks/
│   │           │   ├── route.ts
│   │           │   └── [id]/route.ts
│   │           ├── product/
│   │           │   └── route.ts
│   │           └── campaigns/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── FeedbackWidget.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProductHighlight.tsx
│   │   │   ├── AmbienceGallery.tsx
│   │   │   ├── WhyLuxGlow.tsx
│   │   │   └── CTABanner.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── QuantitySelector.tsx
│   │   │   ├── OrderForm.tsx
│   │   │   └── OrderSuccessModal.tsx
│   │   │
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── dashboard/
│   │       │   ├── KPICard.tsx
│   │       │   ├── RevenueChart.tsx
│   │       │   ├── OrdersChart.tsx
│   │       │   ├── SegmentsChart.tsx
│   │       │   └── CitiesChart.tsx
│   │       ├── clients/
│   │       │   ├── ClientsTable.tsx
│   │       │   ├── ClientProfile.tsx
│   │       │   └── TierBadge.tsx
│   │       ├── orders/
│   │       │   ├── OrdersTable.tsx
│   │       │   └── StatusUpdater.tsx
│   │       ├── feedbacks/
│   │       │   └── FeedbacksTable.tsx
│   │       └── campaigns/
│   │           └── CampaignComposer.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── supabase.ts            # Supabase client
│   │   ├── resend.ts              # Resend client
│   │   ├── auth.ts                # Session helpers
│   │   ├── crm/
│   │   │   ├── metrics.ts         # E-CRM score calculations
│   │   │   ├── segments.ts        # Segmentation logic
│   │   │   └── profitability.ts   # LTV & tier computation
│   │   └── email/
│   │       ├── templates/
│   │       │   ├── order-confirmation.tsx
│   │       │   └── campaign.tsx
│   │       └── sender.ts
│   │
│   ├── hooks/
│   │   ├── useOrderForm.ts
│   │   ├── useFeedback.ts
│   │   └── useAdminData.ts
│   │
│   ├── types/
│   │   ├── client.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   ├── feedback.ts
│   │   └── analytics.ts
│   │
│   └── middleware.ts              # Admin route protection
│
├── docker-compose.yml             # Supabase local stack
├── .env.local                     # Environment variables
├── .env.example
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 10. Admin Flows

### 10.1 Admin Authentication Flow

```
/admin/login
     │
     ▼
Admin enters email + password
     │
     ▼
POST /api/admin/login
     │
     ├─ SELECT admin WHERE email = ?
     │
     ├─ bcrypt.compare(password, hash)
     │         │
     │    ┌────┴────┐
     │   FAIL      PASS
     │    │         │
     │  401       Set httpOnly
     │  Error     session cookie
     │                │
     └────────────────▼
              Redirect → /admin/dashboard
```

### 10.2 Client Profile Analysis Flow

```
Admin opens /admin/clients
     │
     ▼
GET /api/admin/clients (paginated)
     │
     ▼
For each client, compute in parallel:
  ├─ SUM(orders.total_price) → LTV
  ├─ COUNT(orders) → order_count
  ├─ MAX(orders.created_at) → last_order_date
  ├─ COUNT(feedbacks) → feedback_count
  ├─ Profitability tier (LTV thresholds)
  └─ Engagement score (formula)
     │
     ▼
Return enriched client list
     │
     ▼
Table rendered with tier badges & scores
     │
     ▼
Admin clicks client → /admin/clients/:id
     │
     ▼
Full profile: orders, feedbacks, E-CRM metrics
```

### 10.3 Email Campaign Flow

```
Admin opens /admin/campaigns
     │
     ▼
Fills: subject + body (HTML)
     │
     ▼
Clicks "Send Campaign"
     │
     ▼
POST /api/admin/campaigns
     │
     ▼
Fetch all client emails: SELECT email FROM clients
     │
     ▼
For each email:
  Resend.emails.send({
    from: "LuxHome <hello@luxhome.com>",
    to: client.email,
    subject: campaign.subject,
    html: campaign.body
  })
     │
     ▼
Log campaign: INSERT INTO campaigns (...)
     │
     ▼
Return: { success: true, sent: N }
```

### 10.4 Order Status Management Flow

```
Admin opens /admin/orders
     │
     ▼
Sees orders in PENDING status
     │
     ▼
Clicks status dropdown → selects CONFIRMED
     │
     ▼
PATCH /api/admin/orders/:id/status
  { status: "CONFIRMED" }
     │
     ▼
UPDATE commands SET status = 'CONFIRMED'
     │
     ▼
[Optional] Trigger status email to client
     │
     ▼
Table row updates in real-time
```

---

## 11. E-CRM Logic Implementation

### 11.1 `lib/crm/metrics.ts`

```typescript
// Core E-CRM computation module

export interface ClientMetrics {
  client_id: string;
  total_spent: number;
  order_count: number;
  feedback_count: number;
  days_since_last_order: number | null;
  purchase_frequency: number; // orders per 30 days
  profitability_tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  engagement_score: number;
  engagement_segment: 'Dormant' | 'Passive' | 'Active' | 'Highly Engaged';
}

export function computeProfitabilityTier(
  ltv: number,
  avgOrderValue: number
): ClientMetrics['profitability_tier'] {
  if (ltv < avgOrderValue)           return 'Bronze';
  if (ltv < avgOrderValue * 3)       return 'Silver';
  if (ltv < avgOrderValue * 6)       return 'Gold';
  return 'Platinum';
}

export function computeEngagementScore(
  orderCount: number,
  feedbackCount: number,
  daysSinceLastOrder: number | null
): number {
  const recencyBonus = daysSinceLastOrder !== null && daysSinceLastOrder < 60 ? 2 : 0;
  return (orderCount * 3) + (feedbackCount * 5) + recencyBonus;
}

export function computeEngagementSegment(
  score: number
): ClientMetrics['engagement_segment'] {
  if (score <= 3)  return 'Dormant';
  if (score <= 8)  return 'Passive';
  if (score <= 15) return 'Active';
  return 'Highly Engaged';
}

export function computePurchaseFrequency(
  orderCount: number,
  createdAt: Date
): number {
  const daysSinceJoined = Math.max(
    1,
    Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );
  return (orderCount / daysSinceJoined) * 30; // orders per 30-day period
}
```

### 11.2 Segmentation Use Cases

| Segment | Action |
|---|---|
| **Dormant** | Target with re-engagement campaign: "We miss you — Your lamp is waiting" |
| **Passive** | Send product update or stock alert campaign |
| **Active** | Send loyalty appreciation email |
| **Highly Engaged** | Feature in testimonials, send VIP early-access offer |

### 11.3 Profitability Use Cases

| Tier | Action |
|---|---|
| **Bronze** | Encourage second purchase with a campaign |
| **Silver** | Acknowledge with a thank-you email |
| **Gold** | Offer priority order handling |
| **Platinum** | Consider as brand ambassador, personalized message |

---

## 12. Implementation Phases

### Phase 1 — Foundation (Week 1–2)

- [ ] Initialize Next.js 15 project with TypeScript + Tailwind
- [ ] Configure shadcn/ui component library
- [ ] Set up Docker + Supabase local instance
- [ ] Define and migrate Prisma schema
- [ ] Create seed data (1 product, 1 admin)
- [ ] Configure Resend account and domain

**Deliverable:** Working dev environment with database connected

---

### Phase 2 — Public Storefront (Week 2–3)

- [ ] Build Home page with all sections
- [ ] Build Product page with gallery and details
- [ ] Implement Order Form with Zod + React Hook Form validation
- [ ] Build `/api/orders` endpoint (client upsert + order creation)
- [ ] Integrate Resend order confirmation email
- [ ] Build Footer feedback widget
- [ ] Implement `/api/feedbacks` endpoint (client verification)

**Deliverable:** Fully functional public storefront

---

### Phase 3 — Admin Authentication (Week 3)

- [ ] Build admin login page
- [ ] Implement `/api/admin/login` with bcrypt
- [ ] Set up middleware for route protection
- [ ] Build admin layout with sidebar navigation

**Deliverable:** Secure, authenticated admin shell

---

### Phase 4 — Admin CRUD Features (Week 4)

- [ ] Build Clients table and profile view
- [ ] Build Orders table with status management
- [ ] Build Feedbacks management table
- [ ] Build Product management panel
- [ ] Implement all admin API routes

**Deliverable:** Full admin data management

---

### Phase 5 — Analytics & E-CRM (Week 5)

- [ ] Implement E-CRM metrics computation (`lib/crm/`)
- [ ] Build dashboard KPI cards
- [ ] Implement analytics API endpoints
- [ ] Build all Recharts visualizations
- [ ] Apply E-CRM segmentation logic to client table

**Deliverable:** Live analytics dashboard with E-CRM metrics

---

### Phase 6 — Email Campaigns (Week 5–6)

- [ ] Build Campaign Composer UI
- [ ] Implement `/api/admin/campaigns` bulk send
- [ ] Build campaign history table
- [ ] Design HTML email templates (order confirmation, campaign)

**Deliverable:** Working email marketing system

---

### Phase 7 — Polish & QA (Week 6–7)

- [ ] Responsive design QA (mobile, tablet, desktop)
- [ ] Accessibility audit (aria labels, keyboard nav)
- [ ] Performance optimization (images, caching)
- [ ] Error states and loading states
- [ ] Form edge cases and validation hardening
- [ ] Cross-browser testing

**Deliverable:** Production-ready application

---

## 13. UI/UX Design System

### 13.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `primary` | `#C9A84C` | Gold — CTAs, highlights, accents |
| `primary-dark` | `#A07830` | Hover states |
| `background` | `#FAF7F0` | Ivory — page background |
| `surface` | `#FFFFFF` | Cards, panels |
| `text-primary` | `#1A1A1A` | Headings, body text |
| `text-secondary` | `#6B6B6B` | Muted text, captions |
| `border` | `#E8E0D0` | Subtle borders |
| `success` | `#4CAF50` | Order success states |
| `warning` | `#FF9800` | Low stock, pending |
| `danger` | `#F44336` | Errors, cancelled orders |
| `admin-bg` | `#0F0F0F` | Admin sidebar background |
| `admin-surface` | `#1A1A1A` | Admin cards |

### 13.2 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| H1 | Playfair Display | 700 | 3.5rem |
| H2 | Playfair Display | 600 | 2.5rem |
| H3 | Playfair Display | 500 | 1.8rem |
| Body | Inter | 400 | 1rem |
| Caption | Inter | 300 | 0.875rem |
| Label | Inter | 600 | 0.875rem |
| Admin UI | Inter | 400/500 | 0.875–1rem |

### 13.3 Motion Design

- Hero image: fade-in + subtle upward drift (300ms, ease-out)
- Section entries: scroll-triggered fade-in with stagger
- Cards: lift on hover (translateY -4px, shadow deepens)
- Order form submit: loading spinner → checkmark animation
- Admin tables: skeleton loaders before data hydration

### 13.4 Component Conventions

- All form inputs: rounded-lg, border, focus ring in gold
- Buttons: two variants — `primary` (gold fill), `ghost` (outlined)
- Badges: color-coded per tier/status, rounded-full
- Tables: zebra striping, sticky header
- Charts: consistent gold color scheme, tooltip on hover

---

## 14. Future Improvements

| # | Feature | Description |
|---|---|---|
| 1 | **Wishlist / Save for Later** | Let visitors save the product without ordering |
| 2 | **Multi-product support** | Extend schema to support a small catalog |
| 3 | **NPS Survey** | Net Promoter Score sent via email post-delivery |
| 4 | **SMS Notifications** | Order status updates via WhatsApp or SMS |
| 5 | **Customer Portal** | Authenticated area for customers to view their orders |
| 6 | **AI Sentiment Analysis** | Analyze feedback tone using an LLM API |
| 7 | **Referral Tracking** | Track acquisition source per customer |
| 8 | **A/B Testing** | Test different hero messages on conversion rate |
| 9 | **Live Chat Widget** | In-site support chat for pre-purchase questions |
| 10 | **Advanced Filters** | Date-range analytics, cohort analysis in dashboard |
| 11 | **PDF Export** | Export client profiles and analytics as PDF reports |
| 12 | **Supabase Realtime** | Live order count and notification badges in admin |

---

## 15. Technical Constraints

### 15.1 Academic Scope Limitations

| Constraint | Reason |
|---|---|
| Single product only | Keeps E-CRM focus; complexity managed |
| No payment gateway | Academic project — order form simulates checkout |
| No customer login | Orders linked via email, no customer auth needed |
| Local Supabase | Reproducible dev environment without cloud costs |
| Manual delivery tracking | Status updated manually by admin |

### 15.2 Technical Limitations

| Area | Constraint | Mitigation |
|---|---|---|
| Email deliverability | Resend free tier: 100 emails/day | Sufficient for academic scale |
| Image storage | Supabase Storage (local Docker) | Limited to localhost; migrate to cloud for demo |
| Prisma + Next.js 15 | Server components can't use Prisma Client directly | Use API routes or server actions for DB calls |
| Bulk email send | Sequential Resend calls may be slow for large lists | Implement with Promise.allSettled + rate limit |
| Admin auth | Simple session cookie (not production-grade) | Use Supabase Auth for production hardening |

### 15.3 Security Considerations

- Admin routes protected by middleware checking session cookie
- Admin passwords stored as bcrypt hashes (cost factor 12)
- All user inputs validated with Zod on both client and server
- Feedback endpoint validates client existence before accepting submission
- No sensitive data exposed via public API routes
- Environment variables never committed to version control

---

## 16. Deployment Strategy

### 16.1 Local Development

```bash
# 1. Start Supabase local stack
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Push Prisma schema to local DB
npx prisma migrate dev --name init

# 4. Seed initial data
npx prisma db seed

# 5. Start Next.js dev server
npm run dev
```

### 16.2 Environment Variables

```env
# .env.local

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Resend
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="LuxHome <noreply@yourdomain.com>"

# Auth
JWT_SECRET="your-super-secret-jwt-key"
ADMIN_SESSION_SECRET="your-session-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 16.3 Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  supabase-db:
    image: supabase/postgres:15.1.0.147
    ports:
      - "54322:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data

  supabase-studio:
    image: supabase/studio:latest
    ports:
      - "54323:3000"
    environment:
      SUPABASE_URL: http://localhost:54321
      STUDIO_PG_META_URL: http://localhost:54322

volumes:
  postgres-data:
```

### 16.4 Production Deployment (Academic Demo)

For demonstration purposes, the following cloud deployment is recommended:

| Service | Tool | Notes |
|---|---|---|
| Frontend + API | Vercel (free tier) | Next.js native deployment |
| Database | Supabase Cloud (free tier) | Switch from Docker to hosted |
| Email | Resend (free tier) | No config change needed |
| Domain | Custom subdomain (optional) | For academic presentation |

**Migration steps (local → cloud):**
1. Create Supabase project on `supabase.com`
2. Run `prisma migrate deploy` against cloud DB URL
3. Run `prisma db seed` to populate product + admin
4. Update `.env` with cloud credentials
5. Push to GitHub → Vercel auto-deploys

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **E-CRM** | Electronic Customer Relationship Management — the use of digital systems to manage customer interactions and data |
| **LTV** | Lifetime Value — total revenue generated by a single customer |
| **Engagement Score** | Composite numerical score quantifying customer interaction depth |
| **Purchase Frequency** | Average number of orders placed per customer per unit time |
| **Profitability Tier** | Segment label assigned based on LTV relative to average order value |
| **Upsert** | Database operation that inserts a new record or updates an existing one if found |
| **ISR** | Incremental Static Regeneration — Next.js technique to revalidate static pages on demand |
| **RSC** | React Server Components — Next.js 15 components rendered server-side |

---

## Appendix B — Seed Data

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed product
  await prisma.product.upsert({
    where: { id: 'product-luxglow-001' },
    update: {},
    create: {
      id: 'product-luxglow-001',
      name: 'LuxGlow Signature Lamp',
      description: 'An architectural masterpiece that transforms any room into a sanctuary of warm, golden light.',
      long_description: `
        Crafted with precision-blown borosilicate glass and a hand-finished brass base, the LuxGlow Signature Lamp 
        is more than a light source — it is a statement of refined taste. 
        
        The warm 2700K color temperature recreates the golden hour, morning and evening, within your home.
        Compatible with standard E27 bulbs and dimmable fixtures.
      `,
      price: 1299.00,
      image_url: '/images/lamp-hero.jpg',
      image_gallery: [
        '/images/lamp-angle-1.jpg',
        '/images/lamp-angle-2.jpg',
        '/images/lamp-lifestyle.jpg',
      ],
      stock: 50,
      is_active: true,
    },
  });

  // Seed admin
  const hash = await bcrypt.hash('admin123!', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@luxhome.com' },
    update: {},
    create: {
      email: 'admin@luxhome.com',
      password_hash: hash,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

*© 2026 LuxHome E-CRM Academic Project. All rights reserved.*  
*This document is intended for academic and educational purposes only.*
