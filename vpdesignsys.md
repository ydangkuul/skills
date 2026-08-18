---
name: vpdesignsys
description: VietPay Design System - complete component library, tokens, patterns, and implementation guidelines
---

# VietPay Design System

Complete design system from VietPay style guide and design tokens. Use for all VietPay product implementations.

## Design Principles

1. **User-centered**: Design for merchants and business users first
2. **Consistent**: Unified visual language across all touchpoints
3. **Accessible**: WCAG AA compliance, inclusive design
4. **Efficient**: Streamlined workflows, minimal friction
5. **Trustworthy**: Professional, reliable, secure appearance

## Color System

### Primary Colors
```css
/* Primary Blues */
--vp-primary: #0073CF;           /* Main brand color, CTAs */
--vp-primary-dark: #005CA3;      /* Hover states */
--vp-primary-light: #E6F3FF;     /* Backgrounds, highlights */

/* Dark Theme Primary */
--vp-primary-dark-mode: #3D9EFF; /* Primary in dark mode */
```

### Neutrals
```css
/* Light Theme */
--vp-gray-50: #F8F9FA;
--vp-gray-100: #E9ECEF;
--vp-gray-200: #DEE2E6;
--vp-gray-300: #CED4DA;
--vp-gray-400: #ADB5BD;
--vp-gray-500: #6C757D;
--vp-gray-600: #495057;
--vp-gray-700: #343A40;
--vp-gray-800: #212529;
--vp-gray-900: #1A1D20;

/* Dark Theme */
--vp-dark-bg: #1A1D20;
--vp-dark-surface: #212529;
--vp-dark-border: #343A40;
```

### Secondary Colors
```css
--vp-success: #28A745;           /* Green - success states */
--vp-success-light: #D4EDDA;
--vp-success-dark: #1E7E34;

--vp-warning: #FFC107;           /* Gold/Yellow - warnings */
--vp-warning-light: #FFF3CD;
--vp-warning-dark: #D39E00;

--vp-error: #DC3545;             /* Red - errors, destructive */
--vp-error-light: #F8D7DA;
--vp-error-dark: #BD2130;

--vp-info: #17A2B8;              /* Teal - informational */
--vp-info-light: #D1ECF1;
--vp-info-dark: #117A8B;
```

### Usage Guidelines
- **Primary Blue**: CTAs, links, active states, focus indicators
- **Success Green**: Confirmations, completed states, positive feedback
- **Warning Gold**: Alerts, caution messages, pending states
- **Error Red**: Validation errors, destructive actions, critical alerts
- **Neutrals**: Text, borders, backgrounds, disabled states

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

### Type Scale
```css
/* Desktop */
--text-display: 48px / 1.1 / 700;      /* Hero text, large numbers */
--text-h1: 32px / 1.25 / 700;          /* Page titles */
--text-h2: 24px / 1.3 / 600;           /* Section headers */
--text-h3: 20px / 1.4 / 600;           /* Subsection headers */
--text-h4: 18px / 1.4 / 600;           /* Card titles */
--text-body-large: 16px / 1.5 / 400;   /* Emphasized body */
--text-body: 14px / 1.5 / 400;         /* Default body text */
--text-body-small: 13px / 1.4 / 400;   /* Secondary text */
--text-caption: 12px / 1.3 / 400;      /* Captions, labels */

/* Mobile - reduce by 2-4px for h1-h3 */
--text-h1-mobile: 28px / 1.25 / 700;
--text-h2-mobile: 22px / 1.3 / 600;
--text-h3-mobile: 18px / 1.4 / 600;
```

### Font Weights
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Labels, emphasized text
- **Semibold (600)**: Subheadings, important info
- **Bold (700)**: Headings, CTAs, numbers

### Text Colors
```css
/* Light theme */
--text-primary: #212529;        /* Main content */
--text-secondary: #6C757D;      /* Supporting text */
--text-disabled: #ADB5BD;       /* Disabled state */
--text-inverse: #FFFFFF;        /* On dark backgrounds */

/* Dark theme */
--text-primary-dark: #F8F9FA;
--text-secondary-dark: #ADB5BD;
--text-disabled-dark: #6C757D;
```

## Spacing System

**Base unit**: 4px

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 28px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Layout Spacing
- **Page margin**: 24px mobile, 48px tablet, 64px desktop
- **Section spacing**: 48px (space-12)
- **Component spacing**: 16px (space-4) or 24px (space-6)
- **Element spacing**: 8px (space-2) or 12px (space-3)

