"use client";

export default function DashboardFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <p>© {new Date().getFullYear()} Medicare. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
                    <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    <a href="#" className="hover:text-gray-300">Support</a>
                </div>
            </div>
        </footer>
    );
}
