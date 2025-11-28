# TinyLink - Premium URL Shortener

A modern, full-stack URL shortener application built with performance and aesthetics in mind. TinyLink allows users to shorten long URLs, track click analytics, and manage their links through a beautiful, responsive interface.

## 🌐 Live Demo

- **Frontend**: [https://tiny-link-generator.vercel.app/](https://tiny-link-generator.vercel.app/)
- **Backend**: [https://tinylink-generator.onrender.com/](https://tinylink-generator.onrender.com/)

## ✨ Features

- **🔗 Smart Shortening**: Instantly convert long, messy URLs into clean, short links.
- **📊 Real-time Analytics**: Track clicks, creation dates, and last active times for every link.
- **🎨 Premium UI/UX**: A glassmorphism-inspired interface built with Tailwind CSS for a high-end feel.
- **📱 Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices.
- **⚡ High Performance**: Built on a fast Node.js/Express backend and a reactive React frontend.
- **🛡️ Custom Aliases**: Option to create vanity URLs (e.g., `/my-brand`) for better branding.

## 🛠️ Tech Stack

### Frontend

- **React 18**: For building a dynamic and interactive user interface.
- **Vite**: Next-generation frontend tooling for lightning-fast builds.
- **Tailwind CSS**: Utility-first CSS framework for custom, modern styling.
- **React Router**: For seamless client-side navigation.
- **Axios**: For efficient HTTP requests.

### Backend

- **Node.js & Express**: Robust server-side runtime and framework.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **TypeScript**: For type-safe code across the entire stack.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas URI)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/tinylink.git
    cd tinylink
    ```

2.  **Setup Server**

    ```bash
    cd server
    npm install

    # Create .env file
    cp .env.example .env
    # Update MONGODB_URI in .env with your connection string
    ```

3.  **Setup Client**
    ```bash
    cd ../client
    npm install
    ```

### Running the App

1.  **Start the Backend Server**

    ```bash
    # In /server directory
    npm run dev
    ```

    The server will start on `http://localhost:4000`.

2.  **Start the Frontend Client**

    ```bash
    # In /client directory
    npm run dev
    ```

    The client will start on `http://localhost:5173`.

3.  **Open in Browser**
    Visit `http://localhost:5173` to start shortening links!

## 📝 API Endpoints

| Method   | Endpoint           | Description                   |
| -------- | ------------------ | ----------------------------- |
| `POST`   | `/api/links`       | Create a new short link       |
| `GET`    | `/api/links`       | Get all links for the user    |
| `GET`    | `/api/links/:code` | Get stats for a specific link |
| `DELETE` | `/api/links/:code` | Delete a short link           |
| `GET`    | `/:code`           | Redirect to the original URL  |

## 🎨 Design Philosophy

TinyLink follows a **"Glass & Gradient"** design language:

- **Glassmorphism**: Translucent panels with backdrop blur for depth.
- **Gradients**: Subtle background gradients to add vibrancy without distraction.
- **Typography**: Uses **Inter** for clean, legible, and modern text.
- **Interactions**: Smooth hover states and transitions for a premium feel.

## 📂 Project Structure

```bash
tinylink/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Header, LinkForm, etc.)
│   │   ├── pages/          # Page views (Dashboard, Stats, 404)
│   │   ├── services/       # API integration logic
│   │   └── styles/         # Global styles and Tailwind configuration
│   └── ...
│
└── server/                 # Backend Node.js Application
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/         # Mongoose schemas
    │   ├── routes/         # API route definitions
    │   └── utils/          # Helper functions
    └── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

_Built with ❤️ for the Assignment Submission_
