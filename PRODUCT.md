# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: the user left the stack choice to the agent. No UI scaffold exists yet; the repo currently holds only a GitHub Actions workflow. Decide when the first surface is built.

## Users

Two audiences, both confirmed:
- **Drapewell shoppers**: customers browsing and buying drapes on the storefront.
- **Drapewell operator**: the owner/staff who review and approve what the automation proposes before anything touches Shopify or CJ Dropship.

## Product Purpose

Drapewell sells drapes. The repository is its approval-gated, no-additional-cost automation system built on GitHub Actions and Google Sheets. Success means routine store operations run without added cost while a human stays in control of every consequential action.

## Positioning

Approval-gated automation: nothing acts on Shopify or CJ Dropship without explicit human approval, and it runs at no additional cost.

## Operating Context

- Automation runs in GitHub Actions; Google Sheets holds the Workflow Runs data.
- Connected tooling in use: Shopify (storefront) and CJ Dropship (sourcing/fulfilment).

## Capabilities and Constraints

- Initial scope is a manual Google Sheets Workflow Runs test only; no Shopify or CJ calls yet.
- Must stay no-additional-cost.
- Undecided: whether the shopper storefront is Shopify-themed or a separate site; how the operator approval UI is hosted.

## Brand Commitments

Name: Drapewell. No voice, logo, or visual identity has been confirmed.

## Evidence on Hand

None in the repo: no product copy, imagery, testimonials, pricing, or customer data. Future work must not fabricate any.

## Product Principles

- A human approves before the system acts.
- Cost stays at zero by default.
- Shopper and operator surfaces serve different jobs and are designed separately.
- Show real state; never imply an action happened that was not approved.
