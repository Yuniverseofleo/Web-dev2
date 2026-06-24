import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
{
  console.log(`Backend server is running on port ${PORT}`);
});

//Endpoints
//http://localhost:3000/welcome

app.get("/welcome", (req, res) => 
{
  res.send("Welcome!", (req, res) =>
  { res.status(200).json({ message: "Welcome!" }) 
  });
});