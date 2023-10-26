import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import animate from '@/components/lottie/loadingAnimate.json';

const LottieLoadingAnimated = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const animation = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animate,
        });
    
        return () => {
        animation.destroy();
        };
    }, []);

    return <div className="w-auto mt-4 h-40 text-primary" ref={containerRef} />;
};

export default LottieLoadingAnimated;

