"use client";
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

export default function MultiSelect({ label, options, value = [], onChange, placeholder = "Select..." }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (optionValue) => {
        let newValue;
        if (value.includes(optionValue)) {
            newValue = value.filter(v => v !== optionValue);
        } else {
            newValue = [...value, optionValue];
        }
        onChange(newValue);
    };

    const removeValue = (e, val) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== val));
    };

    return (
        <div className={`relative ${isOpen ? 'z-50' : ''}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="text-red-500 mr-1">*</span>{label}
                </label>
            )}

            <div
                className={`min-h-[48px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${isOpen ? 'border-blue-500 ring-1 ring-blue-500 bg-white' : 'hover:bg-gray-100'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-2">
                    {value.length === 0 && <span className="text-gray-400 select-none py-1">{placeholder}</span>}
                    {value.map((val) => {
                        const option = options.find(o => o.value === val);
                        return (
                            <span key={val} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                {option ? option.label : val}
                                <button
                                    type="button"
                                    onClick={(e) => removeValue(e, val)}
                                    className="ml-1.5 focus:outline-none hover:text-blue-900"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        );
                    })}
                </div>
                <div className="pl-2">
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in text-base focus:outline-none sm:text-sm">
                    {options.map((option) => {
                        const isSelected = value.includes(option.value);
                        return (
                            <div
                                key={option.value}
                                className={`cursor-pointer select-none relative py-2.5 pl-3 pr-9 ${isSelected ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-900 hover:bg-gray-50'}`}
                                onClick={() => toggleOption(option.value)}
                            >
                                <span className="block truncate">{option.label}</span>
                                {isSelected && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                        <Check className="w-4 h-4" />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                    {options.length === 0 && (
                        <div className="py-2 px-3 text-gray-500 italic">No options available</div>
                    )}
                </div>
            )}
        </div>
    );
}
