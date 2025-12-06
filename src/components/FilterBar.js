"use client";

import { Calendar, RotateCcw } from 'lucide-react';

export default function FilterBar() {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 ml-auto">
                <span className="text-sm font-semibold text-gray-600 mr-2">Filter by:</span>

                {/* Department Filter */}
                <select className="bg-white border border-gray-200 text-gray-500 text-sm rounded-md px-3 py-2 outline-none focus:border-orange-500">
                    <option>Departments or individuals</option>
                    <option>All Department</option>
                    <option>Sales Team</option>
                    <option>Finance</option>
                </select>

                {/* Employee ID Filter */}
                <input
                    type="text"
                    placeholder="Employee Id or Name"
                    className="bg-white border border-gray-200 text-gray-500 text-sm rounded-md px-3 py-2 outline-none focus:border-orange-500 w-48"
                />

                {/* Status Filter */}
                <select className="bg-white border border-gray-200 text-gray-500 text-sm rounded-md px-3 py-2 outline-none focus:border-orange-500">
                    <option>Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Unpublished</option>
                </select>

                {/* Date Filter */}
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 text-sm rounded-md px-3 py-2 hover:bg-gray-50">
                    <span>Published on</span>
                    <Calendar className="w-4 h-4" />
                </button>
            </div>

            {/* Reset Button */}
            <button className="flex items-center gap-2 text-blue-500 text-sm font-medium hover:text-blue-600 ml-4">
                <span className="text-xs">Reset Filters</span>
            </button>
        </div>
    );
}
