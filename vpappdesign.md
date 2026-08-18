---
name: vpappdesign
description: VietPay app design system - onboarding flows, reward screens, components, and visual patterns
---

# VietPay App Design System

Design patterns extracted from VietPay merchant referral onboarding flows. Use for implementing screens matching existing VietPay mobile app style.

## Screen Dimensions

**Mobile Canvas**: 390×844px (iPhone standard)
- Safe area top: 40px (status bar) + 60px (header) = 100px total
- Safe area bottom: 5px home indicator + 20px padding
- Content area: 390×739px

## Color System

### Primary Colors
```css
--vp-primary-blue: #0066CC;        /* CTAs, interactive elements */
--vp-navy: #001F3F;                /* Headers, logo background */
--vp-white: #FFFFFF;               /* Backgrounds, cards */
--vp-gold: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); /* Points display */
```

### Neutral Colors
```css
--vp-gray-50: #F8F9FA;
--vp-gray-100: #E9ECEF;
--vp-gray-600: #6C757D;
--vp-gray-900: #212529;
```

### Semantic Colors
```css
--vp-success: #28A745;
--vp-error: #DC3545;
--vp-warning: #FFC107;
```

## Typography

### Font Families
- **Primary**: System fonts (SF Pro on iOS, Roboto on Android)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Type Scale
```css
--text-display-large: 48px / 1.1 / 700;     /* Point numbers */
--text-headline: 24px / 1.3 / 700;          /* Screen titles */
--text-title: 20px / 1.4 / 600;             /* Section headers */
--text-body: 16px / 1.5 / 400;              /* Body text */
--text-label: 14px / 1.4 / 500;             /* Labels, captions */
--text-caption: 12px / 1.3 / 400;           /* Small text */
```

### Text Patterns
- **Points Display**: Gold gradient, 48px+, center-aligned
- **Headings**: Navy or dark gray, 24px, bold, center-aligned for onboarding
- **CTAs**: White on blue, 16px, 500 weight, uppercase or sentence case
- **Labels**: Gray-600, 14px, medium weight

## Layout Patterns

### Header (100px total)
```
Status Bar (40px)
├─ Time: 9:41 (left, 24px padding)
└─ Icons: Signal, WiFi, Battery (right, 16px padding)

Header Bar (60px)
└─ VietPay Logo (centered, 110×43px)
```

### Content Container
- **Side padding**: 24px
- **Vertical spacing**: 16px between sections, 24px between major blocks
- **Card padding**: 24px
- **Border radius**: 16px (cards), 28px (buttons), 12px (inputs)

### Bottom CTA Pattern
```
Primary Button (56px height)
├─ Position: 24px from sides, 8px from bottom indicator
├─ Text: Centered, white, 16px medium
└─ Background: Primary blue, 28px border radius

Home Indicator (5px height)
└─ Position: Centered horizontally, 80px from bottom edge
```

## Component Library

### 1. Reward Celebration Screen
**Usage**: Milestone achievements (1000, 2000, 3000, 4000 points)

**Structure**:
```
- Header (100px)
- Gold points text (48px gradient): "X,XXX points"
- Illustration (mascot with confetti, ~500×400px centered)
- Bottom padding (20px)
- Home indicator
```

**Key elements**:
- Confetti animation overlay (multicolor: pink, yellow, blue, purple)
- Mascot illustration: Character in yellow blazer, blue pants
- No CTA button (auto-advances or user-dismissable)

### 2. Estimate/Calculator Screen
**Usage**: Input flows with numeric steppers

**Structure**:
```
- Header (100px)
- Headline text (center, 24px bold)
- Illustration (point-down character, ~370×250px)
- Reward card (white card, 16px radius)
  ├─ Label: "Your Estimated Reward" (14px gray)
  ├─ Points: "15,000 pt" (40px bold)
  └─ Currency: "≈ 15,000,000 ₫" (18px gray)
- Input section (24px padding)
  ├─ Label + Level indicator
  └─ Stepper (- [value] +)
- CTA button: "CLAIM X pt"
```

