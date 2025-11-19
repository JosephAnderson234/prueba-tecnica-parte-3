import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const MyModal = ({ isOpen, setIsOpen, children, title }: { isOpen: boolean, setIsOpen: (open: boolean) => void, children: React.ReactNode, title?: string }) => (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

        {/* Container centrado */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                    <DialogTitle className="text-2xl font-bold text-text">
                        {title || "Modal"}
                    </DialogTitle>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                        aria-label="Cerrar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */} 
                <div className="px-8 py-6">
                    {children}
                </div>
            </DialogPanel>
        </div>
    </Dialog>
);

export default MyModal;
