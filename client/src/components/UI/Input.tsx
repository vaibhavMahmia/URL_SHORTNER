import React from 'react';

interface InputProps {
    type: string; // You can also use 'text' | 'email' | 'password' if you want to restrict types
    label: string;
    placeholder?: string; // Optional prop
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function type for onChange
}

export const Input: React.FC<InputProps> = ({ type, label, placeholder, value, onChange }) => {
    return (
        <div>
            <label className='label p-2'>
                <span className='text-base label-text'>{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder} // Use the placeholder prop
                className='w-full input input-bordered input-sm input-accent'
                value={value} // Use the value prop
                onChange={onChange} // Use the onChange prop
            />
        </div>
    );
};
