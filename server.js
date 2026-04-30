/**
 * Growith Local Development Server
 * Simple Express server for local development with API endpoints
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        name: 'Growith API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('New contact:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you! We will contact you soon.',
        data: { name, email }
    });
});

// Newsletter subscription
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('New subscriber:', email);
    
    res.json({ 
        success: true, 
        message: 'Successfully subscribed to our newsletter!' 
    });
});

// Get stats (mock data)
app.get('/api/stats', (req, res) => {
    res.json({
        users: 2847,
        campaigns: 156,
        conversions: 3241,
        responseTime: '2.4m'
    });
});

// Get campaigns (mock data)
app.get('/api/campaigns', (req, res) => {
    res.json([
        { id: 1, name: 'Summer Sale 2025', status: 'active', users: 1247, conversion: '23.5%', revenue: 45230 },
        { id: 2, name: 'Product Launch', status: 'active', users: 892, conversion: '18.7%', revenue: 32100 },
        { id: 3, name: 'Holiday Special', status: 'paused', users: 634, conversion: '15.2%', revenue: 21450 }
    ]);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', '='.repeat(50));
    console.log('\x1b[36m%s\x1b[0m', '  🚀 Growith Server Running!');
    console.log('\x1b[32m%s\x1b[0m', '='.repeat(50));
    console.log('');
    console.log('  📍 Local:  \x1b[34mhttp://localhost:' + PORT + '\x1b[0m');
    console.log('  📍 Landing: \x1b[34mhttp://localhost:' + PORT + '/index.html\x1b[0m');
    console.log('  📍 Admin:   \x1b[34mhttp://localhost:' + PORT + '/admin.html\x1b[0m');
    console.log('  📍 API:     \x1b[34mhttp://localhost:' + PORT + '/api/health\x1b[0m');
    console.log('');
    console.log('\x1b[32m%s\x1b[0m', '='.repeat(50));
});
