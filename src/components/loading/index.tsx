import LottieLoading from '@/components/lottie/LottieLoading';
export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center h-screen text-black bg-white/50 backdrop-blur-lg">
            <LottieLoading/>
            <p className="-mt-6 text-blue-500">Loading...</p>
        </div>
    );
}