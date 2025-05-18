import React from 'react'
import toast from 'react-hot-toast';

interface Toast {
    id: string; // Unique identifier for the toast
    type: string; // Type of the toast
    message: string; // The message displayed in the toast
    duration: number; // Duration in milliseconds for which the toast is visible
    dismiss: () => void; // Function to dismiss the toast
    visible: boolean; // Indicates if the toast is currently visible
    // Additional properties may be present depending on the implementation
}

interface InputProps {
    toastIn: Toast;
    message: string;
}

export const Error: React.FC<InputProps> = ({ toastIn, message }) => {
    return (
        <div
            className={`${toastIn.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-gray-300 rounded-lg pointer-events-auto flex`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="text-lg font-bold text-red-500">
                            Error !
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(toastIn.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

