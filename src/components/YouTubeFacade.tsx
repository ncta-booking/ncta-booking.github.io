import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

/**
 * Lightweight YouTube embed. Renders only the poster image + a play button
 * until the visitor clicks; the real <iframe> (and the ~1MB of YouTube JS it
 * drags in) is never requested otherwise. Keeps the article pages fast on
 * mobile, per the performance rules in CLAUDE.md.
 */
export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({ videoId, title }) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-white text-white" />
        </span>
      </span>
    </button>
  );
};
