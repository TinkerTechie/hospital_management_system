"use client";

import React, { useState, useMemo } from "react";
import NurseDashboardSidebar from "../../../../components/nurse/NurseDashboardSidebar";
import {
    Search, Pill, AlertTriangle, Info, ChevronDown, ChevronUp,
    Filter, X, ExternalLink, Clock, Droplet, Heart, Shield
} from "lucide-react";

// Comprehensive medication database
const MEDICATIONS = [
    {
        id: 1,
        name: "Paracetamol (Acetaminophen)",
        genericName: "Acetaminophen",
        type: "Analgesic/Antipyretic",
        dose: "500-1000mg",
        frequency: "Q4-6H PRN",
        maxDose: "4000mg/24h",
        route: "PO/IV",
        indication: "Pain relief, fever reduction",
        contraindications: "Severe hepatic impairment, alcohol abuse",
        sideEffects: "Rare at therapeutic doses; hepatotoxicity with overdose",
        warnings: "Monitor liver function in chronic use. Risk of overdose with combination products.",
        interactions: "Warfarin (increased INR), alcohol (hepatotoxicity)",
        nursingConsiderations: "Assess pain level before and after. Monitor for signs of hepatotoxicity.",
        category: "pain"
    },
    {
        id: 2,
        name: "Amoxicillin",
        genericName: "Amoxicillin",
        type: "Antibiotic (Penicillin)",
        dose: "250-500mg",
        frequency: "TID",
        maxDose: "1500mg/24h",
        route: "PO",
        indication: "Bacterial infections (respiratory, ENT, urinary)",
        contraindications: "Penicillin allergy, infectious mononucleosis",
        sideEffects: "Diarrhea, nausea, rash, allergic reactions",
        warnings: "HIGH ALERT: Check for penicillin allergy before administration. Anaphylaxis risk.",
        interactions: "Oral contraceptives (reduced efficacy), methotrexate",
        nursingConsiderations: "Take with food to reduce GI upset. Complete full course. Monitor for allergic reactions.",
        category: "antibiotic"
    },
    {
        id: 3,
        name: "Metformin",
        genericName: "Metformin HCl",
        type: "Antidiabetic (Biguanide)",
        dose: "500-1000mg",
        frequency: "BID-TID",
        maxDose: "2550mg/24h",
        route: "PO",
        indication: "Type 2 Diabetes Mellitus",
        contraindications: "Renal impairment (eGFR <30), metabolic acidosis, severe hepatic disease",
        sideEffects: "GI upset, diarrhea, metallic taste, vitamin B12 deficiency",
        warnings: "Risk of lactic acidosis. Hold before contrast imaging. Monitor renal function.",
        interactions: "Alcohol (lactic acidosis), contrast dye, cimetidine",
        nursingConsiderations: "Take with meals. Monitor blood glucose and HbA1c. Assess for signs of lactic acidosis.",
        category: "diabetes"
    },
    {
        id: 4,
        name: "Lisinopril",
        genericName: "Lisinopril",
        type: "Antihypertensive (ACE Inhibitor)",
        dose: "5-40mg",
        frequency: "QD",
        maxDose: "80mg/24h",
        route: "PO",
        indication: "Hypertension, heart failure, post-MI",
        contraindications: "Pregnancy, angioedema history, bilateral renal artery stenosis",
        sideEffects: "Dry cough, dizziness, hyperkalemia, angioedema (rare)",
        warnings: "BLACK BOX: Fetal toxicity - contraindicated in pregnancy. Monitor potassium and renal function.",
        interactions: "NSAIDs (reduced efficacy), potassium supplements, diuretics",
        nursingConsiderations: "Monitor BP, K+, and renal function. Educate about persistent cough. Assess for angioedema.",
        category: "cardiovascular"
    },
    {
        id: 5,
        name: "Omeprazole",
        genericName: "Omeprazole",
        type: "Proton Pump Inhibitor (PPI)",
        dose: "20-40mg",
        frequency: "QD AC",
        maxDose: "80mg/24h",
        route: "PO/IV",
        indication: "GERD, peptic ulcer, Zollinger-Ellison syndrome",
        contraindications: "Hypersensitivity to PPIs",
        sideEffects: "Headache, diarrhea, abdominal pain, increased infection risk",
        warnings: "Long-term use: increased fracture risk, C. diff infection, hypomagnesemia",
        interactions: "Clopidogrel (reduced efficacy), warfarin, methotrexate",
        nursingConsiderations: "Take 30-60 min before meals. Swallow whole (do not crush). Monitor magnesium with long-term use.",
        category: "gastrointestinal"
    },
    {
        id: 6,
        name: "Morphine Sulfate",
        genericName: "Morphine",
        type: "Opioid Analgesic",
        dose: "2.5-15mg",
        frequency: "Q4H PRN",
        maxDose: "Varies by patient",
        route: "PO/IV/IM/SC",
        indication: "Moderate to severe pain",
        contraindications: "Respiratory depression, acute asthma, paralytic ileus",
        sideEffects: "Respiratory depression, constipation, nausea, sedation, hypotension",
        warnings: "CONTROLLED SUBSTANCE (Schedule II). Risk of addiction, abuse, overdose. Keep naloxone available.",
        interactions: "CNS depressants (alcohol, benzodiazepines), MAOIs",
        nursingConsiderations: "Monitor respiratory rate, pain level, sedation. Implement fall precautions. Bowel regimen required.",
        category: "pain"
    },
    {
        id: 7,
        name: "Warfarin",
        genericName: "Warfarin Sodium",
        type: "Anticoagulant",
        dose: "2-10mg",
        frequency: "QD",
        maxDose: "Individualized",
        route: "PO/IV",
        indication: "DVT/PE prevention, atrial fibrillation, mechanical heart valves",
        contraindications: "Active bleeding, pregnancy, severe hepatic disease",
        sideEffects: "Bleeding, bruising, hematoma",
        warnings: "BLACK BOX: Bleeding risk. Requires regular INR monitoring. Narrow therapeutic index.",
        interactions: "Multiple drug interactions (antibiotics, NSAIDs, vitamin K, cranberry)",
        nursingConsiderations: "Monitor INR regularly. Assess for bleeding. Educate on diet consistency (vitamin K). Fall risk.",
        category: "cardiovascular"
    },
    {
        id: 8,
        name: "Furosemide (Lasix)",
        genericName: "Furosemide",
        type: "Loop Diuretic",
        dose: "20-80mg",
        frequency: "QD-BID",
        maxDose: "600mg/24h",
        route: "PO/IV",
        indication: "Edema, heart failure, hypertension",
        contraindications: "Anuria, severe electrolyte depletion",
        sideEffects: "Hypokalemia, hypotension, dehydration, ototoxicity",
        warnings: "Monitor electrolytes, renal function, and fluid status. Risk of severe dehydration.",
        interactions: "Digoxin (hypokalemia increases toxicity), aminoglycosides (ototoxicity)",
        nursingConsiderations: "Monitor I&O, daily weight, BP, and electrolytes. Administer in morning to avoid nocturia.",
        category: "cardiovascular"
    },
    {
        id: 9,
        name: "Insulin (Regular)",
        genericName: "Human Insulin",
        type: "Antidiabetic (Rapid-acting)",
        dose: "Individualized",
        frequency: "AC + HS",
        maxDose: "Varies",
        route: "SC/IV",
        indication: "Diabetes mellitus (Type 1 & 2), hyperglycemia",
        contraindications: "Hypoglycemia",
        sideEffects: "Hypoglycemia, injection site reactions, weight gain",
        warnings: "HIGH ALERT MEDICATION. Risk of severe hypoglycemia. Never share pens between patients.",
        interactions: "Beta-blockers (mask hypoglycemia), corticosteroids (hyperglycemia)",
        nursingConsiderations: "Check blood glucose before administration. Rotate injection sites. Have glucose available.",
        category: "diabetes"
    },
    {
        id: 10,
        name: "Heparin",
        genericName: "Heparin Sodium",
        type: "Anticoagulant",
        dose: "5000 units",
        frequency: "Q8-12H",
        maxDose: "Varies",
        route: "SC/IV",
        indication: "DVT/PE prevention and treatment",
        contraindications: "Active bleeding, thrombocytopenia, uncontrolled hypertension",
        sideEffects: "Bleeding, thrombocytopenia (HIT), osteoporosis with long-term use",
        warnings: "HIGH ALERT MEDICATION. Monitor aPTT. Risk of heparin-induced thrombocytopenia (HIT).",
        interactions: "Antiplatelet agents, NSAIDs, thrombolytics",
        nursingConsiderations: "Monitor aPTT, platelet count, signs of bleeding. Do not aspirate or massage injection site.",
        category: "cardiovascular"
    }
];

