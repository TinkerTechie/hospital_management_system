"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive search index
const searchIndex = [
    // Services
    { id: 'cardiology', title: 'Cardiology', category: 'Service', description: 'Heart care and cardiovascular services', url: '/services/cardiology', keywords: ['heart', 'cardiac', 'cardiovascular', 'ecg', 'angioplasty'] },
    { id: 'neurology', title: 'Neurology', category: 'Service', description: 'Brain and nervous system care', url: '/services/neurology', keywords: ['brain', 'nerve', 'neurological', 'headache', 'migraine', 'seizure'] },
    { id: 'orthopedics', title: 'Orthopedics', category: 'Service', description: 'Bone, joint, and muscle care', url: '/services/orthopedics', keywords: ['bone', 'joint', 'fracture', 'arthritis', 'spine', 'knee', 'hip'] },
    { id: 'pediatrics', title: 'Pediatrics', category: 'Service', description: 'Specialized care for children', url: '/services/pediatrics', keywords: ['child', 'children', 'baby', 'infant', 'vaccination', 'growth'] },
    { id: 'mental-health', title: 'Mental Health & Psychiatry', category: 'Service', description: 'Mental health and psychological care', url: '/services/mental-health', keywords: ['depression', 'anxiety', 'stress', 'therapy', 'counseling', 'psychiatry', 'psychology', 'mental', 'ptsd', 'bipolar'] },

    // Emergency Specialties
    { id: 'trauma', title: 'Trauma & Accident Care', category: 'Emergency', description: 'Emergency care for severe injuries', url: '/services/trauma', keywords: ['accident', 'injury', 'trauma', 'emergency', 'fracture', 'bleeding'] },
    { id: 'cardiac-emergency', title: 'Cardiac Emergency', category: 'Emergency', description: 'Heart attack and cardiac arrest care', url: '/services/cardiac-emergency', keywords: ['heart attack', 'cardiac arrest', 'chest pain', 'emergency'] },
    { id: 'stroke', title: 'Stroke Unit', category: 'Emergency', description: 'Rapid stroke intervention', url: '/services/stroke', keywords: ['stroke', 'brain attack', 'paralysis', 'fast'] },
    { id: 'pediatric-er', title: 'Pediatric Emergency', category: 'Emergency', description: 'Child emergency care', url: '/services/pediatric-er', keywords: ['child emergency', 'pediatric er', 'baby emergency'] },
    { id: 'burn-care', title: 'Burn Care', category: 'Emergency', description: 'Specialized burn treatment', url: '/services/burn-care', keywords: ['burn', 'fire', 'scald', 'thermal'] },
    { id: 'poisoning', title: 'Poisoning & Overdose', category: 'Emergency', description: 'Toxicology and poison treatment', url: '/services/poisoning', keywords: ['poison', 'overdose', 'toxic', 'antidote'] },
    { id: 'respiratory', title: 'Respiratory Distress', category: 'Emergency', description: 'Breathing emergency care', url: '/services/respiratory', keywords: ['breathing', 'asthma', 'copd', 'oxygen'] },
    { id: 'disaster', title: 'Disaster Management', category: 'Emergency', description: 'Mass casualty response', url: '/services/disaster', keywords: ['disaster', 'mass casualty', 'emergency preparedness'] },

    // First Aid
    { id: 'cpr', title: 'CPR', category: 'First Aid', description: 'Cardiopulmonary resuscitation', url: '/first-aid?q=cpr', keywords: ['heart attack', 'cardiac arrest', 'not breathing', 'unconscious', 'resuscitation'] },
    { id: 'burns-first-aid', title: 'Burns First Aid', category: 'First Aid', description: 'Immediate burn care', url: '/first-aid?q=burns', keywords: ['burn', 'fire', 'hot', 'scald'] },
    { id: 'choking', title: 'Choking', category: 'First Aid', description: 'Heimlich maneuver', url: '/first-aid?q=choking', keywords: ['choking', 'swallowed', 'heimlich', 'airway blocked'] },
    { id: 'bleeding', title: 'Severe Bleeding', category: 'First Aid', description: 'Stop heavy bleeding', url: '/first-aid?q=bleeding', keywords: ['bleeding', 'blood', 'cut', 'wound'] },
    { id: 'snakebite', title: 'Snake Bite', category: 'First Aid', description: 'Venomous bite treatment', url: '/first-aid?q=snakebite', keywords: ['snake', 'bite', 'venom', 'poison'] },
    { id: 'fracture-first-aid', title: 'Fractures', category: 'First Aid', description: 'Broken bone care', url: '/first-aid?q=fracture', keywords: ['fracture', 'broken bone', 'break'] },
    { id: 'seizure', title: 'Seizure', category: 'First Aid', description: 'Seizure response', url: '/first-aid?q=seizure', keywords: ['seizure', 'fit', 'convulsion', 'epilepsy'] },
    { id: 'heatstroke', title: 'Heat Stroke', category: 'First Aid', description: 'Heat illness treatment', url: '/first-aid?q=heatstroke', keywords: ['heat', 'hot', 'sun', 'dehydration'] },
    { id: 'shock', title: 'Shock', category: 'First Aid', description: 'Medical shock treatment', url: '/first-aid?q=shock', keywords: ['shock', 'pale', 'cold', 'weak'] },

    // Diagnostics
    { id: 'diagnostics', title: 'Diagnostic Services', category: 'Diagnostic', description: 'Lab tests and imaging', url: '/diagnostics', keywords: ['lab', 'test', 'blood test', 'xray', 'mri', 'ct scan', 'ultrasound'] },
    { id: 'track-report', title: 'Track Diagnostic Report', category: 'Diagnostic', description: 'Check test results', url: '/diagnostics/track', keywords: ['report', 'results', 'track', 'download'] },

    // General
    { id: 'emergency-main', title: 'Emergency Care', category: 'General', description: '24/7 emergency services', url: '/emergency', keywords: ['emergency', '1066', 'urgent', 'critical'] },
    { id: 'appointments', title: 'Book Appointment', category: 'General', description: 'Schedule a doctor visit', url: '/appointments', keywords: ['appointment', 'book', 'schedule', 'doctor visit'] },
    { id: 'services', title: 'All Services', category: 'General', description: 'Browse all medical services', url: '/services', keywords: ['services', 'departments', 'specialties'] },
];

