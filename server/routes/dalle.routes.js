import express, { response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import multer from 'multer';


dotenv.config();
const router = express.Router();
const upload = multer({dest:'uploads/'});

const CLIPDROP_API_KEY=process.env.CLIPDROP_API_KEY;

router.route('/').post(upload.single('image'), async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageFile = req.file; // Access uploaded file

    if (!imageFile) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Create a form-data object to send the image file
    const form = new FormData();
    form.append('image_file', fs.createReadStream(imageFile.path));

    // ClipDrop API Request (Example: Background Removal)
    const response = await axios.post('https://clipdrop-api.co/remove-background/v1', form, {
      headers: {
        'x-api-key': CLIPDROP_API_KEY,
        ...form.getHeaders(),
      },
    });

    // Get the processed image from ClipDrop
    const processedImage = response.data;

    // Send the processed image back to the client
    res.status(200).json({ image: processedImage });

    // Clean up the uploaded file
    fs.unlinkSync(imageFile.path);

  } catch (error) {
    console.error(error);

    // Handle API errors
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

export default router;