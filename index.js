import express from "express";
import faceRoutes from "./routes/faceroutes.js";
import { loadFaceModels } from "./models/facemodel.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api", faceRoutes);

// Start the server and load models
(async () => {
  try {
    console.log("Initializing application...");
    await loadFaceModels();
    console.log("Models loaded. Starting server...");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
})();
