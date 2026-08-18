---
name: vpmmsdesign
description: VietPay MMS web app design patterns - components, layout, navigation, and UI specifications
---

# VietPay MMS Design System

Design patterns and UI specifications for VietPay Merchant Management System (MMS) web application, extracted from Figma designs.

## Design Principles

1. **Data-dense but scannable**: Show maximum info without overwhelming
2. **Consistent entity distinction**: PVCB vs VietPay always color-coded
3. **Action-oriented**: Primary actions always visible (Export, Filter, Review)
4. **Status-driven**: Visual hierarchy emphasizes current state
5. **Admin-focused**: Professional, efficient, minimal decoration

## Layout Structure

### Screen Dimensions
- **Desktop**: 1440px standard width
- **Content area**: Full width minus sidebar
- **Sidebar**: 217px (expanded), 72px (collapsed), 160px (grouped)

### Grid System
- **Container padding**: 32px horizontal, 24px vertical
- **Content max-width**: Fluid (no constraint)
- **Column gap**: 24px (cards), 16px (form fields)

## Color System

### Brand Colors
```css
--vp-primary-blue: #0066FF;       /* Primary CTA, active states */
--vp-dark-blue: #0A1F44;          /* Sidebar, headers */
--vp-light-blue: #E6F0FF;         /* Light backgrounds */
```

### Entity Colors
```css
--entity-pvcb: #0066FF;           /* PVCB badge */
--entity-vietpay: #8B5CF6;        /* VietPay badge (purple/violet) */
```

### Status Colors
```css
/* Success / Approved */
--status-approved: #10B981;
--status-approved-bg: #D1FAE5;

/* Warning / Pending */
--status-pending: #F59E0B;
--status-pending-bg: #FEF3C7;

/* Error / Rejected */
--status-rejected: #EF4444;
--status-rejected-bg: #FEE2E2;

/* Info / Link Requested */
--status-info: #0EA5E9;
--status-info-bg: #E0F2FE;

/* Neutral / Valid */
--status-valid: #10B981;
--status-valid-bg: #D1FAE5;
```

### Semantic Colors
```css
--text-primary: #1F2937;
--text-secondary: #6B7280;
--text-disabled: #9CA3AF;
--text-inverse: #FFFFFF;

--border-default: #E5E7EB;
--border-focus: #0066FF;
--border-error: #EF4444;

--bg-page: #F9FAFB;
--bg-card: #FFFFFF;
--bg-hover: #F3F4F6;
```

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale
```css
/* Page Titles */
--text-page-title: 32px / 1.2 / 700;      /* Businesses, Overview Dashboard */
--text-section-title: 24px / 1.3 / 600;   /* Transaction Summary */
--text-card-title: 18px / 1.4 / 600;      /* Card headers */

/* Body Text */
--text-large: 16px / 1.5 / 400;           /* Primary content */
--text-base: 14px / 1.5 / 400;            /* Table text, labels */
--text-small: 13px / 1.4 / 400;           /* Secondary info */
--text-tiny: 12px / 1.3 / 400;            /* Captions, footnotes */

/* UI Elements */
--text-button: 14px / 1 / 500;            /* Buttons */
--text-badge: 12px / 1 / 500;             /* Status badges */
--text-tab: 14px / 1 / 500;               /* Tab labels */
```

### Font Weights
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Buttons, tabs, labels
- **Semibold (600)**: Card titles, section headers
- **Bold (700)**: Page titles, emphasized numbers

## Spacing System

**Base unit**: 4px

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Common Spacing Patterns
- **Page padding**: 32px (space-8)
- **Card padding**: 24px (space-6)
- **Section gap**: 24px (space-6)
- **Form field gap**: 16px (space-4)
- **Button padding**: 12px 24px
- **Table cell padding**: 16px 12px

## Navigation

### Sidebar Structure

**3 Variations**:
1. **Full sidebar** (217px): Labels + icons
2. **Grouped sidebar** (160px): Section headers + items
3. **Icon-only** (72px): Icons, labels on hover

#### Sidebar Sections
```
Overview

NETWORK
└─ Network

COMMISSIONS
└─ Commissions

REPORTS
├─ Transactions
├─ Payouts
├─ Invoices
└─ Downloads

MERCHANT MANAGEMENT
├─ Summary
├─ Businesses
├─ Revenue
├─ Applications
└─ Approvals
```

