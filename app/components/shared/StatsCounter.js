"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, label, suffix = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString()
    );

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, spring, value]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-teal-700 mb-2 flex items-center">
                <motion.span>{display}</motion.span>
                <span>{suffix}</span>
            </div>
            <p className="text-gray-600 font-medium">{label}</p>
        </div>
    );
}

export default function StatsCounter() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <Counter value={1000} label="Successful Treatments" suffix="+" />
            <Counter value={99} label="Patient Satisfaction" suffix="%" />
            <Counter value={50} label="Expert Doctors" suffix="+" />
            <Counter value={24} label="Emergency Service" suffix="/7" />
        </div>
    );
}
