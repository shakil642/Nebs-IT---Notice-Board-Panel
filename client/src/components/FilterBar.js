"use client";
import { Filter, Calendar, Users } from 'lucide-react';

export default function FilterBar() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-end gap-4 py-4">

            <div className="text-sm font-bold text-gray-700 whitespace-nowrap mr-2">
                Filter by:
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3 w-full lg:w-auto">
                {/* Department */}
                <div className="relative w-full sm:w-[220px]">
                    <select className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
                        <option>Departments or individuals</option>
                        <option>Individual</option>
                        <option>All Department</option>
                        <option>Finance</option>
                        <option>HR</option>
                        <option>Sales Team</option>
                        <option>IT</option>
                        <option>Admin</option>
                        <option>Web Team</option>
                        <option>Database Team</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Employee ID */}
                <div className="relative w-full sm:w-[200px]">
                    <input
                        type="text"
                        placeholder="Employee Id or Name"
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Status */}
                <div className="relative w-full sm:w-[150px]">
                    <select className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
                        <option>Status</option>
                        <option>Published</option>
                        <option>Unpublished</option>
                        <option>Draft</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Published On */}
                <div className="relative w-full sm:w-[180px]">
                    <input
                        type="text"
                        placeholder="Published on"
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-500 cursor-pointer"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Reset Button */}
                <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

// Add ChevronDown helper icon since it wasn't imported
function ChevronDown(props) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    )
}
