import React, { useEffect, useRef} from 'react';
import lottie from 'lottie-web';
import loadingJson from '@/components/atoms/lottie/json/loading.json';

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
            animationData: loadingJson,
        });
    
        return () => {
        animation.destroy();
        };
    }, []);

    return <div className="w-auto mt-4 h-40 text-primary" ref={containerRef} />;
};

export default LottieLoadingAnimated;

