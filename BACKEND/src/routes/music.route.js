import express from "express"
import musicController from "../controllers/music.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import multer from "multer"
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
const uploadFields = upload.fields([
  { name: 'music', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 } 
]);
router.post("/create-music",authMiddleware.verifyArtist, uploadFields, musicController.createMusic)
router.post("/create-album", authMiddleware.verifyArtist,musicController.createAlbum)
router.get('/',authMiddleware.verifyUser,musicController.displayMusic)
router.get('/albums',authMiddleware.verifyUser,musicController.displayAlbums)
router.get('/albums/:id',authMiddleware.verifyUser,musicController.displayAlbum)
export default router