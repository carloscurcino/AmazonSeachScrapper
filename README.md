# Amazon Scraper - Project for Test Project Task for a Job Application

## Introduction
This project consists of an Express.js API backend for scraping Amazon product data and an HTML frontend for displaying search results.

## Prerequisites
Ensure you have Node.js and npm installed on your system.

## Backend Setup
1. Clone this repository to your local machine.
2. Navigate to the `backend` directory: `cd backend`.
3. Install dependencies by running: `npm install`.
4. Start the server by running: `npm start`.
5. The Express.js API will now be running at `http://localhost:3000`.

## Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`.
2. Open the `index.html` file in your preferred web browser.

## Usage
1. In your web browser, enter a search query into the input field.
2. Click the search button.
3. The frontend will send a request to the backend API, which will scrape Amazon for products matching the search query.
4. The scraped product data will be displayed on the webpage.

## Backend API Endpoints
- `/`: Returns a simple "Hello World!" message.
- `/scrape`: Accepts a `keyword` query parameter and returns scraped product data from Amazon.

## Technologies Used
- Express.js
- Axios
- jsdom

## Credits
This project was developed by [Carlos Curcino](https://carloscurcino.com/).