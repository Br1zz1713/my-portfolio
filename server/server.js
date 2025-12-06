// server/server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


// Load environment variables from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // The server will run on port 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies


// Test route to ensure server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
    const {name, email, message } = req.body;
    console.log('Received date:', req.body); //  !!!!!!!

    // 1.Create a transporter object for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email address from .env
            pass: process.env.EMAIL_PASS  // Your email password from .env
        }
    }); 

    // 2. Set up email data
    const mailOptions = {
        from: email, // Sender address
        to: process.env.EMAIL_USER, // Receiver address (your email)
        subject: `New Contact Form Submission from ${name}`, // Subject line
        text: `Sender: ${name} (${email})\n\nMessage:\n${message}` // Email body
    };  

    // 3. Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Message from ${name} sent successfully.`);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Note: The front-end form submission code is not included here as it is assumed to be in a separate file (e.g., script.js).