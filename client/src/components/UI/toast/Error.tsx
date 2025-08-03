import React from 'react'
import toast from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

interface InputProps {
    toastIn: Toast;
    message: string;
}

export const Error: React.FC<InputProps> = ({ toastIn, message }) => <div
    className={`${toastIn.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full rounded-lg pointer-events-auto flex backdrop-filter backdrop-blur-lg bg-opacity-0 bg-gray-800/40`}
>
    <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
            <div className="ml-3 flex-1">
                <p className="text-lg font-bold text-red-500">
                    Error !
                </p>
                <p className="mt-1 text-sm text-gray-300 font-bold">
                    {message}
                </p>
            </div>
        </div>
    </div>
    <div className="flex border-l border-gray-200">
        <button
            onClick={() => toast.dismiss(toastIn.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-teal-800 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
            Close
        </button>
    </div>
</div>;