
import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';

const App: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [lastAction, setLastAction] = useState<{ type: string; time: string } | null>(null);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setLastAction({ type: 'Masuk', time: new Date().toLocaleTimeString() });
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setLastAction({ type: 'Keluar', time: new Date().toLocaleTimeString() });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
      <div className="text-center p-4 space-y-2 mb-28">
        <h1 className="text-2xl font-bold text-gray-800">Pelacak Kehadiran</h1>
        <p className="text-base text-gray-600">
          Status Anda saat ini: 
          <span className={`font-semibold ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
            {isClockedIn ? ' Sudah Masuk' : ' Sudah Keluar'}
          </span>
        </p>
        {lastAction && (
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">
              Aksi terakhir: <span className="font-medium text-gray-700">{lastAction.type}</span> pukul <span className="font-medium text-gray-700">{lastAction.time}</span>
            </p>
          </div>
        )}
        <div className="pt-6 text-gray-400">
          <p className="text-xs">Gunakan kontrol di bawah untuk mengubah status Anda.</p>
        </div>
      </div>
      <BottomNav 
        isClockedIn={isClockedIn} 
        onClockIn={handleClockIn} 
        onClockOut={handleClockOut} 
      />
    </div>
  );
};

export default App;
