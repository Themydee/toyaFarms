# Toya Farms Pre-Order App

A simple React frontend with a Node.js/Express backend for managing pre-orders of fresh pork products, including real-time stock tracking and WhatsApp order confirmation.

---

## Features

- View current available stock of pork (in kilograms)
- Place pre-orders by submitting name, phone number, and quantity
- Backend reduces stock quantity upon successful order
- Orders are confirmed via WhatsApp redirect with pre-filled message
- Responsive UI styled with Tailwind CSS
- Stock initialization on backend startup if none exists

---

## Tech Stack

- Frontend: React, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express, MongoDB (Mongoose)
- WhatsApp API for order confirmation link

---

## Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Backend

1. Clone the repository and navigate to the backend folder:

```bash
cd backend

```

2. Install Dependencies:

```bash

npm install

```


3. Create a .env file:

```bash

MONGODB_URI=mongodb://localhost:27017/toyafarms
PORT=3000


```

4. Run the backend:

```bash

npm run dev

```


### Frontend

1. Clone the repository and navigate to the frontend folder:

```bash
cd frontend

```

2. Install Dependencies:

```bash

npm install

```

3. Run the frontend:

```bash

npm run dev

```
