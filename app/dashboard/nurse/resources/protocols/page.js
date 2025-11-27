"use client";

import React from "react";
import NurseDashboardSidebar from "../../../../components/nurse/NurseDashboardSidebar";
import { FileText, Shield, AlertTriangle, CheckSquare } from "lucide-react";

export default function ProtocolsPage() {
    const protocols = [
        {
            title: "Code Blue Response",
            category: "Emergency",
            icon: AlertTriangle,
            color: "text-red-600 bg-red-50",
            steps: ["Call for help", "Start CPR", "Attach defibrillator", "Administer Epinephrine"],
        },
        {
            title: "Infection Control",
            category: "Safety",
            icon: Shield,
            color: "text-blue-600 bg-blue-50",
            steps: ["Hand hygiene", "PPE usage", "Isolation precautions", "Waste disposal"],
        },
        {
            title: "Patient Admission",
            category: "Administrative",
            icon: FileText,
            color: "text-teal-600 bg-teal-50",
            steps: ["Verify ID", "Record vitals", "Review history", "Orient to room"],
        },
    ];

    return (
        <div className="min-h-screen flex font-sans bg-gray-50">
            <div className="hidden md:block">
                <NurseDashboardSidebar />
            </div>

            <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hospital Protocols</h1>
                    <p className="text-gray-500">Standard operating procedures and guidelines</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.color}`}>
                                <p.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{p.title}</h3>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-lg text-gray-600">
                                {p.category}
                            </span>

                            <div className="mt-6 space-y-3">
                                {p.steps.map((step, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <CheckSquare className="h-5 w-5 text-gray-300 shrink-0" />
                                        <p className="text-sm text-gray-600">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                View Full Protocol
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