export default function GlobalSearch({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter' && results.length > 0) {
                e.preventDefault();
                handleNavigate(results[selectedIndex].url);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    // Search function
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 1);

        const filtered = searchIndex.filter(item => {
            // Exact title match
            if (item.title.toLowerCase().includes(lowerQuery)) return true;

            // Description match
            if (item.description.toLowerCase().includes(lowerQuery)) return true;

            // Keyword match
            if (item.keywords && queryWords.some(word =>
                item.keywords.some(keyword => keyword.includes(word) || word.includes(keyword))
            )) return true;

            return false;
        });

        // Sort by relevance
        filtered.sort((a, b) => {
            const aExact = a.title.toLowerCase() === lowerQuery;
            const bExact = b.title.toLowerCase() === lowerQuery;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            return 0;
        });

        setResults(filtered.slice(0, 10)); // Top 10 results
        setSelectedIndex(0);
    }, [query]);

    const handleNavigate = (url) => {
        router.push(url);
        onClose();
        setQuery('');
    };

    // Group results by category
    const groupedResults = results.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Search Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search services, doctors, emergency care, first aid..."
                            className="flex-1 text-lg outline-none placeholder-gray-400"
                        />
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {query && results.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No results found for "{query}"
                            </div>
                        )}

                        {Object.entries(groupedResults).map(([category, items]) => (
                            <div key={category} className="p-2">
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {category}
                                </h3>
                                {items.map((item, index) => {
                                    const globalIndex = results.indexOf(item);
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigate(item.url)}
                                            className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left
                        ${globalIndex === selectedIndex ? 'bg-teal-50 border-l-4 border-teal-600' : 'hover:bg-gray-50'}
                      `}
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Enter</kbd>
                                Select
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Esc</kbd>
                                Close
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