#### Sidebar Item States
```css
/* Default */
background: transparent;
color: rgba(255, 255, 255, 0.7);

/* Hover */
background: rgba(255, 255, 255, 0.1);
color: #FFFFFF;

/* Active */
background: #0066FF;
color: #FFFFFF;
border-radius: 8px;
```

### Top Bar
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] VietPay Admin                    [EN][🔔][DN]   │
│                                                         │
│ Admin / Merchant Management / Businesses               │
└─────────────────────────────────────────────────────────┘
```

**Elements**:
- Logo + product name (left)
- Language selector (top right)
- Notifications (badge counter)
- User profile (avatar + initials)
- Breadcrumb navigation

## Components

### 1. Entity Tabs

**Usage**: Filter by PVCB/VietPay/All

```html
<div class="entity-tabs">
  <button class="tab active">ALL</button>
  <button class="tab">PVCB</button>
  <button class="tab">VIETPAY</button>
</div>
```

**Specs**:
- Height: 40px
- Padding: 8px 16px
- Active: Primary blue background
- Inactive: Transparent, gray text
- Border radius: 6px
- Gap: 8px between tabs

### 2. Status Badge

**Variants**: Approved, Pending, Rejected, Valid, Link Requested

```html
<span class="badge badge-approved">APPROVED</span>
<span class="badge badge-pending">PENDING</span>
<span class="badge badge-rejected">REJECTED</span>
```

**Specs**:
- Height: 24px
- Padding: 4px 12px
- Border radius: 12px (pill)
- Font: 12px / 500 / uppercase
- Background: Light version of status color
- Text: Dark version of status color

**Colors**:
| Status | Background | Text |
|--------|------------|------|
| APPROVED | #D1FAE5 | #065F46 |
| PENDING | #FEF3C7 | #92400E |
| REJECTED | #FEE2E2 | #991B1B |
| VALID | #D1FAE5 | #065F46 |
| LINK REQUESTED | #E0F2FE | #075985 |

### 3. Entity Badge

**Variants**: PVCB (blue), VIETPAY (purple)

```html
<span class="entity-badge entity-pvcb">PVCB</span>
<span class="entity-badge entity-vietpay">VIETPAY</span>
```

**Specs**:
- Height: 22px
- Padding: 3px 10px
- Border radius: 4px
- Font: 11px / 600 / uppercase
- **PVCB**: Blue bg (#E6F0FF), blue text (#0066FF)
- **VIETPAY**: Purple bg (#EDE9FE), purple text (#8B5CF6)

### 4. Search Bar

**Compact style** (before filter button)

```html
<div class="search-bar">
  <icon>search</icon>
  <input type="search" placeholder="Search by merchant name, MID, CCCD, POS serial number">
</div>
```

**Specs**:
- Height: 40px
- Width: Auto-expand (min 300px, max 500px)
- Padding: 10px 16px
- Border: 1px solid #E5E7EB
- Border radius: 8px
- Icon: 20px, left-aligned
- Font: 14px regular
- Focus: Blue border

### 5. Filter Panel

**Dropdown from "Filters" button**

```html
<div class="filter-panel">
  <div class="filter-row">
    <label>Entity Type</label>
    <select><option>All</option></select>
  </div>
  
  <div class="filter-row">
    <label>Status</label>
    <select><option>All Status</option></select>
  </div>
  
  <div class="filter-row">
    <label>From Date</label>
    <input type="date" placeholder="DD/MM/YYYY">
  </div>
  
  <div class="filter-row">
    <label>To Date</label>
    <input type="date" placeholder="DD/MM/YYYY">
  </div>
  
  <div class="filter-row">
    <label>Region</label>
    <select><option>All Regions</option></select>
  </div>
  
  <div class="filter-sort">
    <label>Sort by</label>
    <select><option>Onboarding Date</option></select>
    <button class="sort-toggle">↕</button>
  </div>
  
  <div class="filter-actions">
    <button class="btn-secondary">Clear Filters</button>
    <button class="btn-primary">Apply Filters</button>
  </div>
</div>
```

**Specs**:
- Width: 1100px (full content width)
- Padding: 24px
- Background: White
- Border: 1px solid #E5E7EB
- Border radius: 12px
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
- Gap between rows: 16px

### 6. Data Table

**Standard table pattern**

**Header**:
- Background: #F9FAFB
- Height: 48px
- Font: 13px / 600 / uppercase / #6B7280
- Padding: 16px 12px
- Border bottom: 1px solid #E5E7EB

**Row**:
- Height: 64px
- Padding: 16px 12px
- Border bottom: 1px solid #F3F4F6
- Hover: #F9FAFB background

**Cell Types**:
- **Text**: 14px regular
- **Badge**: Status/entity badges
- **Number**: 14px medium, right-aligned
- **Date**: 14px regular, gray text
- **Action**: Link button (blue, 14px medium)

**Avatar Initial**:
- Size: 32px circle
- Background: Gradient or solid color per user
- Text: 14px / 600 / white / uppercase initials

### 7. KPI Card

**Dashboard metric display**

```html
<div class="kpi-card">
  <div class="kpi-label">Total Merchants</div>
  <div class="kpi-value">954</div>
  <div class="kpi-change positive">
    ↑ 12% vs last month
  </div>
