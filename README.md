# Pollution Free India

This project aims to create a platform for promoting pollution-free initiatives in India via generation of personalized emails.

## Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pollution-free-india-v0.git
   cd pollution-free-india-v0
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure env variables

Copy `.env.example` to `.env` and update the values if necessary.

For the RESEND_API_KEY:
1. Sign up for a free account at [Resend](https://resend.com)
2. Create an API key from your dashboard
3. Add the API key to your `.env` file

## Running the Application
To run the application locally, use the following command:
```bash
npm run dev
```
This will start the development server on `http://localhost:3000`.

## Testing in the Browser
Open your web browser and navigate to `http://localhost:3000` to view the application. You can make changes to the code, and the browser will automatically refresh to reflect those changes.