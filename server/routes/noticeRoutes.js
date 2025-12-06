const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// @route   GET /api/notices/stats
// @desc    Get notice statistics
router.get('/stats', async (req, res) => {
    try {
        const active = await Notice.countDocuments({ status: 'published' });
        const draft = await Notice.countDocuments({ status: 'draft' });
        res.json({ active, draft });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/notices
// @desc    Create a notice
router.post('/', async (req, res) => {
    const {
        title,
        description,
        type,
        status,
        department,
        employeeId,
        employeeName,
        position,
        publishDate
    } = req.body;

    if (!title || !description || !type) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        const notice = new Notice({
            title,
            description,
            type,
            status: status || 'draft',
            department: department || 'All Department',
            employeeId,
            employeeName,
            position,
            publishDate
        });

        const createdNotice = await notice.save();
        res.status(201).json(createdNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/notices
// @desc    Get all notices
router.get('/', async (req, res) => {
    try {
        // Simple pagination
        const pageSize = 10;
        const page = Number(req.query.page) || 1;

        const count = await Notice.countDocuments({});
        const notices = await Notice.find({})
            .sort({ createdAt: -1 }) // Newest first
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ notices, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PATCH /api/notices/:id
// @desc    Update notice status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (updatedNotice) {
            res.json(updatedNotice);
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;