</div>
```

**Specs**:
- Background: White
- Padding: 24px
- Border radius: 12px
- Border: 1px solid #E5E7EB
- Label: 14px / 400 / #6B7280
- Value: 32px / 700 / #1F2937
- Change: 13px / 500 / green (↑) or red (↓)

**Change indicator**:
- Positive: #10B981 (green)
- Negative: #EF4444 (red)
- Arrow: ↑ or ↓ before percentage

### 8. Button

**Primary**:
```css
background: #0066FF;
color: white;
height: 40px;
padding: 0 24px;
border-radius: 8px;
font: 14px / 500;
```

**Secondary (Filters)**:
```css
background: transparent;
color: #374151;
border: 1px solid #D1D5DB;
height: 40px;
padding: 0 16px;
border-radius: 8px;
font: 14px / 500;
```

**Icon Button**:
```css
background: transparent;
color: #6B7280;
width: 40px;
height: 40px;
border: 1px solid #D1D5DB;
border-radius: 8px;
icon: 20px;
```

**States**:
- Hover: Darker background (primary), light bg (secondary)
- Active: Scale 0.98
- Disabled: #E5E7EB bg, #9CA3AF text, cursor not-allowed

### 9. Status Tabs

**Tab navigation with counts**

```html
<div class="status-tabs">
  <button class="tab active">All <span class="count">4</span></button>
  <button class="tab">Pending <span class="count">3</span></button>
  <button class="tab">Decided <span class="count">1</span></button>
</div>
```

Or:

```html
<div class="status-tabs">
  <button class="tab active">All <span class="count">9</span></button>
  <button class="tab">Pending <span class="count">7</span></button>
  <button class="tab">Rejected <span class="count">1</span></button>
  <button class="tab">Approved <span class="count">1</span></button>
</div>
```

**Specs**:
- Tab height: 40px
- Tab padding: 12px 20px
- Count badge: 18px circle, #E5E7EB bg, 12px text
- Active: Underline (2px, primary blue)
- Gap: 8px

### 10. Pagination

**Standard pagination controls**

```html
<div class="pagination">
  <div class="pagination-info">Showing 1 to 7 of 48 entries</div>
  
  <div class="pagination-controls">
    <button disabled>Previous</button>
    <button class="active">1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>Next</button>
  </div>
</div>
```

**Specs**:
- Button size: 32px × 32px
- Border radius: 6px
- Active: Primary blue bg, white text
- Inactive: Transparent, gray text
- Disabled: Gray text, no hover
- Gap: 4px

### 11. Form Field

**Input**:
```css
height: 40px;
padding: 10px 12px;
border: 1px solid #D1D5DB;
border-radius: 8px;
font: 14px / 400;
background: white;

/* Focus */
border-color: #0066FF;
box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
```

**Label**:
```css
font: 13px / 500 / #374151;
margin-bottom: 6px;
display: block;
```

**Dropdown**:
- Same as input
- Chevron icon: 16px, right-aligned

**Date Picker**:
- Same as input
- Calendar icon: 16px, right-aligned
- Placeholder: "DD/MM/YYYY"

### 12. Chart

**Line chart** (transaction volume/count)

**Specs**:
- Height: 300px (dashboard), 200px (widgets)
- Background: White
- Grid: Horizontal lines, #F3F4F6
- Axis labels: 12px / #6B7280
- Legend: Below chart, 13px / 500
- Colors:
  - Card: #0066FF (blue)
  - QR: #10B981 (green)
  - Cash/E-Com: #F59E0B (orange/yellow)

**Line style**:
- Width: 2px
- Points: 6px circles on hover
- Smooth curves (not sharp angles)

**Bar chart** (top merchants)

**Specs**:
- Height: Auto (per merchant)
- Bar height: 32px
- Border radius: 4px
- Colors: Match entity (PVCB=blue, VIETPAY=purple)
- Value label: Right-aligned, 14px medium

## Page Layouts

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Overview Dashboard        [ALL][PVCB][VIETPAY] [Month▼]│
├─────────────────────────────────────────────────────────┤
│ [KPI][KPI][KPI][KPI][KPI][KPI]                         │
│                                                         │
│ [Transaction Summary Cards: 4 metrics]                  │
│                                                         │
│ [Transaction Volume Chart] [Transaction Count Chart]    │
│                                                         │
│ [Volume by Category Chart] [Top 10 Merchants List]     │
└─────────────────────────────────────────────────────────┘
```