**Stepper component**:
- Height: 67px
- Buttons: 40×40px circles, light gray border
- Value: 40px center, bold
- +/- symbols: 24px

### 3. Avatar Selection Screen
**Usage**: User profile setup, gender/photo selection

**Structure**:
```
- Header (100px)
- Headline (center)
- Illustration (point-down character)
- Selection card (white, 16px radius)
  ├─ Radio group (horizontal, gender)
  │  └─ Radio: 36px circle, 24px inner dot when selected
  └─ Avatar grid (2 options, 104×104px circles)
- Text input field (56px height)
- CTA button
```

**Radio button**:
- Outer circle: 36px, 2px border (blue when selected, gray default)
- Inner circle: 24px, solid blue
- Label: 16px, 8px spacing from radio

### 4. Upload Screen
**Usage**: Photo/document upload

**Structure**:
```
- Header (100px)
- Headline
- Illustration (point-down character)
- Upload card (342×271px, white, 16px radius, center)
  ├─ Camera icon (120×120px circle, light gray bg)
  ├─ Upload text (16px)
  └─ Browse button (195×44px, blue, icon + text)
```

**Upload button**:
- Icon: Upload arrow, 19×19px
- Text: "Browse photos" (16px)
- Combined width: auto-fit content
- Blue background, white text

### 5. List Selection Screen
**Usage**: Contact sync, network selection

**Structure**:
```
- Header (100px)
- Headline/description
- List container (scrollable)
  └─ List items (56px height each)
      ├─ Checkbox/icon (left, 24px)
      ├─ Label (center-left)
      └─ Secondary text (right, gray)
- CTA button (bottom)
```

**List item**:
- Height: 56px
- Padding: 16px horizontal
- Border bottom: 1px solid gray-100
- Checkbox: 24×24px, blue when checked
- Touch target: Full row height

### 6. Intro/Welcome Screen
**Usage**: Feature explanation, value proposition

**Structure**:
```
- Header (100px)
- Headline (multi-line, bold, navy)
- Timer badge (optional, top-right)
  └─ "XX sec" (rounded pill, gray bg)
- Hero illustration (full-width, 370×550px)
- Auto-advance or swipe gesture
```

**Timer badge**:
- Size: 102×48px (auto-width)
- Background: Gray-100
- Border radius: 24px
- Text: 18px medium, gray-600

### 7. Social Platform Selection
**Usage**: Connect social accounts

**Structure**:
```
- Platform icons grid (4 columns)
  └─ Each: 56×56px circle
      ├─ Brand color background
      ├─ White icon (24×24px)
      └─ Spacing: 12px between
```

**Platform colors**:
- Facebook: #1877F2
- Zalo: #0068FF
- WhatsApp: #25D366
- Messenger: Linear gradient

## Illustration System

