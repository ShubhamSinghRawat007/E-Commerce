# E-Commerce Backend

This project is a complete e-commerce solution comprising a **frontend**, **backend**, and **admin panel**. The system is designed to offer seamless order management, user authentication, and payment integrations.

* * *

## Overview

### **Frontend**

-   Built using modern JavaScript frameworks like **React.js** for a dynamic and responsive user interface.
-   Features:
    -   User authentication for login and signup.
    -   Product browsing and searching.
    -   Adding items to the cart and managing cart data.
    -   Placing orders with multiple payment options.
    -   Viewing order history.
-   Technologies:
    -   React.js,  Material-UI (for responsive design).

### **Backend**

-   A robust and scalable backend API, built with **Node.js** and **Express.js**.
-   Responsible for:
    -   Managing user authentication and authorization using **JWT**.
    -   Handling product and order data through **MongoDB**.
    -   Integrating with **Stripe** and **Razorpay** for secure payment processing.
    -   Providing API endpoints for frontend and admin panel.
-   Technologies:
    -   Node.js, Express.js, MongoDB (Mongoose), JWT, Razorpay, Stripe.

### **Admin Panel**

-   A separate interface for managing the e-commerce application, built using **React.js**.
-   Features:
    -   Dashboard to view all orders, user data, and sales reports.
    -   Ability to update order statuses (e.g., Pending, Shipped, Delivered).
    -   Manage products: Add, edit, or delete items in the inventory.
    -   View and handle customer inquiries.
-   Technologies:
    -   React.js, Redux, Ant Design (for UI components).


### **FastAPI and Matplotlib Integration**

- FastAPI is used to build additional API endpoints for analytics and data visualization.

- Matplotlib is leveraged to generate dynamic graphs and insights based on sales data.

- Features:

    - Fetch sales data and generate visual reports.

    - Provide RESTful APIs for retrieving analytics in JSON or image format.

    - Easily integrate with the frontend to display graphs and statistics.

- Technologies:

    - FastAPI, Matplotlib