### Table List Layout

```
┌─────────────────────────────────────────────────────────┐
│ Businesses           [ALL][PVCB][VIETPAY]  [Filters][Export]│
├─────────────────────────────────────────────────────────┤
│ [Search bar: merchant name, MID, CCCD...]              │
│                                                         │
│ [Table Headers]                                         │
│ [─────────────────────────────────────────────────────]│
│ [Row 1]                                                 │
│ [Row 2]                                                 │
│ [Row 3]                                                 │
│ ...                                                     │
│                                                         │
│ Showing 1 to 7 of 48          [Pagination: 1 2 3 4 5]  │
└─────────────────────────────────────────────────────────┘
```

### Detail Page Layout

```
┌─────────────────────────────────────────────────────────┐
│ ← Cho Lon Wholesale Foods    [Open approval][Submit]   │
│   PENDING | KYC Valid | PVCB | LINK REQUESTED          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [Merchant Information Card]                             │
│                                                         │
│ [KYC / KYB Card]                                        │
│                                                         │
│ [Business Information Card]                             │
│                                                         │
│ [Services Card]                                         │
│   ☑ Enable Payment Link service                        │
│   [Payment Link Configuration]                          │
│                                                         │
│ [Activity & Audit Timeline]                             │
│   ● Account created - timestamp                         │
│   ● Application details entered - timestamp             │
│   ● Documents uploaded - timestamp                      │
│   ...                                                   │
└─────────────────────────────────────────────────────────┘
```

## Responsive Patterns

### Breakpoints
```css
--mobile: 0-767px;        /* Not shown in designs */
--tablet: 768-1023px;     /* Collapsed sidebar */
--desktop: 1024-1439px;   /* Grouped sidebar */
--wide: 1440px+;          /* Full sidebar */
```

### Sidebar Behavior
- **Wide (1440px+)**: Full labels, 217px
- **Desktop (1024-1439px)**: Grouped sections, 160px
- **Tablet (768-1023px)**: Icon only, 72px
- **Mobile (<768px)**: Off-canvas drawer

### Table Behavior
- **Desktop**: Full columns visible
- **Tablet**: Hide less important columns, show via "Columns" button
- **Mobile**: Card view (not shown in designs)

## Interaction Patterns

### Table Row Click
- Entire row clickable
- Hover: Light background
- Cursor: Pointer
- Action: Navigate to detail page
- Arrow indicator: Right-aligned

### Filter Flow
1. Click "Filters" button
2. Panel expands below button
3. Select filters
4. Click "Apply Filters"
5. Panel closes, table updates
6. Active filters shown as removable chips (if implemented)

### Entity Tab Switch
1. Click tab (ALL/PVCB/VIETPAY)
2. URL updates: `?entity=vietpay`
3. All widgets refresh (KPIs, charts, tables)
4. Loading state (optional spinner)

### Sort Interaction
1. Click column header (if sortable)
2. Arrow icon toggles: ↑ (asc) / ↓ (desc)
3. Table re-orders
4. Sort persists until changed

### Status Badge with Icon
Some status badges have info icon:
```
[PENDING ⓘ]
```
- Hover icon: Tooltip explains status
- Example: "Awaiting document review"

## Accessibility

### Focus States
- **Visible outline**: 2px solid #0066FF, 2px offset
- **Never remove**: Always show focus indicators
- **Tab order**: Logical (top to bottom, left to right)

### Color Contrast
- **Text on white**: ≥4.5:1 (WCAG AA)
- **Status badges**: ≥3:1 (large text exception)
- **Buttons**: ≥4.5:1

### Screen Reader Support
- **Table headers**: `<th scope="col">`
- **Status badges**: `<span role="status">`
- **Interactive elements**: Proper ARIA labels
- **Icons**: `aria-label` or `aria-hidden="true"` + adjacent text

## Animation & Transitions

### Durations
```css
--duration-fast: 150ms;     /* Hover states */
--duration-base: 200ms;     /* Panel open/close */
--duration-slow: 300ms;     /* Page transitions */
```

