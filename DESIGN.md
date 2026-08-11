---
version: alpha
name: Candy's Cats Links
description: Semantic design tokens and component guidance for the Candy's Cats link shortener, derived from the Candy's Cats Brand Guidelines v1.0.
colors:
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.3647 0.0431 227.02)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.3647 0.0431 227.02)"
  primary: "oklch(0.4245 0.0508 227.17)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.9055 0.0192 196.82)"
  secondary-foreground: "oklch(0.3647 0.0431 227.02)"
  muted: "oklch(0.9656 0.0064 197.05)"
  muted-foreground: "oklch(0.53 0.042 224)"
  accent: "oklch(0.9055 0.0192 196.82)"
  accent-foreground: "oklch(0.3647 0.0431 227.02)"
  success: "oklch(0.55 0.16 145)"
  success-foreground: "oklch(0.985 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.89 0.02 200)"
  input: "oklch(0.89 0.02 200)"
  ring: "oklch(0.4245 0.0508 227.17)"
  chart-1: "oklch(0.9055 0.0192 196.82)"
  chart-2: "oklch(0.7663 0.0476 196.2)"
  chart-3: "oklch(0.63 0.065 208)"
  chart-4: "oklch(0.51 0.058 220)"
  chart-5: "oklch(0.4245 0.0508 227.17)"
  sidebar: "oklch(0.9656 0.0064 197.05)"
  sidebar-foreground: "oklch(0.3647 0.0431 227.02)"
  sidebar-primary: "oklch(0.4245 0.0508 227.17)"
  sidebar-primary-foreground: "oklch(1 0 0)"
  sidebar-accent: "oklch(0.9055 0.0192 196.82)"
  sidebar-accent-foreground: "oklch(0.3647 0.0431 227.02)"
  sidebar-border: "oklch(0.89 0.02 200)"
  sidebar-ring: "oklch(0.4245 0.0508 227.17)"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.3647 0.0431 227.02)"
  dark-background: "oklch(0.235 0.032 228)"
  dark-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-card: "oklch(0.285 0.034 228)"
  dark-card-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-popover: "oklch(0.285 0.034 228)"
  dark-popover-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-primary: "oklch(0.7663 0.0476 196.2)"
  dark-primary-foreground: "oklch(0.26 0.035 228)"
  dark-secondary: "oklch(0.335 0.036 228)"
  dark-secondary-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-muted: "oklch(0.315 0.034 228)"
  dark-muted-foreground: "oklch(0.735 0.03 205)"
  dark-accent: "oklch(0.355 0.038 225)"
  dark-accent-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-success: "oklch(0.72 0.17 145)"
  dark-success-foreground: "oklch(0.18 0.04 145)"
  dark-destructive: "oklch(0.704 0.191 22.216)"
  dark-border: "oklch(0.9656 0.0064 197.05 / 12%)"
  dark-input: "oklch(0.9656 0.0064 197.05 / 16%)"
  dark-ring: "oklch(0.62 0.05 205)"
  dark-chart-1: "oklch(0.9055 0.0192 196.82)"
  dark-chart-2: "oklch(0.82 0.035 197)"
  dark-chart-3: "oklch(0.7663 0.0476 196.2)"
  dark-chart-4: "oklch(0.68 0.06 202)"
  dark-chart-5: "oklch(0.6 0.065 210)"
  dark-sidebar: "oklch(0.265 0.033 228)"
  dark-sidebar-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-sidebar-primary: "oklch(0.7663 0.0476 196.2)"
  dark-sidebar-primary-foreground: "oklch(0.26 0.035 228)"
  dark-sidebar-accent: "oklch(0.355 0.038 225)"
  dark-sidebar-accent-foreground: "oklch(0.9656 0.0064 197.05)"
  dark-sidebar-border: "oklch(0.9656 0.0064 197.05 / 12%)"
  dark-sidebar-ring: "oklch(0.62 0.05 205)"
typography:
  sans:
    fontFamily: "IBM Plex Sans, sans-serif"
  heading:
    fontFamily: "IBM Plex Sans, sans-serif"
rounded:
  base: 0.625rem
  lg: 0.625rem
components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
  sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
---

## Overview

This file is a derived summary for design-aware agents. If it conflicts with `app/assets/css/tailwind.css` or a component under `app/components/ui/**`, the CSS and UI component implementation are authoritative.

## Colors

The unprefixed tokens reproduce the semantic roles in `:root`; `dark-*` tokens flatten the corresponding `.dark` values. Always use roles as intended and keep each background paired with its foreground.

