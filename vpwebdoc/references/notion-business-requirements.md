# Notion business requirements

Source page: `Web presence - Business requirements`

- URL: `https://app.notion.com/p/zxstimlabs/Web-presence-Business-requirements-3b6d4deb717c8000b844ef7a6cd16d90`
- Page ID: `3b6d4deb-717c-8000-b844-ef7a6cd16d90`
- Workspace at time of reading: `ZxStimLabs`
- Last complete read: 2026-08-21, through an authenticated Guest session without export/copy permission
- Comments: no page or block discussions were present at the time of that read
- Provenance: recovered from the local full-page transcription retained in Claude file history after the live Codex Notion connector, authenticated to a different workspace, returned `object_not_found`

This reference captures the full substantive body of the page. A live refresh is still required to detect edits made after 2026-08-21.

## Page identity

**Title:** Web Presence

**Description:** The public web presence (`vietpay.com`) — VietPay's front door for marketing, sales, and developer acquisition.

The website is where prospective merchants, partners, and developers discover VietPay, understand the products, and convert into sign-ups, leads, and developer trials. Product-level detail belongs in the linked `Company Website product requirements`, which was not opened in the retained source session and remains a separate source gap.

## Intent

- Create a compelling public presence that turns interest into customers.
- Act as the top of the funnel for every product line.
- Showcase the suite, establish trust and credibility, and convert prospects into merchant sign-ups, sales leads, and developer trials.
- Feed Identity & Access onboarding and the Sandbox developer shopfront.
- Operate primarily as a marketing and sales asset: owned by Growth/Marketing, changed frequently, and measured by conversion rather than as a payment capability.
- Treat credibility, speed, and clarity as business-critical because the site is the public front door.

## Actors and dependencies

### Actors

- Prospective merchant evaluating VietPay for payment acceptance.
- Prospective partner evaluating a channel partnership or licensing.
- Prospective developer evaluating the Everything API.
- Existing customer returning for information, pricing, or support entry points.
- Marketing & Growth, which owns content, campaigns, brand, and conversion.
- Sales, which receives and acts on leads.
- Brand, Legal & Compliance, which reviews content and regulated claims.

### Dependencies

- **Product Descriptions:** authoritative customer-facing product content; the website presents this story and does not invent it.
- **Identity & Access:** receives merchant and developer sign-up conversions.
- **Sandbox:** provides the Everything API shopfront, public API documentation, and self-service developer sign-up.
- **Incentivization:** powers referral landing pages, promotions, and campaign mechanics.
- **Foundations:** provides SDKs, public documentation, security controls, and the DevX standard.
- **CMS and hosting:** provides the build and publishing platform.

### Outputs and handoffs

- Merchant and developer sign-ups to Identity & Access.
- Qualified demo, contact, and quote leads to Sales.
- Developer trials to Sandbox.
- Referral conversions to Incentivization.
- Funnel and conversion data to Analytics & Growth.

## End-to-end flow

1. A visitor arrives through search, campaign, referral link, or direct traffic.
2. The visitor explores the product suite, approved pricing where available, and trust content.
3. The visitor converts by starting merchant sign-up, requesting a demo or quote, starting a developer Sandbox trial, or submitting a partner/licensing enquiry.
4. The site hands the conversion to Identity & Access, Sales, or Sandbox.
5. Marketing publishes and maintains pages, campaigns, and content without an engineering release.

## Required capabilities

- Present the product suite using Product Descriptions, without independently restating or contradicting it.
- Publish marketing pages, articles/blog posts, and SEO landing pages.
- Present pricing only where officially signed off.
- Capture demo, contact, quote, and partner/licensing enquiries.
- Drive merchant and developer sign-up into onboarding and Sandbox.
- Surface public API documentation and self-service Sandbox sign-up.
- Run campaign and referral landing pages for Incentivization.
- Localize into Vietnamese and English at minimum.
- Show accurate trust signals covering partners, compliance, security, and PVComBank backing/relationship.
- Give Marketing self-service editing, review, and publishing.
- Measure analytics and conversion across the full funnel.

## Rules and constraints

### Content and brand

- Every website product claim must be backed by Product Descriptions and must not contradict them.
- State each approved fact once at its owning layer rather than creating competing versions.
- Brand, tone, and content follow Marketing and Brand governance.

### Numbers and pricing

- No fee, rate, or limit may appear publicly until signed off.
- Illustrative numbers from internal capability pages are not public facts.
- Public pricing depends on the acquiring `Fee schedule & limit values` decision.

### Legal and compliance

- Publish and maintain Terms, Privacy, and required regulatory disclosures.
- Describe the PVComBank relationship and licensing accurately.
- Licensing, guarantees, performance, and other regulated claims require Compliance review.
- Specific Vietnamese advertising/regulatory references were placeholders in the source and remain to be confirmed.

### Localization

- Vietnamese-first.
- Maintain content parity across supported languages.

### Security and data

- The public website holds no sensitive customer data.
- Regulated sign-up information is handed to Identity & Access rather than collected by the marketing site.
- Ordinary lead data must be handled according to approved privacy commitments.

## Non-functional expectations

- **Performance:** fast load and strong SEO.
- **Availability:** high uptime because downtime means lost pipeline.
- **Scalability:** absorb campaign and launch traffic spikes without degradation.
- **Accessibility:** meet an explicitly selected accessibility standard.
- **Security:** hardened public surface, including edge/WAF protection, with no sensitive data at rest.
- **Maintainability:** Marketing can publish and update without an engineering release.

## Open decisions from the Notion source

These were open in the Notion page. Apply later confirmed decisions from the Google Doc updates or approved stakeholder comments where they resolve them.

- **Public pricing:** whether and how to publish it; blocked by the acquiring fee schedule/limit decision.
- **Languages beyond Vietnamese and English:** launch scope for any additional language.
- **CMS and content workflow:** CMS plus review/publish workflow. The CMS was later confirmed as Sanity, but detailed roles and workflow remain open.
- **Lead routing/CRM:** destination, ownership, and selected platform.
- **Docs and Sandbox placement:** same domain as marketing or a separate domain/subdomain.
- **Brand guidelines:** confirm the VietPay brand system.

## Items to confirm

- Vietnamese advertising and regulatory rules for financial services and required disclosures.
- Approved analytics and consent stack under Vietnamese data-protection law.
- The linked `Company Website product requirements` page and any requirements it adds.

## Reconciliation with later sources

- The Notion page uses `partner` broadly enough to include channel partners and banks. Later stakeholder direction narrows ordinary website `Partners` copy to Affiliate/Agent/Collaborator. Keep banks and licensing under Enterprise/Strategic Partnership.
- The Notion CMS question is partly resolved by the later confirmation of Next.js latest and Sanity. Hosting, workflow, permissions, preview/staging, redirects, localization architecture, and deployment remain open.
- Vietnamese and English are the confirmed baseline. Only languages beyond those remain open.
- The Notion requirement to show PVComBank trust signals does not authorize invented claims; exact relationship and licensing wording still requires Compliance approval.
