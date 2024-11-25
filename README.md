# **Dynamic Age, Gender, and Expression Detection Web App**

This is a web application that detects the **age**, **gender**, and **expressions** of individuals in an image using **TensorFlow.js** and **FaceAPI**.

---

## **How It Works**
1. Captures the image through webcan of your browser.
2. The image is converted to a **Base64 string** and sent to the backend.
3. The backend:
   - Preprocesses the image using **TensorFlow.js**.
   - Uses **FaceAPI** models to analyze age, gender, and facial expressions.
   - Sends the analysis results back to the frontend.
4. The frontend displays the analysis results in an easy-to-read format.

---

## **Project Structure**
```plaintext
project/
├── controllers/           # Handles business logic
│   └── facecontroller.js  # Processes face analysis requests
├── models/                # Loads and manages FaceAPI models
│   └── facemodel.js       # FaceAPI model loader
├── public/                # Static assets
│   ├── index.html         # Frontend HTML
│   ├── scripts.js         # Frontend JavaScript
│   └── styles.css         # Frontend CSS
├── routes/                # Defines application routes
│   └── faceroutes.js      # Route for face analysis
├── index.js               # Main entry point
├── README.md              # Project documentation
└── package.json           # Project dependencies
