import express from "Express";
import { addMessage, getAllMessage } from "../controllers/messageController.js";
const router = express.Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessage);

export default router;
