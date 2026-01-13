export default function handler(req, res) {
  // Get the current time
  const currentTime = new Date().toLocaleString();

  // Send it back as JSON
  res.status(200).json({ 
    message: "Hello from Vercel Serverless!", 
    time: currentTime 
  });
}
