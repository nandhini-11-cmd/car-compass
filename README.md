# CarCompass

CarCompass is a MERN stack car recommendation platform that helps users discover the most suitable car based on their preferences.

## Features

* Browse available cars
* Personalized car recommendations
* Smart recommendation engine
* Budget-based filtering
* Fuel type filtering
* Seating capacity matching
* Travel pattern matching
* Match percentage scoring
* Recommendation reasons display
* Responsive UI

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Deployment

* Netlify (Frontend)
* Railway (Backend)

## Recommendation Engine

The recommendation system uses a two-stage process:

### Stage 1 - Hard Filtering

* Fuel Type
* Budget
* Seating Capacity

### Stage 2 - Weighted Scoring

* Usage Pattern
* Brand Preference
* Safety
* Mileage
* Performance
* Features

Results are ranked by match percentage and returned with recommendation reasons.

Session-based popup display – The recommendation popup is shown only once per browser session to avoid interrupting users repeatedly. To view it again, start a new browser session.

## Installation

### Backend

npm install

npm run dev

### Frontend

npm install

npm run dev

## Author

Nandhini
MERN Stack Developer
