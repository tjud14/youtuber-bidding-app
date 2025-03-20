# Project State

## Current State
The project is a SvelteKit application for "Betting on Alaska Auctions" - a youtuber bidding platform. The application provides an interface for users to participate in auctions related to various categories including general auctions, knives, art, and miscellaneous items.

## Project Structure
The project follows a typical SvelteKit structure:
- `src/routes/` - Contains the pages and layouts of the application
  - `+layout.svelte` - Main application layout with global components
  - `profile/+page.svelte` - User profile page with GlowingEffect implementation
  - Various route folders containing page components and logic
  - `enhanced-3d-showcase4/` - Demo page for the 3D card component
- `src/lib/` - Contains reusable components, utilities, and stores
  - `components/` - Reusable UI components
    - `ui/` - Generic UI components 
      - `Background/BeamsBackground(Animated).svelte` - Animated background with light beams
      - `Glowing-Effect/GlowingEffect.svelte` - Interactive glowing border effect
      - `Focus/FocusCard.svelte` and `Focus/Card.svelte` - Interactive cards with focus effects
    - `Navbar.svelte` - Main navigation component
  - `utils/` - Utility functions and helpers
    - `utils.js` - Common utility functions including the `cn` function for class composition
    - `profanity-filter.js` - Utility for filtering profanity from user inputs
  - `stores/` - Svelte stores for state management
    - `auth.js` - Store for handling authentication state
- `static/` - Contains static assets like images
  - `images/` - Image assets for the application
    - Former background images and pattern SVGs
    - Profile card images for the FocusCard component

## Features
- Authentication system with user login/registration
- Nickname checking functionality with profanity filter
- User profile management with email notification preferences
- Navigation with sections for Auctions, Knives, Art, and Misc
- Support chat system
- YouTube integration
- Enhanced UI components with animated effects

## Recent Changes
- Added a BeamsBackground component to provide an animated background effect across all pages
- Modified the main layout to use this animated background instead of the previous static image background
- Updated the profile page to remove the old background class and leverage the global BeamsBackground
- Replaced the FocusCard implementation with GlowingEffect on the profile page
- Implemented a tabbed interface for the profile page with a glowing card effect
- Improved the styling of the profile page with semi-transparent elements and backdrop blur effects
- Added auto-dismissing success and error notifications with fade animations (5-second timeout)

## Core Components
- `BeamsBackground(Animated).svelte` - An animated background component that creates a dynamic light beam effect using canvas
- `Navbar.svelte` - The main navigation component with links to different sections
- `NicknameCheckWrapper.svelte` - A wrapper component that checks for user nicknames
- `Enhanced3DCard.svelte` - A component for creating interactive 3D card effects with layering capabilities
- `GlowingEffect.svelte` - A component that adds an interactive glowing border to elements
- `FocusCard.svelte` - A component that creates a gallery of cards where the focused card stands out while others blur

## Styling
- Using Tailwind CSS for responsive styling
- The `cn` utility function from `src/lib/utils/utils.js` is used for class name composition (combines clsx and tailwind-merge)
- Custom CSS defines styles for specific components and effects
- Extensive use of backdrop-blur, semi-transparency, and shadow effects to complement the animated background

## Authentication
- Authentication status is checked when the application loads
- Using a store called `isAuthenticated` to manage authentication state
- User data is displayed in the UI once authenticated
- Profile management with fields for display name and notification preferences

## Development Environment
- The application runs on port 5175 in development mode
- Uses Vite as the development server
- SvelteKit for routing and server-side rendering capabilities 