import jwt from "jsonwebtoken"
import uploadFile from "../services/storage.service.js"
import musicModel from "../models/music.model.js"
import albumModel from "../models/album.model.js"
const createMusic = async (req, res) => {
    const { title } = req.body
    const musicFile =req.files['music'][0]
    const thumbnailFile =req.files['thumbnail'][0]
    const musicResponse = await uploadFile(musicFile.buffer,"music")
    const thumbnailResponse = await uploadFile(thumbnailFile.buffer,"thumbnail")
    const music = await musicModel.create({
        uri: musicResponse.url,
        thumbnail:thumbnailResponse.url,
        title,
        artist: req.user.id
    })
    return res.status(201).json({
        message: "Music Created Successfully",
        music
    })

}

const createAlbum = async (req, res) => {
    const { title, musics } = req.body
    const album = await albumModel.create({
        title,
        musics,
        artist: req.user.id
    })
    return res.status(201).json({
        message: "Album Created Successfully",
        album
    })
}

const displayMusic = async (req, res) => {
    const songs = await musicModel.find().populate("artist", "username email")
    return res.status(200).json({
        message: "Songs Fetched Successfully",
        songs
    })
}

const displayAlbums = async (req, res) => {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    return res.status(200).json({
        message: "Albums Fetched Successfully",
        albums
    })
}

const displayAlbum = async (req, res) => {
    const id = req.params.id
    const album = await albumModel.findById(id).populate("artist","username email").populate("musics","title uri thumbnail")
    return res.status(200).json({
        message: "Album Fetched Successfully",
        album
    })
}

export default { createMusic, createAlbum, displayMusic, displayAlbums, displayAlbum }