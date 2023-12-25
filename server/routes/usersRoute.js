import express from "Express";
import {
    registerController,
    loginController,
    setAvatarController,
    getAllUsers,
} from "../controllers/usersController.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/setAvatar", setAvatarController);
router.get(`/allusers/:id`, getAllUsers);
export default router;
