# My TravelBlog

## Overview
My TravelBlog is a web application that allows users to explore the cities I've visited through an interactive map. Users can read my travel posts, leave messages, and even create their own travel posts. The application is built using Node.js and Express, with MongoDB as the database. It also utilizes various npm packages for features like authentication, image upload, and map integration.

## Features
- **Interactive Map**: View a map showcasing the cities I have visited.
- **Travel Posts**: Read my travel posts and experiences in different cities.
- **User Posts**: Create your own travel posts and share your adventures.
- **Messaging**: Leave messages or comments on posts.

## Installation
1. Clone the repository: `git clone https://github.com/your-username/travel-blog.git`
2. Navigate to the project directory: `cd travel-blog`
3. Install dependencies: `npm install`
4. Create a `.env` file and add the necessary environment variables (see below).
5. Start the application: `npm start`

## Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
SESSION_SECRET=your_session_secret
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MONGODB_URI=your_mongodb_uri
```

Replace the placeholder values with your actual credentials.

## Dependencies
- **@mapbox/mapbox-sdk**: Map integration for displaying visited cities.
- **cloudinary**: Cloud storage for uploading and managing images.
- **connect-flash**: Flash messages for user notifications.
- **connect-mongo**: MongoDB session store for Express.
- **dotenv**: Environment variable management.
- **ejs**: Templating engine for rendering views.
- **express**: Web application framework.
- **express-mongo-sanitize**: Sanitization middleware for MongoDB.
- **express-session**: Session middleware for Express.
- **helmet**: Security middleware for Express.
- **joi**: Data validation library.
- **method-override**: Middleware for HTTP method override.
- **mongoose**: MongoDB object modeling for Node.js.
- **multer**: Middleware for handling multipart/form-data.
- **multer-storage-cloudinary**: Multer storage engine for Cloudinary.
- **passport**: Authentication middleware for Node.js.
- **passport-local**: Local authentication strategy for Passport.
- **passport-local-mongoose**: Mongoose plugin for Passport-local.
- **sanitize-html**: HTML sanitizer to prevent XSS attacks.

## Usage
1. Visit `http://localhost:3000` in your browser.
2. Explore the interactive map and read travel posts.
3. Sign up or log in to leave messages or create your own travel posts.

## License
This project is licensed under the ISC License.

Feel free to contribute or report issues. Happy traveling! 🌍✈️
