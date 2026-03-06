# HackerHub

## Current State
New project. No existing backend or frontend.

## Requested Changes (Diff)

### Add
- Password-protected entry screen: user must enter the correct password to access the app
- Navigation with four main sections: Games, Movies, Proxy, and Meme Soundboard
- **Games section**: embedded browser games (links/iframes to free online games like 2048, Snake, Tetris, etc.)
- **Movies section**: curated list of movie links (YouTube trailers or free streaming links like archive.org)
- **Proxy section**: a web proxy input that lets users enter a URL and navigate to it via an embedded iframe
- **Meme Soundboard section**: a grid of buttons, each plays a classic meme/hacker sound effect (e.g., "We're in", error beep, Matrix sounds, "Access Granted", etc.)
- Hacker aesthetic: dark terminal-style theme with green-on-black color palette, monospace fonts, glitch/scanline effects, blinking cursors, matrix-rain background decoration

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- Store the hashed access password in stable state
- `verifyPassword(password: Text) : Bool` -- checks if entered password matches stored hash
- `getGames() : [Game]` -- returns list of games with name, description, url
- `getMovies() : [Movie]` -- returns list of movies with title, description, url
- `getMemes() : [Meme]` -- returns list of meme sounds with name and audio url
- Admin: `setPassword(oldPassword: Text, newPassword: Text) : Bool` -- change access password

### Frontend
- Lock screen with password input and terminal-style "ENTER PASSWORD" prompt
- On correct password, unlock and reveal the main app (stored in sessionStorage so reload prompts again)
- Tab-based navigation: Games | Movies | Proxy | Soundboard
- Games tab: card grid of game tiles with embedded iframe viewer
- Movies tab: card grid of movie tiles with embedded iframe viewer
- Proxy tab: URL input bar, "CONNECT" button, iframe that loads the entered URL
- Soundboard tab: grid of meme sound buttons using Web Audio API or HTML5 Audio
- Persistent hacker terminal aesthetic with green glow, scanlines, monospace text, blinking elements
