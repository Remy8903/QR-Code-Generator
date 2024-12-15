import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public")); // Serve static files
app.use(bodyParser.json());

// Route to generate QR code
app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const qrSvg = qr.imageSync(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.send(qrSvg);

    // Save the URL to a text file
    fs.appendFileSync("URL.txt", `${url}\n`);
  } catch (error) {
    res.status(500).send("Failed to generate QR code");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
