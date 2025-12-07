const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [
            'General',
            'Warning / Disciplinary',
            'Performance Improvement',
            'Appreciation / Recognition',
            'Attendance / Leave Issue',
            'Payroll / Compensation',
            'Contract / Role Update',
            'Advisory / Personal Reminder'
        ],
    },
    department: {
        type: [String], // Array of Strings
        default: ['All Department'],
    },
    // New fields for Individual notices
    employeeId: { type: [String] },
    employeeName: { type: String },
    position: { type: String },

    publishDate: { type: Date },
    attachments: [{ type: String }], // Array of file names or URLs

    status: {
        type: String,
        default: 'draft',
        enum: ['published', 'draft', 'unpublished'],
    },
}, {
    timestamps: true,
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
