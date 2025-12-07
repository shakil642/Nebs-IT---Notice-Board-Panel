"use client";
import { Calendar } from 'lucide-react';

export default function FilterBar({ filters, onFilterChange, onReset }) {
    // Debug Log
    console.log('FilterBar Rendered. Filters:', filters, 'onFilterChange:', !!onFilterChange);

    const currentFilters = filters || {};

    const handleChange = (key, value) => {
        console.log(`Filter Change: ${key} -> ${value}`);
        if (onFilterChange) {
            onFilterChange({ ...currentFilters, [key]: value });
        } else {
            console.error('onFilterChange prop is missing!');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-end gap-3 py-2">

            <div className="text-sm font-bold text-gray-700 whitespace-nowrap mr-2">
                Filter by:
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3 w-full lg:w-auto">
                {/* Department */}
                <div className="relative w-full sm:w-[220px]">
                    <select
                        value={currentFilters.department || 'Departments or individuals'}
                        onChange={(e) => handleChange('department', e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="Departments or individuals">Departments or individuals</option>
                        <option value="Individual">Individual</option>
                        <option value="All Department">All Department</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Sales Team">Sales Team</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                        <option value="Web Team">Web Team</option>
                        <option value="Database Team">Database Team</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Employee ID / Search */}
                <div className="relative w-full sm:w-[200px]">
                    <input
                        type="text"
                        placeholder="Employee Id or Name"
                        value={currentFilters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Status */}
                <div className="relative w-full sm:w-[150px]">
                    <select
                        value={currentFilters.status || 'Status'}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="Status">Status</option>
                        <option value="Published">Published</option>
                        <option value="Unpublished">Unpublished</option>
                        <option value="Draft">Draft</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Published On */}
                <div className="relative w-full sm:w-[180px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Published on"
                            value={currentFilters.date || ''}
                            onChange={(e) => handleChange('date', e.target.value)}
                            onFocus={(e) => {
                                e.target.type = 'date';
                                try {
                                    e.target.showPicker();
                                } catch (err) { }
                            }}
                            onClick={(e) => {
                                if (e.target.type === 'date') {
                                    try {
                                        e.target.showPicker();
                                    } catch (err) { }
                                }
                            }}
                            onBlur={(e) => {
                                if (!e.target.value) e.target.type = 'text';
                            }}
                            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <Calendar className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    onClick={() => {
                        console.log('Reset triggered');
                        onReset && onReset();
                    }}
                    className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

// Manual SVG to ensure no import errors
function ChevronDown(props) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    )
}
