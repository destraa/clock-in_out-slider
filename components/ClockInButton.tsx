
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LoginIcon, ChevronDoubleRightIcon } from './Icons';

interface ClockInButtonProps {
    onClick: () => void;
}

export const ClockInButton: React.FC<ClockInButtonProps> = ({ onClick }) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef(0);

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        startXRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        if (handleRef.current) {
          handleRef.current.style.transition = 'none';
        }
        e.preventDefault();
    }, []);

    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current || !handleRef.current) return;
        
        const containerWidth = containerRef.current.offsetWidth;
        const handleWidth = handleRef.current.offsetWidth;
        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        
        const deltaX = currentX - startXRef.current;
        const maxPosition = containerWidth - handleWidth;
        const newPosition = Math.max(0, Math.min(deltaX, maxPosition));

        setSliderPosition(newPosition);
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging || !containerRef.current || !handleRef.current) return;
        
        setIsDragging(false);

        if (handleRef.current) {
            handleRef.current.style.transition = 'transform 0.3s ease-out';
        }
        
        const containerWidth = containerRef.current.offsetWidth;
        const threshold = containerWidth * 0.75;

        if (sliderPosition >= threshold) {
            onClick();
        } else {
            setSliderPosition(0);
        }
    }, [isDragging, sliderPosition, onClick]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);


    const textOpacity = Math.max(0, 1 - (sliderPosition / ((containerRef.current?.offsetWidth ?? 200) / 3)));

    return (
        <div 
            ref={containerRef}
            className="flex-1 relative bg-blue-600 h-14 rounded-full flex items-center justify-center overflow-hidden cursor-pointer select-none shadow-lg"
        >
            <span className="text-white font-semibold text-base tracking-wide transition-opacity" style={{ opacity: textOpacity }}>
                Geser untuk Masuk
            </span>

            <div className="absolute right-4 animate-pulse" style={{ opacity: textOpacity }}>
                <ChevronDoubleRightIcon className="w-5 h-5 text-white/50"/>
            </div>

            <div
                ref={handleRef}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute top-0 left-0 h-full w-14 bg-white/30 flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing"
                style={{ transform: `translateX(${sliderPosition}px)`}}
            >
                <LoginIcon className="w-7 h-7 text-white" />
            </div>
        </div>
    );
};