## Border Radius

```css
--radius-sm: 4px;         /* Small elements, badges */
--radius-md: 8px;         /* Inputs, small cards */
--radius-lg: 12px;        /* Cards, modals */
--radius-xl: 16px;        /* Large cards, containers */
--radius-2xl: 24px;       /* Buttons (mobile), hero cards */
--radius-full: 9999px;    /* Pills, circular elements */
```

## Elevation (Shadows)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Focus state */
--shadow-focus: 0 0 0 3px rgba(0, 115, 207, 0.25);
```

## Components

### Buttons

#### Primary Button
```css
Background: var(--vp-primary)
Color: white
Height: 44px (mobile), 40px (desktop)
Padding: 0 24px
Border-radius: 24px (mobile), 8px (desktop)
Font: 16px / 500

States:
- Default: #0073CF
- Hover: #005CA3
- Active: #004A85
- Disabled: #E9ECEF bg, #ADB5BD text
- Focus: Primary + shadow-focus
```

**Code**:
```jsx
<button className="vp-btn vp-btn-primary">
  Continue
</button>

.vp-btn-primary {
  background: var(--vp-primary);
  color: white;
  height: 44px;
  padding: 0 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.vp-btn-primary:hover {
  background: var(--vp-primary-dark);
}

.vp-btn-primary:disabled {
  background: var(--vp-gray-100);
  color: var(--vp-gray-400);
  cursor: not-allowed;
}
```

#### Secondary Button
```css
Background: transparent
Color: var(--vp-primary)
Border: 1px solid var(--vp-primary)
Height: 40px
Padding: 0 20px
Border-radius: 8px

States:
- Hover: #E6F3FF background
- Active: #CCE5FF background
```

#### Ghost Button
```css
Background: transparent
Color: var(--vp-primary)
Border: none
Padding: 0 16px

States:
- Hover: #E6F3FF background
```

### Form Elements

#### Text Input
```css
Height: 44px
Padding: 12px 16px
Border: 1px solid #DEE2E6
Border-radius: 8px
Font: 14px / 400
Background: white

States:
- Focus: Border #0073CF, shadow-focus
- Error: Border #DC3545
- Disabled: Background #F8F9FA, text #ADB5BD
```

**Structure**:
```html
<div class="vp-form-field">
  <label class="vp-label">Email address</label>
  <input type="email" class="vp-input" placeholder="Enter email">
  <span class="vp-helper-text">We'll never share your email</span>
</div>
```

#### Checkbox
```css
Size: 20px × 20px
Border: 1px solid #CED4DA
Border-radius: 4px
Background: white

Checked:
- Background: #0073CF
- Border: #0073CF
- Checkmark: white, 14px icon
```

#### Radio Button
```css
Size: 20px × 20px circle
Border: 1px solid #CED4DA

Selected:
- Border: 2px solid #0073CF
- Inner dot: 10px, #0073CF
```

#### Toggle Switch
```css
Width: 44px
Height: 24px
Border-radius: 12px
Background: #CED4DA (off), #0073CF (on)
Handle: 18px circle, white, 3px offset
```

### Cards

```css
Background: white
Border: 1px solid #E9ECEF
Border-radius: 12px
Padding: 24px
Shadow: var(--shadow-sm)

Hover state:
- Shadow: var(--shadow-md)
- Border: #DEE2E6
```

**Variants**:
- **Default**: White bg, light border
- **Elevated**: No border, shadow-md
- **Outlined**: 2px border, no shadow
- **Interactive**: Hover shadow-lg, cursor pointer

### Modals

```css
Overlay: rgba(0, 0, 0, 0.5)
Container: 
  - Mobile: Full width, bottom sheet
  - Desktop: Max 600px, centered
  - Padding: 32px
  - Border-radius: 16px (top) or 12px (all sides)
  - Background: white
  - Shadow: var(--shadow-xl)
```

**Structure**:
```html
<div class="vp-modal-overlay">
  <div class="vp-modal">
    <div class="vp-modal-header">
      <h3>Confirm your action</h3>
      <button class="vp-modal-close">×</button>
    </div>
    <div class="vp-modal-body">
      <p>Are you sure you want to proceed?</p>
    </div>
    <div class="vp-modal-footer">
      <button class="vp-btn vp-btn-ghost">Cancel</button>
      <button class="vp-btn vp-btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Tables

```css
Cell padding: 16px 12px
Header:
  - Background: #F8F9FA
  - Font: 14px / 600
  - Color: #495057
  - Border-bottom: 2px solid #DEE2E6

Row:
  - Border-bottom: 1px solid #E9ECEF
  - Hover: Background #F8F9FA

Mobile:
  - Stack as cards
  - Hide less important columns
```

### Badges

```css
Height: 24px
Padding: 0 12px
Border-radius: 12px
Font: 12px / 500

Variants:
- Primary: #E6F3FF bg, #0073CF text
- Success: #D4EDDA bg, #1E7E34 text
- Warning: #FFF3CD bg, #856404 text
- Error: #F8D7DA bg, #721C24 text
- Gray: #E9ECEF bg, #495057 text
```

### Loading States

#### Spinner
```css
Size: 24px (default), 16px (small), 40px (large)
Color: var(--vp-primary)
Animation: Rotate 0.8s linear infinite
```

#### Skeleton
```css
Background: #E9ECEF
Border-radius: 4px
Animation: Shimmer 1.5s infinite

Shimmer gradient:
linear-gradient(
  90deg,
  transparent 0%,
  rgba(255,255,255,0.5) 50%,
  transparent 100%
)
```

#### Progress Bar
```css
Height: 8px
Background: #E9ECEF
Border-radius: 4px

Fill:
- Background: #0073CF
- Border-radius: 4px
- Transition: width 300ms ease
```

## Icons

### Icon Set
Use **outlined** style icons (2px stroke weight)

**Common icons**:
- Navigation: arrow-left, arrow-right, chevron-down, chevron-up, menu, close
- Actions: edit, delete, download, upload, share, search
- Status: check, x, alert-circle, info, help-circle
- UI: eye, eye-off, settings, filter, calendar, clock
- Finance: credit-card, bank, wallet, receipt

### Sizes
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
--icon-2xl: 48px;
```

### Usage
- **Inline text**: 16px icon
- **Buttons**: 20px icon, 8px gap from text
- **List items**: 20px icon
- **Feature sections**: 48px icon

## Layout Grid

### Breakpoints
```css
--mobile: 0-767px;
--tablet: 768px-1023px;
--desktop: 1024px-1439px;
--wide: 1440px+;
```

### Container
```css
Max-width: 1280px
Padding: 24px (mobile), 48px (tablet), 64px (desktop)
Margin: 0 auto
```

### Grid System
- **Mobile**: 4 columns, 16px gutter
- **Tablet**: 8 columns, 24px gutter
- **Desktop**: 12 columns, 24px gutter

## Motion & Animation

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Durations
```css
--duration-fast: 150ms;      /* Micro-interactions */
--duration-base: 250ms;      /* Standard transitions */
--duration-slow: 400ms;      /* Complex animations */
--duration-slower: 600ms;    /* Page transitions */
```

### Common Animations

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 250ms ease-out;
```

**Slide Up**:
```css
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(16px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
animation: slideUp 300ms ease-out;
```

**Scale**:
```css
@keyframes scale {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
animation: scale 200ms ease-out;
```

## Accessibility

### Focus Indicators
- **Visible**: 3px solid outline, offset 2px
- **Color**: #0073CF with 25% opacity
- **Never remove**: Always show focus states

### Color Contrast
- **Text on white**: ≥4.5:1 (WCAG AA)
- **Large text (18px+)**: ≥3:1
- **Interactive elements**: ≥3:1
- **Test**: All color combinations pass WebAIM checker

### Touch Targets
- **Minimum**: 44×44px
- **Recommended**: 48×48px
- **Spacing**: 8px minimum between targets

### Screen Reader Support
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels for icons
- ARIA live regions for dynamic content
- Skip links for navigation

## Content Guidelines

### Voice & Tone
- **Clear**: Simple language, no jargon
- **Helpful**: Guide users, explain next steps
- **Professional**: Business-appropriate
- **Friendly**: Approachable, not robotic

### Microcopy Patterns

**CTAs**:
- Use verbs: "Continue", "Save changes", "Add merchant"
- Be specific: "Download report" not "Download"
- Avoid: "Click here", "Submit"

**Empty States**:
- Explain why empty: "No transactions yet"
- Suggest action: "Add your first merchant to get started"
- Use illustration + text

**Errors**:
- Explain what happened: "Payment failed"
- Why it happened: "Your card was declined"
- How to fix: "Try a different payment method"

**Success Messages**:
- Confirm action: "Merchant added successfully"
- Next step: "You can now view their transactions"

## Responsive Patterns

### Mobile-First Approach
1. Design for mobile (320px-375px)
2. Enhance for tablet (768px+)
3. Optimize for desktop (1024px+)

### Common Breakpoint Changes
- **Navigation**: Hamburger → Full menu
- **Cards**: Stacked → Grid (2-3 columns)
- **Tables**: Card view → Full table
- **Modals**: Bottom sheet → Centered dialog
- **Forms**: Full width → Two-column layout

### Touch vs. Mouse
- **Mobile**: 44px+ touch targets, no hover states
- **Desktop**: 40px targets, hover/focus states

## Dark Mode

### Color Adjustments
```css
@media (prefers-color-scheme: dark) {
  --bg-primary: #1A1D20;
  --bg-secondary: #212529;
  --bg-tertiary: #343A40;
  
  --text-primary: #F8F9FA;
  --text-secondary: #ADB5BD;
  
  --border-primary: #343A40;
  --border-secondary: #495057;
  
  --vp-primary: #3D9EFF;  /* Lighter blue for contrast */
}
```

### Component Adjustments
- **Cards**: Dark surface (#212529) + subtle border
- **Inputs**: Dark bg (#343A40), lighter border
- **Shadows**: Reduce opacity by 50%
- **Images**: Slight opacity reduction (0.9)

## Implementation Checklist

### Before Development
- [ ] Review design system spec
- [ ] Confirm breakpoints and grid
- [ ] Set up CSS variables/tokens
- [ ] Load icon library
- [ ] Configure accessibility tools

### During Development
- [ ] Use semantic HTML
- [ ] Apply spacing scale consistently
- [ ] Follow typography scale
- [ ] Use design tokens (no hardcoded values)
- [ ] Test responsive breakpoints
- [ ] Validate color contrast
- [ ] Add focus states
- [ ] Test keyboard navigation

### Before Launch
- [ ] Accessibility audit (WCAG AA)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Dark mode testing
- [ ] Performance check (Lighthouse)
- [ ] Content review (tone, clarity)

## Code Examples

### CSS Variables Setup
```css
:root {
  /* Colors */
  --vp-primary: #0073CF;
  --vp-primary-dark: #005CA3;
  --vp-primary-light: #E6F3FF;
  
  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
  
  /* Typography */
  --text-body: 14px;
  --text-h2: 24px;
  
  /* Border */
  --radius-md: 8px;
  --radius-xl: 16px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --vp-primary: #3D9EFF;
    --bg-primary: #1A1D20;
    --text-primary: #F8F9FA;
  }
}
```

### Button Component (React)
```jsx
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseClass = 'vp-btn';
  const variantClass = `vp-btn-${variant}`;
  const sizeClass = `vp-btn-${size}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage
<Button variant="primary">Continue</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Learn more</Button>
```

### Card Component
```jsx
<div className="vp-card">
  <div className="vp-card-header">
    <h4 className="vp-card-title">Transaction Details</h4>
    <button className="vp-icon-button">
      <Icon name="more-vertical" size={20} />
    </button>
  </div>
  
  <div className="vp-card-body">
    <p className="vp-text-secondary">
      Payment processed successfully
    </p>
  </div>
  
  <div className="vp-card-footer">
    <Button variant="ghost">View Receipt</Button>
    <Button>Download</Button>
  </div>
</div>

.vp-card {
  background: white;
  border: 1px solid var(--vp-gray-100);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.vp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.vp-card-footer {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
```

## When to Use This Skill

Use `/vpdesignsys` when:
- Building ANY VietPay product screen or component
- Implementing forms, dashboards, admin panels
- Creating marketing pages or public-facing sites
- Designing new features that need VietPay branding
- Refactoring existing components for consistency
- Reviewing design specs or providing feedback
- Onboarding new designers or developers

## Related Skills

- `/vpappdesign` - Mobile onboarding flows and reward screens (companion to this)
- Use both together: `/vpdesignsys` for core components, `/vpappdesign` for mobile-specific patterns

---

**Last updated**: Based on VietPay Style Guide & Design System (Figma nodes 693:398, 693:1249)
**Version**: 1.0
**Maintained by**: VietPay CX/UX Team
