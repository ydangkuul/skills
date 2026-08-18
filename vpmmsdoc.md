---
name: vpmmsdoc
description: VietPay MMS (Merchant Management System) - requirements, features, improvements from 77 stakeholder comments
---

# VietPay MMS Documentation

Complete requirements and improvement documentation for VietPay Merchant Management System (MMS), compiled from 77 stakeholder comments by Duy Dang and design specifications.

## System Overview

**MMS (Merchant Management System)** is a shared platform serving two entities:
- **VietPay**: Full access to all features
- **PVCB (PVComBank)**: Shared access, some features restricted

### Key Principle
MMS is ONE system with role-based access control, NOT two separate systems.

### Access Matrix

| Module | VietPay | PVCB |
|--------|---------|------|
| Dashboard | ✅ | ✅ |
| Transactions | ✅ | ✅ |
| Merchant Management | ✅ | ✅ |
| **Commission** | ✅ | ❌ Exclusive |
| **Network (Referral)** | ✅ | ❌ Exclusive |
| Payouts | ✅ | ✅ |
| Invoices | ✅ | ✅ |
| Downloads | ✅ | ✅ |
| Staff Management | ✅ | ✅ |

## Critical Requirements

### Global Requirements (All Modules)

#### 1. Entity Filter (Priority: CRITICAL)
**Comments**: #8, #32, #64

Every module MUST have entity filter tabs:
```
[ ALL ] [ PVCB ] [ VIETPAY ]
```

**Behavior**:
- Default view: ALL
- Filter applies to entire page (charts + tables)
- URL parameter: `?entity=vietpay|pvcb|all`
- Persist selection across navigation within same session

**Visual**:
- Tab style (not dropdown)
- Active tab: Primary blue background
- Native entity tags in table rows (color-coded)

#### 2. Column Selection Filter (Priority: HIGH)
**Comments**: #28, #29

All table views need customizable column display:

**Implementation**:
```
[Filter icon] → Checkbox list of all columns
- ☑ Merchant Name
- ☑ MID
- ☑ Transaction Date
- ☐ Settlement Date  (hidden)
- ☑ Amount
```

**Features**:
- Save preference per user
- Reset to default button
- Minimum required columns (cannot hide): ID, Name, Date, Amount

#### 3. Search Enhancement (Priority: HIGH)
**Comments**: #31, #68, #72

**Current**: Basic search by merchant name/MID  
**Required**: Multi-field search

**Search fields by module**:

**Merchant Management**:
- Merchant name
- MID (Merchant ID)
- Owner CCCD (National ID)
- Address (business location)
- POS serial number
- Phone number

**Transaction**:
- MID
- Transaction ID
- Card number (last 4 digits)
- Amount range

