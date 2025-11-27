import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar, ShieldCheck, Clock } from "lucide-react";

const DoctorCard = ({ doctor }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                    src={doctor.profilePicUrl || "/default-doctor.png"}
                    alt={doctor.fullName}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {doctor.averageRating >= 4.5 && (
                        <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Star size={12} fill="black" /> Top Rated
                        </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {doctor.yearsOfExperience}+ Years Exp.
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                            {doctor.fullName}
                        </h3>
                        <p className="text-teal-600 font-medium text-sm">{doctor.specialization}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-900 font-bold text-sm">{doctor.averageRating}</span>
                        <span className="text-gray-400 text-xs">({doctor.totalReviews})</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                    {doctor.bio || `Specialist in ${doctor.specialization} with over ${doctor.yearsOfExperience} years of experience in providing quality patient care.`}
                </p>

                <div className="space-y-3 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ShieldCheck size={16} className="text-teal-500" />
                        <span>{doctor.department} Department</span>
                    </div>

                    {doctor.enableTeleconsultation && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} className="text-blue-500" />
                            <span>Available for Teleconsult</span>
                        </div>
                    )}

                    <div className="pt-4 flex gap-3">
                        <Link
                            href={`/appointments?doctor=${doctor.id}`}
                            className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Calendar size={16} />
                            Book Visit
                        </Link>
                        <Link
                            href={`/doctors/${doctor.id}`}
                            className="px-4 py-2.5 rounded-xl border-2 border-gray-100 text-gray-600 font-semibold text-sm hover:border-teal-100 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DoctorCard;