Every role is drawn from the Candy's Cats brand palette:

| Brand name | Hex | Roles it fills |
| --- | --- | --- |
| Marea Baja | `#2E5464` | `primary`, `ring`, `sidebar-primary`, `chart-5` |
| Blithe Blue | `#90BDBD` | `dark-primary`, `chart-2` |
| Deep Marea | `#244350` | `foreground`, `card-foreground`, `secondary-foreground`, `accent-foreground` |
| Soft Blithe | `#D2E4E4` | `secondary`, `accent`, `sidebar-accent`, `chart-1` |
| Pale Neutral | `#EFF5F5` | `muted`, `sidebar`, `dark-foreground` |
| White | `#FFFFFF` | `background`, `card`, `popover`, `primary-foreground` |

Marea Baja is the dominant color and Blithe Blue is an accent: keep Blithe Blue to roughly a quarter of a layout at most, and never set it as body text — pair it with Deep Marea or near-black on top. Whites and pale neutrals should carry the majority of any layout's background.

The `chart-1` through `chart-5` sequence is a light-to-dark ramp inside the brand's two hue families and is for charts only; the `dark-chart-*` ramp is the same sequence shifted lighter so every step stays legible on dark surfaces. Use `success` for positive status and completion indicators, `ring` for focus emphasis, and `destructive` for destructive or invalid states, including their dark-mode counterparts. `success` and `destructive` sit outside the brand palette on purpose: they are status signals, not brand color.

## Typography

Use IBM Plex Sans for interface text. `heading` is an alias of the same family, not a separate display face. Components choose font size, weight, and line height with local utilities; this file does not define a global type scale.

## Layout

The repository does not define a global grid, container, breakpoint, or spacing scale. Follow adjacent implementations when composing screens. Sidebar widths and responsive behavior belong to the sidebar component and are not global layout tokens.

## Elevation & Depth

Base surfaces establish depth with semantic backgrounds, borders, and rings. Dialogs and floating content use overlays, rings, and shadows where their implementations specify them. Shadows are component implementation details, not global elevation tokens.

## Shapes

The base radius is `0.625rem`. Derived CSS radii are `sm = calc(var(--radius) - 4px)`, `md = calc(var(--radius) - 2px)`, `lg = var(--radius)`, and `xl = calc(var(--radius) + 4px)`. Utilities such as `rounded-2xl` and `rounded-4xl` are local component choices, not global design tokens.

Generous component radii coexist with compact density; a larger radius does not imply a larger control.

## Components

- Buttons provide default, outline, secondary, ghost, destructive, and link variants, multiple text and icon sizes, focus/invalid rings, active movement, and disabled treatment.
- Inputs and select triggers use input surfaces and borders with placeholder, hover where implemented, focus, invalid, and disabled states; select content uses popover colors and floating-content treatment.
- Cards pair card background and foreground colors, use a subtle ring, and provide default and small density variants. Use small density for repeated dashboard collections and default density for standalone sections, forms, and empty states.
- Standard dialogs use popover colors, an overlay, open/closed motion, and a subtle ring. The scrollable dialog variant instead uses the background role, a border, and a local shadow; other floating content follows its own implementation.
- Tabs provide default filled and line variants with active, hover, focus, disabled, horizontal, and vertical states. When a horizontal list does not fit, scrolling belongs to an outer wrapper, focus-ring clearance is preserved, and the active trigger remains visible.
- The sidebar uses its dedicated background, foreground, accent, border, and ring roles across responsive, collapsible, floating, and inset variants. Primary navigation uses the default shape while idle and a stronger pill treatment for both hover and active states. Secondary utilities are compact icon-only controls and rely on native collapsed behavior. Sidebar primary roles are defined but are not currently consumed by these components.

Components expose stable `data-slot` attributes for composition and styling. Reuse the existing UI components and their variants; do not hand-edit generated components under `app/components/ui/**`.

## Interaction

- Mobile keeps registry control sizes by default and uses larger official variants only when context needs a larger touch target.
- Use menus for compact contextual action lists and popovers for richer anchored content.
- When an overlay opens another, focus moves directly into the new surface and returns to the initiating control when the flow ends.

## Do's and Don'ts

**Do** use semantic colors, preserve background/foreground pairings in both themes, reuse existing components, and keep hover, focus, active, invalid, expanded, and disabled states consistent with nearby implementations.

**Don't** invent tokens, promote generated utility choices to global tokens, or hand-edit `app/components/ui/**`.
