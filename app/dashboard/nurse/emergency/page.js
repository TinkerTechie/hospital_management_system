"use client";

import React from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { AlertOctagon, Phone, MapPin, Users } from "lucide-react";

export default function EmergencyPage() {
    return (
        <div className="min-h-screen flex font-sans bg-gray-50">
            <div className="hidden md:block">
                <NurseDashboardSidebar />
            </div>

            <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
                <header className="mb-8 flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl text-red-600">
                        <AlertOctagon className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Emergency Response</h1>
                        <p className="text-gray-500">Quick access to emergency contacts and codes</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Emergency Codes */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Emergency Codes</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="font-bold text-red-700">Code Blue</span>
                                </div>
                                <span className="text-sm text-red-600">Cardiac Arrest</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="h-3 w-3 bg-orange-500 rounded-full"></span>
                                    <span className="font-bold text-orange-700">Code Red</span>
                                </div>
                                <span className="text-sm text-orange-600">Fire</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                                    <span className="font-bold text-yellow-700">Code Yellow</span>
                                </div>
                                <span className="text-sm text-yellow-600">Disaster</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Contacts */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Emergency Room</p>
                                    <p className="text-teal-600 font-mono text-lg">Ext. 1000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Users className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Security</p>
                                    <p className="text-teal-600 font-mono text-lg">Ext. 2000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Ambulance Dispatch</p>
                                    <p className="text-teal-600 font-mono text-lg">Ext. 3000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
