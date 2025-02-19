import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">About Our Application</h1>
        <p className="text-lg text-gray-600 mt-4">Discover the details and features of our MERN Authentication App</p>
      </header>
      
      <main className="max-w-4xl mx-auto">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">Key Features:</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li><strong>User Registration</strong>: Create a new user account with secure password hashing and email verification.</li>
            <li><strong>User Login</strong>: Authenticate users with JSON Web Tokens (JWT) for secure session management.</li>
            <li><strong>Protected Routes</strong>: Ensure that only authenticated users can access certain parts of the application.</li>
            <li><strong>Password Recovery</strong>: Implement password reset functionality for users who forget their credentials.</li>
            <li><strong>Session Management</strong>: Manage user sessions with short-lived JWT tokens and refresh tokens for enhanced security.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">Why Choose MERN for Authentication?</h2>
          <p className="text-gray-700 mt-4">
            The MERN stack provides a seamless and efficient way to handle user authentication, leveraging the power of JavaScript across the entire stack. With MongoDB for data storage, Express.js for backend routing, React for frontend development, and Node.js for server-side execution, MERN offers flexibility, scalability, and a consistent development experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800">About the Team</h2>
          <p className="text-gray-700 mt-4">
            Our team consists of experienced developers, designers, and security experts dedicated to building secure and user-friendly authentication systems. We are passionate about creating solutions that empower developers and enhance user experiences.
          </p>
          <p className="text-gray-700 mt-2">
            Our mission is to provide reliable and scalable authentication solutions that meet the needs of modern web applications. Whether you are a developer looking to integrate authentication into your project or a user seeking a secure login experience, our app is designed to deliver.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
