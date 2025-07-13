# Caption Animation Module

This module provides a UI for creating animated captions, line by line, with per-line animation controls and a live preview. Built for video overlays, presentations, and captioning workflows.

## Features

- Input captions line by line
- Set animation style, duration, and exit for each line
- Preview animated captions with Framer Motion
- Easily extend for word-level animation and more advanced controls

## Components

- `CaptionEditor`: Edit lines and per-line animation controls
- `CaptionPreview`: Live preview of the current animated caption line
- `captionStore`: Zustand store for state management

## Usage

1. Enter or edit caption lines in the editor panel
2. Adjust animation, duration, and exit for each line
3. Click "Preview" to see the animation in the preview panel

## Extending

- Add word-level controls by splitting lines and storing per-word settings
- Add audio sync or auto-advance features
- Add export or integration with video editors

---

For questions or contributions, see the main project README.
