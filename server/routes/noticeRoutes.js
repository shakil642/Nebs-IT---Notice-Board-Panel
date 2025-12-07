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
        publishDate,
        attachments // Extract attachments
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
            publishDate,
            attachments: attachments || [] // Save attachments
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
        const pageSize = Number(req.query.limit) || 6;
        const page = Number(req.query.page) || 1;

        // Build Query
        const query = {};
        console.log('Incoming Filter Request Params:', req.query); // Debug Log

        // Search (Title or Employee)
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { employeeName: { $regex: req.query.search, $options: 'i' } },
                { employeeId: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Filter by Department
        if (req.query.department && req.query.department.trim() !== 'Departments or individuals') {
            query.department = req.query.department.trim();
        }

        // Filter by Status
        if (req.query.status && req.query.status !== 'Status') {
            query.status = req.query.status.toLowerCase();
        }

        // Filter by Date
        if (req.query.date) {
            const date = new Date(req.query.date);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            query.publishDate = {
                $gte: date,
                $lt: nextDay
            };
        }

        const count = await Notice.countDocuments(query);
        console.log('Final MongoDB Query:', JSON.stringify(query, null, 2)); // Debug Query
        const notices = await Notice.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ notices, page, pages: Math.ceil(count / pageSize), debugQuery: query });
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
