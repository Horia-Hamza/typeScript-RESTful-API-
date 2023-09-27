# typeScript-RESTful-API-:
Building a Secure RESTful API with Express.js, Mongoose, TypeScript, and Multi-Environment Support

# Description:
building a backend API for an e-commerce platform. including Express.js,
Mongoose (for MongoDB), TypeScript, and the project support multiple environments (develop and production).

# Authentication API:
-  endpoints for user registration and login.
-  define user schema role (user - vendor - admin ).
-  the default role for user schema is (user).
-  only (vendor and  admin ) can create, update and delete products.
-  authentication middleware to make sure user is signed in.
-  using token and bearer key with jwt.
-  validation middleware for every input and handle errors.
-  Implement secure password storage with bcryptjs.
-  create asyncHandler for catching error and globalError for show error details depending on the current mood (devlopment or production).
-  
 # Product CRUD Operations:
-  Develop RESTful APIs for managing products (Create, Read, Update, Delete).
-  validation middleware for every input and handle errors.
-  create asyncHandler for catching error and globalError for show error details depending on the current mood (devlopment or production).
-  Ensure data consistency and integrity in the MongoDB database.
-  
 # Multi-Environment Setup:
- the project seamlessly switch between development and production environments.
- environment-specific configurations for databases and API keys.
    
## Prerequisites:
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed.
- MongoDB installed and running.

## Installation:
- to install the project clone the repository:
   git clone https://github.com/yourusername/your-repo.git](https://github.com/Horia-Hamza/typeScript-RESTful-API-
   
## Install dependencies:
npm install

## run project:
npm run dev for development
npm start for start
npm run build for start watch mood

## Configurations:
- make sure to create yor .env file depending on the .env.example file attached with the project

  ## Endpoints:
 the API endpoints and their usage here:

/api/v1/auth/signup - for sign up - post method
/api/v1/auth/signin - for sign in   post method
/api/v1/product/ - for  Create product - post method
/api/v1/product/<product-id> - for  update product - put method
/api/v1/product/<product-id> - for  delete product - delete method
/api/v1/product/<product-id> - for  get product by id - get method
/api/v1/product/ - for  get all products - get method



   