### Mascot Character
**Description**: Professional woman in yellow blazer, navy blue pants
- **Style**: Friendly, approachable, semi-realistic cartoon
- **Skin tone**: Light tan (#F5C097)
- **Hair**: Black, shoulder-length, casual style
- **Poses**: 
  - Pointing right (intro/direction)
  - Arms spread wide (celebration/welcome)
  - Holding phone/object (action states)

### Supporting Graphics
- **Confetti**: Multicolor rectangles/circles, random rotation
- **Point-down arrows**: Curved illustration, ~370×250px, gray tone
- **Gradient overlays**: Subtle radial gradients on celebration screens

## Animation Patterns

### Screen Transitions
- **Default**: Slide from right, 300ms ease-out
- **Celebration screens**: Scale up from 0.8 to 1.0, 400ms spring
- **Confetti**: Cascade from top, staggered 50ms delays

### Micro-interactions
- **Button press**: Scale to 0.95, 100ms
- **CTA ripple**: Circular ripple effect from touch point
- **Number increment**: Count-up animation, 800ms duration
- **Checkbox toggle**: Scale + fade, 200ms

### Loading States
- **Skeleton**: Gray-100 background, shimmer effect
- **Spinner**: Blue circular, 24px diameter

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

**Common applications**:
- Screen edge padding: 24px (space-6)
- Card padding: 24px (space-6)
- Section spacing: 16px (space-4)
- Component gap: 12px (space-3)
- Icon-text gap: 8px (space-2)

## Icon System

### Icon Library
Use outlined style icons (2px stroke weight)

**Common icons**:
- Camera (upload)
- Upload arrow (file upload)
- Checkmark (success, selection)
- Plus/Minus (stepper)
- iOS status bar icons (signal, wifi, battery)

**Sizes**:
- Small: 16×16px (inline text)
- Medium: 24×24px (buttons, list items)
- Large: 56×56px (feature icons)
- Extra large: 120×120px (empty states)

## Form Patterns

### Text Input
```css
Height: 56px
Padding: 16px horizontal
Border: 1px solid gray-200
Border-radius: 12px
Font: 16px regular
Placeholder: gray-400
Focus: Blue border, 2px
```

### Radio Group (Horizontal)
- Spacing: 24px between options
- Alignment: Center vertical
- Active state: Blue border + fill

### Checkbox
- Size: 24×24px
- Border: 2px solid gray-300
- Checked: Blue background, white checkmark
- Border radius: 4px

## Accessibility

### Touch Targets
- Minimum: 44×44px (iOS HIG)
- Buttons: 56px height
- List items: 56px+ height
- Steppers: 40×40px (grouped, acceptable)

### Color Contrast
- Text on white: ≥4.5:1 (WCAG AA)
- CTA button: White on blue ≥4.5:1
- Avoid text on gradient backgrounds

### Text Scaling
Support iOS Dynamic Type up to 150%

## Implementation Notes

### When to Use This Skill
Implement VietPay mobile screens for:
- Onboarding flows
- Reward/gamification screens
- Profile setup
- Contact/network sync
- Celebration/milestone moments

### Key Principles
1. **Consistent mascot**: Use character illustration on every screen for brand continuity
2. **Progressive rewards**: Celebrate milestones (1k, 2k, 3k, 4k points pattern)
3. **Clear CTAs**: Single primary action per screen, bottom-aligned
4. **Visual hierarchy**: Illustration → Points/reward → CTA flow
5. **Friendly tone**: Rounded corners, soft colors, approachable copy
6. **Step indicators**: Show progress when in multi-step flows

### Code Example: Reward Screen (React Native)
```jsx
<Screen>
  <VPHeader />
  
  <View style={styles.content}>
    <Text style={styles.pointsDisplay}>
      1,000 points
    </Text>
    
    <Image 
      source={require('./mascot-celebration.png')}
      style={styles.illustration}
    />
    
    <ConfettiOverlay />
  </View>
  
  <HomeIndicator />
</Screen>

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pointsDisplay: {
    fontSize: 48,
    fontWeight: '700',
    background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
    textAlign: 'center',
    marginBottom: 32,
  },
  illustration: {
    width: 267,
    height: 400,
    resizeMode: 'contain',
  },
});
```

## Checklist: Before Shipping a VietPay Screen

- [ ] Header with VietPay logo centered
- [ ] Status bar placeholder (iOS: 9:41 time)
- [ ] Home indicator bar at bottom (iOS)
- [ ] Mascot illustration present
- [ ] Primary CTA 56px height, 28px radius, blue background
- [ ] Side padding 24px
- [ ] Border radius 16px on cards
- [ ] Font weights: 700 for headings, 400-500 for body
- [ ] Touch targets ≥44×44px
- [ ] Color contrast ≥4.5:1
- [ ] Confetti overlay on celebration screens
- [ ] Gold gradient on point numbers
- [ ] Screen dimensions: 390×844px (mobile)

---

**Last updated**: Based on Figma designs analyzed 2026-08-19
**Source**: Draft-pool Figma file, nodes 754:1375 (intro flow) & 754:1376 (network flow)
