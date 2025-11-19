# LearningYogi Timetable Frontend

React + Vite frontend application for displaying timetable data extracted via OCR.

## Features

- 📅 Display timetables in a grid layout matching the BrainMo design
- 🎨 Color-coded subjects with icons
- 📱 Responsive design
- 🔍 Filter timetables by teacher ID
- ⚡ Fast and modern React with TypeScript

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:5173` and proxy API requests to `http://localhost:3000/api`

## Build

```bash
npm run build
```

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
  components/
    timetable/     # Timetable-specific components
    common/        # Reusable components
  services/        # API client
  hooks/           # Custom React hooks
  types/           # TypeScript types
  utils/           # Utility functions
```

