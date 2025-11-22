"use client";

import React from 'react';
import { Clock } from 'lucide-react';

export default function TimeSlotPicker({ selectedTime, onTimeSelect, availableSlots = [] }) {
    // Default time slots if none provided
    const defaultSlots = {
        morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
        afternoon: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30'],
        evening: ['04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00']
    };

    const slots = availableSlots.length > 0 ? availableSlots : defaultSlots;

    const TimeSlotButton = ({ time, period }) => {
        const isSelected = selectedTime === time;
        const isBooked = false; // TODO: Check against booked slots from API

        return (
            <button
                onClick={() => !isBooked && onTimeSelect(time)}
                disabled={isBooked}
                className={`
                    px-4 py-3 rounded-lg font-medium transition-all text-sm
                    ${isBooked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : isSelected
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-500 hover:bg-teal-50'
                    }
                `}
            >
                {time} {period}
            </button>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-teal-600" />
                <h3 className="text-lg font-bold text-gray-900">Select Time Slot</h3>
            </div>

            {/* Morning Slots */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Morning</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {(slots.morning || defaultSlots.morning).map(time => (
                        <TimeSlotButton key={time} time={time} period="AM" />
                    ))}
                </div>
            </div>

            {/* Afternoon Slots */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Afternoon</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {(slots.afternoon || defaultSlots.afternoon).map(time => (
                        <TimeSlotButton key={time} time={time} period="PM" />
                    ))}
                </div>
            </div>

            {/* Evening Slots */}
            <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Evening</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {(slots.evening || defaultSlots.evening).map(time => (
                        <TimeSlotButton key={time} time={time} period="PM" />
                    ))}
                </div>
            </div>

            {/* Selected time display */}
            {selectedTime && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-bold text-teal-600">{selectedTime}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