const CATEGORIES = [
    { value: "all", label: "All Categories", icon: Pill },
    { value: "pain", label: "Pain Management", icon: Heart },
    { value: "antibiotic", label: "Antibiotics", icon: Shield },
    { value: "cardiovascular", label: "Cardiovascular", icon: Heart },
    { value: "diabetes", label: "Diabetes", icon: Droplet },
    { value: "gastrointestinal", label: "Gastrointestinal", icon: Pill }
];

export default function MedGuidePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedMed, setExpandedMed] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // Real-time filtering
    const filteredMeds = useMemo(() => {
        return MEDICATIONS.filter(med => {
            const matchesSearch = searchQuery === "" ||
                med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                med.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                med.indication.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const toggleExpand = (id) => {
        setExpandedMed(expandedMed === id ? null : id);
    };

    return (
        <div className="min-h-screen flex font-sans bg-gray-50 dark:bg-gray-900">
            <div className="hidden md:block">
                <NurseDashboardSidebar />
            </div>

            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medication Guide</h1>
                    <p className="text-gray-500 dark:text-gray-400">Comprehensive reference for safe medication administration</p>
                </header>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, type, or indication..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                                >
                                    <X className="h-4 w-4 text-gray-500" />
                                </button>
                            )}
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Filter className="h-5 w-5" />
                            Filters
                            {selectedCategory !== "all" && (
                                <span className="ml-1 px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">1</span>
                            )}
                        </button>
                    </div>

                    {/* Category Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setSelectedCategory(cat.value)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === cat.value
                                                ? "bg-teal-600 text-white shadow-md"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        <cat.icon className="h-4 w-4" />
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredMeds.length}</span> medication{filteredMeds.length !== 1 ? 's' : ''}
                </div>

                {/* Medications List */}
                <div className="space-y-4">
                    {filteredMeds.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700">
                            <Pill className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No medications found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredMeds.map(med => (
                            <div
                                key={med.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Medication Header */}
                                <div
                                    onClick={() => toggleExpand(med.id)}
                                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-teal-600 dark:text-teal-400">
                                                    <Pill className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{med.name}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{med.type}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dose</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{med.dose}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency</p>
                                                    <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-fit">
                                                        {med.frequency}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Route</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{med.route}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Max Dose</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{med.maxDose}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                            {expandedMed === med.id ? (
                                                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedMed === med.id && (
                                    <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 p-6 space-y-6">

                                        {/* Warnings */}
                                        {med.warnings && (
                                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
                                                <div className="flex gap-3">
                                                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-bold text-red-900 dark:text-red-300 mb-1">Safety Warnings</h4>
                                                        <p className="text-sm text-red-800 dark:text-red-200">{med.warnings}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Details Grid */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <DetailSection title="Indication" icon={<Info className="h-4 w-4" />}>
                                                {med.indication}
                                            </DetailSection>

                                            <DetailSection title="Contraindications" icon={<AlertTriangle className="h-4 w-4" />}>
                                                {med.contraindications}
                                            </DetailSection>

                                            <DetailSection title="Side Effects" icon={<Info className="h-4 w-4" />}>
                                                {med.sideEffects}
                                            </DetailSection>

                                            <DetailSection title="Drug Interactions" icon={<Info className="h-4 w-4" />}>
                                                {med.interactions}
                                            </DetailSection>
                                        </div>

                                        {/* Nursing Considerations */}
                                        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-900/30 rounded-xl p-4">
                                            <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-2 flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Nursing Considerations
                                            </h4>
                                            <p className="text-sm text-teal-800 dark:text-teal-200">{med.nursingConsiderations}</p>
                                        </div>

                                        {/* External Links */}
                                        <div className="flex gap-3 pt-2">
                                            <a
                                                href={`https://www.drugs.com/${med.genericName.toLowerCase().replace(/\s+/g, '-')}.html`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Full Prescribing Info
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

function DetailSection({ title, icon, children }) {
    return (
        <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                {icon}
                {title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>
        </div>
    );
}
