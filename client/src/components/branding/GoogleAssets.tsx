import { Search, MapPin } from "lucide-react";

interface GoogleLogoProps {
  className?: string;
}

/**
 * Official Google logo from Google's CDN
 */
export function GoogleLogo({ className = "h-8" }: GoogleLogoProps) {
  return (
    <img
      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      alt="Google"
      className={className}
      loading="lazy"
    />
  );
}

/**
 * Google Business Profile branded logo
 * Combines Google logo with "Business Profile" text
 */
export function GoogleBusinessProfileLogo({ className = "" }: GoogleLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <GoogleLogo className="h-6" />
      <span className="text-xl font-semibold text-slate-700">Business Profile</span>
    </div>
  );
}

/**
 * Google Maps pin icon (styled to match Google's red pin)
 */
export function GoogleMapsPin({ className = "w-6 h-6" }: GoogleLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Google Search icon (multicolor G icon)
 */
export function GoogleSearchIcon({ className = "w-6 h-6" }: GoogleLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Simple search icon (fallback/alternative to branded icon)
 */
export function SearchIconSimple({ className = "w-5 h-5" }: GoogleLogoProps) {
  return <Search className={className} />;
}

/**
 * Simple map pin icon (fallback/alternative to branded icon)
 */
export function MapPinSimple({ className = "w-5 h-5" }: GoogleLogoProps) {
  return <MapPin className={className} />;
}

/**
 * Google "G" letter logo (for compact spaces)
 */
export function GoogleGLogo({ className = "w-10 h-10" }: GoogleLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.5 24c0-1.41-.13-2.77-.36-4.08H24v7.71h11.5c-.5 2.66-2.01 4.91-4.28 6.42v5.57h6.93c4.05-3.73 6.35-9.23 6.35-15.62z"
        fill="#4285F4"
      />
      <path
        d="M24 46c5.77 0 10.61-1.91 14.15-5.18l-6.93-5.37c-1.91 1.28-4.35 2.04-7.22 2.04-5.56 0-10.27-3.75-11.96-8.79H4.85v5.56C8.37 41.09 15.62 46 24 46z"
        fill="#34A853"
      />
      <path
        d="M12.04 28.7c-.43-1.28-.68-2.64-.68-4.05s.25-2.77.68-4.05V15.04H4.85C3.32 17.96 2.5 21.37 2.5 25s.82 7.04 2.35 9.96l5.75-4.48 1.44-1.78z"
        fill="#FBBC05"
      />
      <path
        d="M24 10.78c3.14 0 5.96 1.08 8.18 3.19l6.14-6.14C34.61 4.39 29.77 2.5 24 2.5 15.62 2.5 8.37 7.41 4.85 15.04l7.19 5.56c1.69-5.04 6.4-8.82 11.96-8.82z"
        fill="#EA4335"
      />
    </svg>
  );
}
