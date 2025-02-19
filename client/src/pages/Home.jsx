import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">Welcome to My Authentication App</h1>
        <p className="text-lg text-gray-600 mt-4">Learn about MERN Authentication and its key aspects</p>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">What is MERN Auth?</h2>
          <p className="text-gray-700 mt-4">
            "MERN Auth" refers to implementing user authentication within a web application built using the MERN stack, which stands for MongoDB (database), Express.js (backend framework), React (frontend library), and Node.js (runtime environment). Essentially, it's the process of creating a secure login and registration system where users can verify their identity to access specific features or protected areas of the application.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">Key Aspects of MERN Auth:</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li><strong>User Model</strong>: A data structure in MongoDB that stores user information like username, email, password (hashed for security), and potentially other details.</li>
            <li><strong>JWT (JSON Web Token)</strong>: A widely used method for authentication in MERN applications. When a user logs in, the backend generates a JWT token which is then sent to the frontend and stored locally. This token can be verified by the server on subsequent requests to identify the user.</li>
            <li><strong>Authentication Routes</strong>:
              <ul className="list-decimal list-inside ml-4">
                <li>Signup: An API endpoint to create a new user account in the database.</li>
                <li>Login: An API endpoint to validate user credentials and generate a JWT token upon successful login.</li>
                <li>Logout: An API endpoint to invalidate the JWT token on the client side, effectively logging the user out.</li>
              </ul>
            </li>
            <li><strong>Middleware</strong>: Functions on the backend that intercept incoming requests and verify if the JWT token is valid before allowing access to protected routes.</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">How it Works:</h2>
          <ol className="list-decimal list-inside mt-4 text-gray-700">
            <li><strong>User Registration</strong>:
              <ul className="list-disc list-inside ml-4">
                <li>User enters their details on the signup form on the frontend.</li>
                <li>Frontend sends a POST request to the backend signup API endpoint.</li>
                <li>Backend validates the data, hashes the password, creates a new user document in MongoDB, and sends a response back to the frontend.</li>
              </ul>
            </li>
            <li><strong>User Login</strong>:
              <ul className="list-disc list-inside ml-4">
                <li>User enters their credentials on the login form.</li>
                <li>Frontend sends a POST request to the backend login API endpoint with username and password.</li>
                <li>Backend verifies the credentials against the database, generates a JWT token if successful, and sends it back to the frontend.</li>
              </ul>
            </li>
            <li><strong>Accessing Protected Routes</strong>:
              <ul className="list-disc list-inside ml-4">
                <li>Frontend sends the JWT token in the request header when accessing protected routes.</li>
                <li>Backend middleware verifies the JWT token, if valid, the user is granted access to the protected resource.</li>
              </ul>
            </li>
          </ol>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">Important Security Considerations:</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li><strong>Password Hashing</strong>: Always use a strong hashing algorithm like bcrypt to store user passwords securely.</li>
            <li><strong>Token Expiration</strong>: Set a short expiration time for JWT tokens to prevent long-term access even if a token is compromised.</li>
            <li><strong>HTTP Only Cookies</strong>: When storing JWTs in cookies, set the HttpOnly flag to prevent client-side JavaScript from accessing them.</li>
            <li><strong>Rate Limiting</strong>: Implement measures to protect against brute-force login attempts.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Benefits of Using MERN for Authentication:</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li><strong>JavaScript Ecosystem</strong>: Consistent language (JavaScript) across the entire stack simplifies development.</li>
            <li><strong>Flexibility</strong>: MERN allows for customization to fit specific authentication needs.</li>
            <li><strong>Scalability</strong>: Can handle large user bases with proper database design and optimization.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Home;