**Design**:
- Compact search bar (not oversized)
- Position BEFORE filter button (#31)
- Placeholder text shows searchable fields
- Clear button (X) when text entered

#### 4. Sort Functionality (Priority: MEDIUM)
**Comments**: #69

All table columns should be sortable:

**Behavior**:
- Click column header to sort ascending
- Click again for descending
- Arrow indicator shows sort direction
- Time-sensitive: Only applies to current view (not historical data)
- One column sort at a time

**Priority columns**:
- Date/Time (default sort: newest first)
- Amount (high to low)
- Merchant name (A-Z)
- Status

## Module-Specific Requirements

### Scene 1: Sidebar Navigation

**Comments**: #1-6, #7

#### Issues
1. **Summary tab redundancy** (#4, #5)
   - Currently just redirects to Business or Inventory
   - **Action**: Remove or overhaul with actual summary content

2. **Scroll behavior** (#7)
   - Sidebar too long, no scroll
   - **Action**: Implement hidden scroll, only highlight active tab

3. **Visual monotony** (#6)
   - Plain background
   - **Action**: Add subtle background pattern (low priority)

#### Improved Structure
```
Dashboard
├─ Overview (default)
├─ Analytics
└─ Reports

Transactions
├─ Authorized
├─ Settled
├─ Refund
├─ Unsuccessful

Network [VietPay only]
├─ Partner Tree
├─ Referral Stats

Commission [VietPay only]
├─ Overview
├─ Partner Details

Merchant Management
├─ All Merchants
├─ Business Applications
├─ Approvals
├─ Revenue (placeholder)

Payouts
Invoices
Downloads
Staff Management
```

---

### Scene 2: Dashboard

**Comments**: #7-14, #42

#### Entity Filter Tabs (#8)
```
[ ALL ] [ PVCB ] [ VIETPAY ]
```

Must affect ALL dashboard widgets simultaneously.

#### KPI Cards (#9)
Show month-over-month change:
```
┌─────────────────────┐
│ Total Transactions  │
│                     │
│   1,234,567        │
│   ↑ 12.3% vs last month
└─────────────────────┘
```

**Required metrics**:
- Total transaction count
- Total transaction value
- Active merchants
- Pending approvals
- Commission earned (VietPay only)

#### Transaction Graph (#10, #11)
**Breakdown by transaction type**:
- Card (POS)
- QR Code
- Cash
- ECOM (e-commerce)

**Features**:
- Stacked area chart or grouped bar chart
- Filter by transaction type (checkboxes)
- Time range selector (7d / 30d / 90d / custom)
- **Missing**: Units/currency labels (#12)

#### Top Merchants Widget (#14)
**Issue**: When filtered to PVCB, chart shows no data (no PVCB exclusive merchants)

**Fix**: 
- Show "No data for PVCB-only merchants" message
- OR change to "Top Merchants using PVCB" (regardless of owner)

#### Device & Category Filter (#16)
Add filters:
- Device type: i80 / s20 / All
- QR category: Static / Dynamic / All

#### Dashboard References (#42)
Refer to modern dashboard examples for inspiration (link in original comment).

---

### Scene 3: Network (VietPay Only)

**Comments**: #15, #17

#### Tree Diagram (#15)
**Current**: Exists in Grafana (external tool)  
**Required**: Port to MMS

**Visualization**:
```
      [Partner A]
       /    |    \
   [M1]  [M2]  [M3]
              /  \
           [M4] [M5]
```

**Features**:
- Interactive nodes (click to drill down)
- Show: Partner → Referred Merchants → Sub-merchants
- Metrics per node: Total merchants, Total commission, Active status

#### Link with Commission (#17)
Network page and Commission page should cross-link:
- Network node → Click → Commission details
- Commission table → Click partner → Network tree view

---

### Scene 4: Commission (VietPay Only)

**Comments**: #17-23, #41

#### Commission Mechanism (#18)
Two revenue streams:
1. **Transaction fee**: % of each transaction
2. **POS rental fee**: Monthly device rental (NOT YET IMPLEMENTED)

#### Dual View Tabs (#19)
```
[ Graph View ] [ Table View ]
```

**Graph**:
- Time-series commission earnings
- Stacked: Transaction fees + Rental fees
- Sortable by time period

**Table**:
- Excel-style with sort by date
- Export to CSV/Excel

#### Comparison View (#20)
Side-by-side chart:
```
┌────────────────┐  ┌────────────────┐
│ Transaction    │  │ Rental Fees    │
│ Commission     │  │                │
│                │  │                │
│    Chart       │  │    Chart       │
└────────────────┘  └────────────────┘
```

#### Partner Glance Value (#21)
Show key metrics at top of partner detail page:
- Partner name
- MID
- BC (Business Code)
- **Lifetime points**: Total earned all-time
- **Monthly average**: Avg commission per month
- **Referred merchants**: Count

**CRITICAL DISTINCTION** (#22):
- **Balance Points**: Currently redeemable balance
- **Lifetime Points**: Cumulative total earned

These MUST be different values (UAT showing same = wrong).

#### Glance → Detail Flow (#23)
Main page shows glance value only.  
Click partner → Redirect to detail page with full breakdown.

#### Dashboard Reference (#41)
Reference examples from web for dashboard inspiration.

---

### Scene 5: Transaction - Authorized (VietPay)

**Comments**: #24-33, #34, #35, #38, #40

#### Target Audience (#24)
Not for casual users. Power users / IT / Finance only.  
**No need for tooltips** explaining every field.

#### Scrolling (#25)
Long horizontal tables need smooth scroll.  
Current: Difficult to navigate wide tables.

#### Column Spacing (#26)
**Issue**: Gap between columns can be minimized, but resize handle is hidden.

**Fix**: 
- Reduce default column gap
- Show visible resize handles on hover
- Save column width preferences per user

#### Glance Value + Detail Redirect (#27)
Main transaction list shows **glance value only** (key fields).  
Click row → Modal or new page with **full transaction details**.

#### Column Filter Integration (#28, #29)
See Global Requirements → Column Selection Filter.

Filter button opens full category tree:
```
Transaction Details
  ├─ Basic Info
  │   ├─ ☑ MID
  │   ├─ ☑ Merchant Name
  │   └─ ☑ Transaction ID
  ├─ Amount Details
  │   ├─ ☑ Amount
  │   ├─ ☐ Fee
  │   └─ ☐ Net Amount
  └─ Card Details
      ├─ ☑ Card Type
      ├─ ☐ Issuer Bank
      └─ ☐ Last 4 Digits
```

#### Existing Design Reuse (#30)
Previous designer's work exists.  
**Action**: Utilize and improve on top (don't reinvent).

#### Search Bar Position (#31)
Place BEFORE filter button, compact size.

#### Entity Tabs (#32, #34)
```
[ ALL ] [ PVCB ] [ VIETPAY ]
```

NOT mixed in one table — separate tabs.

#### Sub-tabs by Status (#33)
```
Authorized | Settled | Refund | Unsuccessful
```

#### Error Code Visibility (#35, #38)
**Issue**: Error codes hidden, need to scroll right.

**Fix**:
- Move error code to glance value (visible without scroll)
- Tooltip on hover: Error code + description
- OR redirect to dedicated error explanation page
- Link to full card transaction error code documentation

#### Icon Replacement (#40)
Replace text with icons where appropriate:
- Visa logo for Visa transactions
- Mastercard logo for Mastercard
- QR icon for QR payments
- Cash icon for cash transactions

---

### Scene 6: Transaction - Settled (VietPay)

**Comments**: #52

#### Filter Underutilization (#52)
Current filter is very basic (barebone).

**Required filters**:
- Date range (from/to)
- Amount range (min/max)
- Merchant (search/dropdown)
- Entity (PVCB/VietPay/All)
- Settlement status (Pending/Complete)
- Card type (Visa/MC/UnionPay/etc)

---

### Scene 7: Transaction - Refund (VietPay)

**Comments**: #44-48

#### Color Scheme (#44)
**Issue**: Two contrast colors used but don't explain anything meaningful.

**Fix**: 
- Void: Orange/Yellow (merchant-initiated)
- Refund: Blue (bank-processed)
- Use semantic colors with legend

#### Void vs Refund (#45, #46)
**Void**: 
- Merchant cancels on POS
- Must be done BEFORE transaction settles
- Merchant has control

**Refund**:
- Bank processes refund
- Happens AFTER settlement
- MMS only receives notification (no control)

#### Column Clarity (#47)
**Current**: Confusing column names
- "Sale transaction date"
- "Transaction date"

**Fix**: Rename for clarity
- "Original Sale Date"
- "Refund Request Date"

#### Settlement Date (#48)
**Issue**: Refund transactions missing settlement date in UAT.

**Cause**: Test data incomplete.  
**Action**: Ensure production data includes settlement date for all refunds.

---

### Scene 8: Transaction - Authorized (2nd view)

**Comments**: #34, #35, #38

(See Scene 5 for details — same requirements)

---

### Scene 9: Transaction - Cash Only (VietPay)

**Comments**: #37

#### Simplified Display (#37)
Cash transactions don't need full card transaction details.

**Show only**:
- MID / Merchant name
- Transaction date
- Cash amount
- Change amount (if any)
- Receipt number

**Hide**:
- Card details
- Authorization code
- Issuer bank
- All card-specific fields

---

### Scene 10: ISO Logs (VietPay)

**Comments**: #36

#### Placeholder Status (#36)
**Current**: Page exists but function unclear.

**Purpose** (clarify with stakeholders):
- Raw ISO 8583 message logs?
- System integration logs?
- API request/response logs?

**Action**: Define purpose before implementing UI.

---

### Scene 11: Payouts (VietPay)

**Comments**: #43

#### Critical Glance Value (#43)
**Most important metric**: How much merchant receives.

**Hierarchy**:
1. **Net payout amount** (large, prominent)
2. **Payout date** (second most important)
3. Other details (fee breakdown, original amount, etc.) — less prominent or collapsed

**Current issue**: All fields same visual weight.

---

### Scene 12: Invoices (VietPay)

**Comments**: #39, #49, #53

#### Export Priority (#39)
Export/Download is THE most important action for invoicing.

**Design**:
- Export button: Primary CTA, top-right
- Options: PDF / Excel / CSV
- Bulk export (select multiple invoices)

#### Filter Framework (#49)
Standard filter pattern for all modules:

**Components**:
1. **Column dropdown**: Select which columns to display
2. **Time range**: Date picker (from/to)
3. **Sub-filters**: Module-specific (invoice status, merchant, amount range)

**Example**:
```
┌─────────────────────────────────────────┐
│ [Columns ▼] [Date Range ▼] [Filter ▼]  │
│                                  [Export]│
└─────────────────────────────────────────┘
```

#### API Integration (#53)
**Status**: Under construction, integrating with external accounting API.

**Action**: Placeholder screen showing integration status + estimated completion.

---

### Scene 13: Downloads (VietPay)

**Comments**: #54-62

#### Flow Complexity (#54)
**Current flow**: Too many steps
1. User requests export
2. Popup confirmation
3. Redirect to Downloads page
4. Wait for file generation
5. Click download link

**Improved flow**:
1. Request export
2. Toast notification: "Export queued"
3. Background processing
4. Push notification when ready
5. Direct download link in notification

#### Reference Number (#55)
**Issue**: Ref number only useful for IT debugging backend.

**Fix**: Hide from user view, show only in admin/debug mode.

#### Timestamp Clarity (#56, #57)
Two timestamps cause confusion:

**Rename**:
- **#56**: "Request Created" — When user clicked export
- **#57**: "File Generated" — When report finished processing

**Visual**:
- Show both with icons
- If file not ready, show spinner on "File Generated"

#### Download Trigger (#58)
**Issue**: User must click "Download" button to get file.

**Improvement**:
- Auto-download when file ready (optional setting)
- OR more prominent "Download Ready!" indicator

#### File Naming (#59, #61)
**Current**: Generic names or unclear format.

**Required format**:
```
{Category}_{DateRange}_{GeneratedDate}.{ext}

Examples:
Auth_TXN_report_2024-01-01_to_2024-01-31_20240201.xlsx
Payout_report_January_2024_20240201.pdf
```

**Display name** (#61):
- User-friendly shortened name in UI
- Hover tooltip shows full filename

#### Admin vs Personal View (#60)
**Two tabs needed**:

```
[ My Downloads ] [ All Downloads ]
                    ↑ Admin only
```

**My Downloads**:
- Shows user's own export history
- Available to all users

**All Downloads**:
- Shows all users' exports
- Admin only
- Columns: User, File, Date, Size, Status

#### Generation Status (#62)
**Issue**: Files still generating show only dash (`—`), no status indicator.

**Fix**:
```
Status indicators:
⏳ Generating... (with spinner)
✅ Ready to download
❌ Failed (with retry button)
⏸ Queued (position in queue)
```

**Tooltip**: Show estimated time remaining.

---

### Scene 14: Merchant Management

**Comments**: #63-69, #77

#### Strong Agreement (#63)
(Context: Agreeing with a previous comment — check original for specifics)

#### Entity Filter (#64)
**Requirement**: PVCB / VietPay / All tabs (see Global Requirements).

**Implementation note**: Native entity tag already exists in data — just need UI toggle.

#### Summary Redundancy (#65)
"Summary" button just redirects to Business tab.

**Action**: Remove or make it show actual summary modal.

#### Entity Color Coding (#67)
**Issue**: PVCB and VietPay use same colors as status tags (active/inactive).

**Fix**:
- **Entity tags**: 
  - PVCB: Blue background
  - VietPay: Green background
- **Status tags**:
  - Active: Different green shade
  - Inactive: Gray
  - Pending: Orange

**Never overlap** entity color with status color.

#### Search Enhancement (#68)
See Global Requirements #3.

**Merchant-specific search fields**:
- CCCD (National ID of owner)
- Business address
- POS serial number

#### Sort Function (#69)
See Global Requirements #4.

**Time-sensitive note**: Sort only applies to currently loaded view.  
Don't try to sort all historical data (performance issue).

#### Comment Scope (#77)
Note: Comments #63-69 and #77 all apply to Merchant Management (Scenes 14-17).

---

### Scene 15: Revenue (VietPay)

**Comments**: #70-72

#### Placeholder Status (#70)
**Current**: Page is placeholder, function not defined.

**Action**: Clarify purpose with stakeholders before designing.

#### Agreement (#71)
(Agreeing with previous comment)

#### Filter Priority (#72)
**CRITICAL REQUEST** from both teams (PVCB + VietPay):

Need **merchant filter** (not just search).

**Implementation**:
```
Merchant filter dropdown:
- [ ] All merchants
- [ ] Top 10 by volume
- [ ] Active only
- [ ] Pending approval
- [ ] Inactive
- Custom selection (multi-select dropdown)
```

This applies to ALL modules, not just Revenue.

---

### Scene 16: Business Applications (VietPay)

**Comments**: #66, #73

#### Filter Repositioning (#66)
**Issue**: Filter button placement not intuitive.

**Fix**: Move to standard position (top-right, before export).

#### CIF and Region (#73)
**CIF** (Customer Information File) and **Region** fields:
- Filled by PVCB staff only
- VietPay team has NO access to edit
- Read-only for VietPay users

**UI implication**: Show as disabled/grayed out for VietPay users.

---

### Scene 17: Approvals (VietPay)

**Comments**: #74-76

#### Maker-Checker Workflow (#74)
**Both roles** are PVCB staff (not VietPay):
- **Maker**: Creates/submits application
- **Checker**: Reviews and approves/rejects

**Two-layer approval** process (both PVCB internal).

#### Gateway ID = MID (#75)
**Inconsistency**: Header says "Gateway ID" but it's actually MID (Merchant ID).

**Fix**: Use consistent terminology — rename to "MID" everywhere.

#### Application Status + Notifications (#76)
**Missing**:
- Visual status indicator (pending/approved/rejected/needs info)
- Notification system:
  - Maker notified when checker approves/rejects
  - Checker notified when maker resubmits after rejection

**Status workflow**:
```
Draft → Submitted → Under Review → [Approved | Rejected | Need More Info]
                                         ↓
                                   Activated
```

---

### Scene 40: Staff Management (VietPay)

**Comments**: #50, #51

#### Permission Grant Redirect (#50)
Click user row → Redirect to permission management page.

**Permission page**:
- Checkbox grid: User × Module × Action
- Role templates (Admin, Viewer, Manager)
- Custom permissions
- Save/Cancel buttons

#### Edit History Audit (#51)
**Requirement**: Track who edited user permissions.

**Audit log fields**:
- Timestamp
- Editor (who made the change)
- User affected
- Changes made (before/after)
- Reason (optional comment)

**Access**: Admin-only view, linked from user detail page.

---

## Design Patterns & Components

### Standard Filter Framework

Use across ALL modules:

```html
<div class="filter-bar">
  <!-- Left side -->
  <div class="filter-left">
    <input 
      type="search" 
      placeholder="Search merchants, MID, CCCD..."
      class="search-compact"
    />
  </div>
  
  <!-- Right side -->
  <div class="filter-right">
    <button class="btn-filter">
      <icon>filter</icon> Filter
    </button>
    <button class="btn-export">
      <icon>download</icon> Export
    </button>
  </div>
</div>

<!-- Filter dropdown (opens from Filter button) -->
<div class="filter-dropdown">
  <section>
    <h4>Columns</h4>
    <checkbox-list />
  </section>
  
  <section>
    <h4>Date Range</h4>
    <date-range-picker />
  </section>
  
  <section>
    <h4>Advanced Filters</h4>
    <!-- Module-specific filters -->
  </section>
  
  <footer>
    <button>Reset</button>
    <button class="primary">Apply</button>
  </footer>
</div>
```

### Entity Tabs Component

```html
<div class="entity-tabs">
  <button class="tab active">All</button>
  <button class="tab">PVCB</button>
  <button class="tab">VietPay</button>
</div>

<style>
.entity-tabs .tab {
  padding: 8px 24px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
}

.entity-tabs .tab.active {
  background: var(--vp-primary);
  color: white;
  border-radius: 8px 8px 0 0;
}
</style>
```

### Glance Value Card

```html
<div class="glance-card" onclick="navigateToDetail()">
  <div class="glance-header">
    <h3>Partner Name</h3>
    <span class="badge badge-active">Active</span>
  </div>
  
  <div class="glance-metrics">
    <div class="metric">
      <label>MID</label>
      <value>123456789</value>
    </div>
    <div class="metric primary">
      <label>Lifetime Points</label>
      <value>1,234,567 pt</value>
    </div>
    <div class="metric">
      <label>Monthly Avg</label>
      <value>45,678 pt</value>
    </div>
    <div class="metric">
      <label>Referred Merchants</label>
      <value>23</value>
    </div>
  </div>
  
  <div class="glance-footer">
    <span>View Details →</span>
  </div>
</div>
```

### Table with Sort

```html
<table class="data-table sortable">
  <thead>
    <tr>
      <th class="sortable" data-sort="date">
        Date 
        <icon class="sort-desc">↓</icon>
      </th>
      <th class="sortable" data-sort="merchant">
        Merchant
      </th>
      <th class="sortable" data-sort="amount">
        Amount
      </th>
    </tr>
  </thead>
  <tbody>
    <!-- Data rows -->
  </tbody>
</table>
```

## Technical Implementation Notes

### Entity Filtering
```javascript
// URL parameter approach
const entity = new URLSearchParams(window.location.search).get('entity') || 'all';

// API call includes entity filter
fetch(`/api/transactions?entity=${entity}&date=${dateRange}`)
  .then(response => response.json())
  .then(data => renderTable(data));

// Filter applies to ALL widgets on page
function applyEntityFilter(selectedEntity) {
  updateURL({ entity: selectedEntity });
  refreshDashboardKPIs(selectedEntity);
  refreshTransactionChart(selectedEntity);
  refreshMerchantTable(selectedEntity);
}
```

### Column Visibility Persistence
```javascript
// Save user preference
const columnPrefs = {
  userId: currentUser.id,
  module: 'transactions-authorized',
  visibleColumns: ['mid', 'merchant', 'date', 'amount', 'status']
};

localStorage.setItem('column-prefs', JSON.stringify(columnPrefs));

// OR save to backend
await fetch('/api/user/preferences', {
  method: 'POST',
  body: JSON.stringify(columnPrefs)
});
```

### File Download Status Polling
```javascript
// Poll download status every 3 seconds
const pollStatus = setInterval(async () => {
  const status = await fetch(`/api/downloads/${fileId}/status`).then(r => r.json());
  
  if (status.state === 'completed') {
    clearInterval(pollStatus);
    showDownloadReady(status.downloadUrl);
  } else if (status.state === 'failed') {
    clearInterval(pollStatus);
    showError(status.error);
  } else {
    updateProgress(status.progress); // Show spinner + %
  }
}, 3000);
```

## Priority Matrix

### P0 - Critical (Must Have)
1. Entity filter tabs (ALL | PVCB | VIETPAY) — **All modules**
2. Column selection filter — **All table views**
3. Merchant filter (not just search) — **All modules** (#72)
4. Lifetime vs Balance points distinction — **Commission** (#22)
5. Glance value + detail redirect — **All detail pages**
6. Export functionality — **Invoices, Downloads** (#39)

### P1 - High (Should Have)
7. Multi-field search — **Merchant Management** (#68)
8. Sort functionality — **All tables** (#69)
9. Entity color coding fix — **Merchant Management** (#67)
10. Error code visibility — **Transactions** (#35, #38)
11. Download flow improvement — **Downloads** (#54)
12. Network tree diagram — **Network** (#15)

### P2 - Medium (Nice to Have)
13. Icon replacement for card types — **Transactions** (#40)
14. Dashboard background — **Dashboard** (#6)
15. Sidebar scroll — **Navigation** (#7)
16. Device & category filters — **Dashboard** (#16)

### P3 - Low (Future)
17. POS rental commission — **Commission** (#18, not implemented yet)
18. ISO Logs clarification — **ISO Logs** (#36, purpose unclear)
19. Revenue page definition — **Revenue** (#70, placeholder)

## Known Issues (UAT/Test Data)

1. **Balance Points = Lifetime Points** (#22) — Should be different
2. **Refund missing settlement date** (#48) — Incomplete test data
3. **PVCB filter shows no data** (#14) — Expected for PVCB-only view
4. **Summary tab redirects** (#4, #5) — Remove or overhaul

## Module Status

| Module | Status | Priority |
|--------|--------|----------|
| Dashboard | 🟡 Needs improvements | P0 |
| Transactions | 🟡 Needs improvements | P0 |
| Network | 🔴 Under construction | P1 |
| Commission | 🟡 Needs improvements | P0 |
| Merchant Mgmt | 🟡 Needs improvements | P0 |
| Payouts | 🟢 Mostly complete | P2 |
| Invoices | 🔴 API integration pending | P1 |
| Downloads | 🟡 Needs UX overhaul | P1 |
| Revenue | 🔴 Placeholder (undefined) | P3 |
| ISO Logs | 🔴 Placeholder (undefined) | P3 |
| Staff Mgmt | 🟡 Needs audit log | P1 |
| Approvals | 🟡 Needs status + noti | P1 |

Legend:
- 🟢 Green: Feature complete, minor polish needed
- 🟡 Yellow: Core exists, needs improvements
- 🔴 Red: Not implemented or major rework needed

## Stakeholder Context

**Comments by**: Duy Dang 303  
**Total comments**: 77  
**Scope**: Comprehensive review of MMS across all modules  
**Date**: Based on Frame 357-473, 357-873, 14-4491 from Figma  

**Key stakeholders**:
- **VietPay team**: Product owners, primary users
- **PVCB team**: Shared users, restricted access
- **Design team**: UI/UX improvements
- **Engineering**: Implementation

## When to Use This Skill

Use `/vpmmsdoc` when:
- Implementing ANY MMS module
- Reviewing MMS design specs
- Prioritizing MMS features
- Understanding PVCB vs VietPay access differences
- Debugging UAT issues
- Planning MMS sprints
- Onboarding new team members to MMS

## Related Skills

- `/vpdesignsys` — VietPay design system (colors, components, patterns)
- `/vpappdesign` — VietPay mobile app design (onboarding flows)

Use together: `/vpdesignsys` for UI components + `/vpmmsdoc` for MMS requirements.

---

**Last updated**: Based on 77 comments from Duy Dang + Figma MMS designs (Q0L6cuUisd4oNgVozrJQby)  
**Version**: 1.0  
**Document Type**: Product Requirements + Improvement Backlog
