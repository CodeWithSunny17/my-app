# Event Manager

## Overview

Event Manager is a web application built with Next.js and Tailwind CSS that allows users to create and manage events efficiently.

## Features

- Create events with media upload
- View all created events in a grid layout
- Delete events individually
- Responsive design with a two-column grid layout

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd event-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:3000`

## Technologies Used

- Next.js
- Tailwind CSS
- React

## Project Structure

```
/event-manager
├── src
│   ├── app
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── globals.css
│   ├── components
│   │   ├── CreateEvent.jsx
│   │   ├── MyEvents.jsx
│   │   ├── ui
│   │   │   ├── input.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── select.jsx
│   │   │   ├── textarea.jsx
│   │   │   ├── label.jsx
│   ├── lib
│   │   ├── utils.js
├── public
│   ├── image.png
├── package.json
├── tailwind.config.mjs
├── next.config.mjs
└── README.md
```

## Usage

1. Click on 'Create Event' to add a new event.
2. Upload an image and set event details.
3. View your created events in a responsive grid layout.
4. Click on the delete button to remove an event.

## Contributing

Feel free to contribute by creating a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
