import express from "express";
import { cleanupTimedOutUsers } from "./src/controllers/matchingController";
import matchingRoutes from "./src/routes/matchingRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/match", matchingRoutes);

app.listen(PORT, () => {
    console.log(`Matching service running on port ${PORT}`);
});

// Poll to clean up timed-out users in the queue
setInterval(cleanupTimedOutUsers, 5000);

export default app;
