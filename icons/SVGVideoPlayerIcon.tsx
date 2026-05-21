export default function SVGVideoPlayerIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Video Player</title>
            <rect x="4" y="4" width="24" height="16" />
            <polygon points="14,9 14,15 18,12 " />
            <circle cx="10" cy="26" r="2" />
            <line x1="4" y1="26" x2="8" y2="26" />
            <line x1="15" y1="26" x2="28" y2="26" />
        </svg>
    );
}