### Easing
```css
--ease: cubic-bezier(0.4, 0, 0.2, 1);  /* Standard */
--ease-out: cubic-bezier(0, 0, 0.2, 1); /* Enter */
--ease-in: cubic-bezier(0.4, 0, 1, 1);  /* Exit */
```

### Common Animations
```css
/* Hover scale (buttons) */
transform: scale(0.98);
transition: transform 150ms ease;

/* Fade in (panels) */
opacity: 0 → 1;
transition: opacity 200ms ease;

/* Slide down (dropdowns) */
transform: translateY(-8px) → translateY(0);
opacity: 0 → 1;
transition: transform 200ms ease, opacity 200ms ease;
```

## Design Tokens

### Border Radius
```css
--radius-sm: 4px;       /* Entity badges */
--radius-md: 6px;       /* Tabs, small buttons */
--radius-lg: 8px;       /* Buttons, inputs */
--radius-xl: 12px;      /* Cards, panels */
--radius-full: 9999px;  /* Pills, avatars */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
--shadow-panel: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### Z-Index Scale
```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-modal-backdrop: 1200;
--z-modal: 1300;
--z-tooltip: 1400;
```

## Implementation Checklist

### Before Development
- [ ] Set up CSS variables for colors, spacing, typography
- [ ] Load Inter font (Google Fonts or self-hosted)
- [ ] Configure Tailwind/CSS framework with design tokens
- [ ] Set up icon library (20px standard size)

### During Development
- [ ] Use entity tabs component (ALL|PVCB|VIETPAY)
- [ ] Implement status badge variants
- [ ] Apply consistent table styling
- [ ] Add filter panel pattern
- [ ] Follow spacing scale (4px base)
- [ ] Use proper status colors
- [ ] Add hover/focus states
- [ ] Test keyboard navigation

### Before Launch
- [ ] Verify entity color coding (PVCB≠VIETPAY)
- [ ] Check all status badges match spec
- [ ] Test responsive sidebar behavior
- [ ] Validate accessibility (WCAG AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance check (fast table rendering)

## Code Examples

### Entity Tabs Component (React)
```jsx
const EntityTabs = ({ value, onChange }) => (
  <div className="flex gap-2">
    {['ALL', 'PVCB', 'VIETPAY'].map(entity => (
      <button
        key={entity}
        onClick={() => onChange(entity)}
        className={`
          px-4 py-2 rounded-md text-sm font-medium
          ${value === entity 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'}
        `}
      >
        {entity}
      </button>
    ))}
  </div>
);
```

### Status Badge Component (React)
```jsx
const StatusBadge = ({ status }) => {
  const variants = {
    APPROVED: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    REJECTED: 'bg-red-100 text-red-800',
    VALID: 'bg-green-100 text-green-800',
  };
  
  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full 
      text-xs font-medium uppercase
      ${variants[status]}
    `}>
      {status}
    </span>
  );
};
```

### Entity Badge Component (React)
```jsx
const EntityBadge = ({ entity }) => (
  <span className={`
    inline-block px-2.5 py-0.5 rounded text-xs font-semibold uppercase
    ${entity === 'PVCB' 
      ? 'bg-blue-50 text-blue-600' 
      : 'bg-purple-50 text-purple-600'}
  `}>
    {entity}
  </span>
);
```

### KPI Card Component (React)
```jsx
const KPICard = ({ label, value, change, positive }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="text-sm text-gray-500 mb-2">{label}</div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
      {positive ? '↑' : '↓'} {change}
    </div>
  </div>
);
```

## When to Use This Skill

Use `/vpmmsdesign` when:
- Building any MMS web page
- Creating admin panels or dashboards
- Implementing data tables
- Designing filter panels
- Building status-driven interfaces
- Implementing entity-based filtering
- Creating merchant management UIs
- Designing approval workflows

## Related Skills

- `/vpdesignsys` — Core VietPay design system (tokens, base components)
- `/vpmmsdoc` — MMS requirements & features (77 comments)
- `/vpappdesign` — Mobile app design patterns

Use together: `/vpdesignsys` for base tokens → `/vpmmsdesign` for MMS-specific patterns → `/vpmmsdoc` for feature requirements.

---

**Last updated**: Based on 8 Figma nodes from MMS-withDuy (422-3820, 422-4212, 422-4537, 439-9981, 439-10240, 510-2, 476-60, 513-2)  
**Version**: 1.0  
**Scope**: Web admin interface (1440px desktop)
