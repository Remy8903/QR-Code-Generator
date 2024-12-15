const form = document.getElementById("qrForm");
const urlInput = document.getElementById("urlInput");
const qrImage = document.getElementById("qrImage");
const downloadLink = document.getElementById("downloadLink");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = urlInput.value;

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    // Display QR code
    qrImage.src = imageUrl;
    qrImage.style.display = "block";

    // Set up download link
    downloadLink.href = imageUrl;
    downloadLink.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});
