/**
 * Growith Server - Express.js
 * Serves static files for Web Service deployment
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        name: 'Growith API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// API: Contact form
app.post('/api/contact', (req, res) => {
    const { email, name, message } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('New contact:', { email, name, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you! We will contact you soon.'
    });
});

// API: Newsletter subscription
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('New subscriber:', email);
    
    res.json({ 
        success: true, 
        message: 'Successfully subscribed!'
    });
});

// API: Get stats
app.get('/api/stats', (req, res) => {
    res.json({
        users: 2847,
        campaigns: 156,
        conversions: 3241,
        responseTime: '2.4m'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Growith server running on port ${PORT}`);
    console.log(`📍 Landing: http://localhost:${PORT}`);
    console.log(`📍 Admin: http://localhost:${PORT}/admin`);
    console.log(`📍 Test: http://localhost:${PORT}/test`);
});
