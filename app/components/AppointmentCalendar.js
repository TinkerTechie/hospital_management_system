"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AppointmentCalendar({ selectedDate, onDateSelect, disabledDates = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get first day of month and total days
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Navigate months
    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    // Check if date is disabled
    const isDateDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Disable past dates
        if (date < today) return true;

        // Check custom disabled dates
        return disabledDates.some(disabledDate =>
            disabledDate.toDateString() === date.toDateString()
        );
    };

    // Check if date is selected
    const isDateSelected = (date) => {
        return selectedDate && date.toDateString() === selectedDate.toDateString();
    };

    // Generate calendar days
    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const disabled = isDateDisabled(date);
        const selected = isDateSelected(date);

        calendarDays.push(
            <button
                key={day}
                onClick={() => !disabled && onDateSelect(date)}
                disabled={disabled}
                className={`
                    h-12 rounded-lg font-medium transition-all
                    ${disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-teal-50 cursor-pointer'
                    }
                    ${selected
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'text-gray-700'
                    }
                `}
            >
                {day}
            </button>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Previous month"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                <h3 className="text-lg font-bold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>

                <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Next month"
                >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
                {calendarDays}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-600 rounded"></div>
                    <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-gray-600">Unavailable</span>
                </div>
            </div>
        </div>
    );
}
