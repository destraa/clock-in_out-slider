
import React from 'react';
import { ClockInButton } from './ClockInButton';
import { ClockOutSlider } from './ClockOutSlider';
import { LoginIcon, LogoutIcon } from './Icons';

interface BottomNavProps {
    isClockedIn: boolean;
    onClockIn: () => void;
    onClockOut: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ isClockedIn, onClockIn, onClockOut }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="max-w-md mx-auto h-20 flex items-center justify-around gap-4 px-4">
                {isClockedIn ? (
                    // Clocked In: Show disabled "Masuk" icon and active "Keluar" slider
                    <>
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full text-gray-400 cursor-not-allowed opacity-70" title="Sudah Masuk">
                            <LoginIcon className="w-7 h-7" />
                        </div>
                        <ClockOutSlider onConfirm={onClockOut} />
                    </>
                ) : (
                    // Clocked Out: Show active "Masuk" slider and disabled "Keluar" icon
                    <>
                        <ClockInButton onClick={onClockIn} />
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full text-gray-400 cursor-not-allowed opacity-70" title="Sudah Keluar">
                             <LogoutIcon className="w-7 h-7" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
