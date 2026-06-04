import ImageKit from '@imagekit/nodejs';
import 'dotenv/config';
const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});
const uploadFile = async (file,value) => {
    if(value=="music"){
        const response = await client.files.upload({
            file:file.toString("base64"),
            fileName: 'music_'+Date.now(),
            folder:"spotify-project/music"
        });
        return response
    }else{
        const response = await client.files.upload({
            file:file.toString("base64"),
            fileName: 'thumbnail_'+Date.now(),
            folder:"spotify-project/thumbnail"
        });
        return response
    }
}

export default uploadFile