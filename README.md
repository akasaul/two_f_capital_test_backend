# Test project backend for Two f capital

![Express.js](https://img.shields.io/badge/Express.js-4.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-yellow)
![Zod](https://img.shields.io/badge/Zod-Validation-green)
![CASL](https://img.shields.io/badge/CASL-Authorization-red)

Welcome to the **Niko Pizz Backend Project**! This backend is built with **Express.js** and **TypeScript**, using **Prisma** as the ORM for database management, **Zod** for data validation, and **CASL** for authorization. 🚀

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

## ✨ Features

- **Express.js** for fast, lightweight backend development.
- **TypeScript** for type safety and better development experience.
- **Prisma** as a modern ORM for database querying and management.
- **Zod** for runtime schema validation of inputs and requests.
- **CASL** for robust, dynamic role-based authorization.

## 🛠️ Technologies

| Tech           | Description                                  |
| -------------- | -------------------------------------------- |
| **Express.js** | Web framework for building server-side APIs. |
| **TypeScript** | Superset of JavaScript for type safety.      |
| **Prisma**     | ORM for interacting with the database.       |
| **Zod**        | Schema-based validation for request bodies.  |
| **CASL**       | Library to manage role-based permissions.    |

## 🚀 Getting Started

Follow these steps to get the project running locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-backend-project.git
   cd your-backend-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your configuration:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   JWT_SECRET="your_secret_key"
   ```

4. **Run Prisma migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. Your server is now running at `http://localhost:3000`.
