import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart, Clock, MapPin } from "lucide-react";

const NurseCard = ({ nurse }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                    src={nurse.profilePicUrl || "/default-nurse.png"}
                    alt={nurse.fullName}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg inline-block mb-1 border border-white/30">
                        {nurse.shiftTiming}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                            {nurse.fullName}
                        </h3>
                        <p className="text-pink-600 font-medium text-sm">Registered Nurse</p>
                    </div>
                    <div className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-lg border border-pink-100">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-900 font-bold text-sm">{nurse.averageRating}</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                        <MapPin size={18} className="text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Assigned Ward</p>
                            <p className="font-semibold text-gray-800">{nurse.assignedWard}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Heart size={16} className="text-pink-400 fill-pink-50" />
                        <span>{nurse.totalReviews} Appreciations</span>
                    </div>
                    <button className="text-pink-600 font-semibold text-sm hover:text-pink-700 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default NurseCard;
