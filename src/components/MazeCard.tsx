import { Card } from "@/components/ui/card";
import { BadgeCheck, ImagePlus } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}

interface MazeCardProps {
  profile: {
    displayName: string;
    bio: string;
    title: string;
  };
  links: Link[];
  style: {
    backgroundColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: number;
    theme: string;
    orientation: "horizontal" | "vertical";
  };
  coverImage: string | null;
}

export const MazeCard = ({ profile, links, style, coverImage }: MazeCardProps) => {
  const isColorDark = (color: string) => {
    if (!color) return false;
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
    return false;
  };

  const isDark = isColorDark(style?.backgroundColor || 'white');
  const textColor = isDark ? 'white' : '#1f2937';
  const mutedTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(31, 41, 55, 0.7)';

  const getLinkByIndex = (index: number) => links[index] || null;
  
  const getDefaultThumbnail = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop';
    }
    return null;
  };

  const brandMode = false; // Always false for the hover card preview

  return (
    <div className={style?.orientation === 'vertical' ? "w-[236px] h-[420px]" : "w-[420px] h-[236px]"}>
      <Card 
        className="overflow-hidden border-0 h-full w-full" 
        style={{
          boxShadow: '0 0 80px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: `${style?.borderRadius || 16}px`
        }}
      >
        <div 
          className="p-3 h-full"
          style={{
            backgroundColor: style?.backgroundColor || 'white',
            color: textColor,
            fontFamily: style?.fontFamily || 'Inter'
          }}
        >
          {/* Bento Grid Layout - Exact same as MazePreview */}
          <div className={`grid gap-2 h-full ${style?.orientation === 'vertical' ? 'grid-cols-2 grid-rows-4' : 'grid-cols-4 grid-rows-2'}`}>
            
            {/* Cover Image Section */}
            <div 
              className={`bg-gradient-to-br from-blue-400/20 to-indigo-500/20 relative overflow-hidden ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1' : 'col-span-2 row-span-1'}`}
              style={{ 
                borderRadius: `${(style?.borderRadius || 16) * 0.75}px`
              }}
            >
              {coverImage ? (
                <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center" style={{ color: mutedTextColor }}>
                    <ImagePlus className="w-5 h-5 mx-auto mb-1" strokeWidth={2} />
                    <span className="text-base font-medium">Add Cover</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section - Transparent */}
            <div 
              className={`rounded-xl flex flex-col justify-center p-3 text-left ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1 col-start-1 row-start-2' : 'col-span-2 row-span-1 row-start-2'}`}
            >
              <div className="flex items-center gap-1 mb-1">
                <span 
                  className="text-base font-semibold"
                  style={{ color: textColor }}
                >
                  {profile.displayName}
                </span>
                <BadgeCheck className="w-4 h-4 text-blue-500" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-sm font-semibold" style={{ color: mutedTextColor }}>
                  {profile.title}
                </p>
              </div>
              <p className="text-sm leading-tight" style={{ color: mutedTextColor }}>
                {profile.bio}
              </p>
            </div>

            {/* Link 1 */}
            <div 
              className={`overflow-hidden relative ${style?.orientation === 'vertical' ? 'col-span-1 row-span-1 col-start-1 row-start-3' : 'col-span-1 row-span-1'}`}
              style={{ borderRadius: `${(style?.borderRadius || 16) * 0.75}px` }}
            >
              {(() => {
                const link = getLinkByIndex(0);
                if (link) {
                  const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                  return (
                    <>
                      {thumbnail ? (
                        <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500" />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm text-center px-1">
                          {link.title}
                        </span>
                      </div>
                    </>
                  );
                }
                return (
                  <div className="bg-gradient-to-br from-emerald-400/20 to-teal-500/20 h-full flex items-center justify-center">
                    <span style={{ color: mutedTextColor }} className="text-xs">Link 1</span>
                  </div>
                );
              })()}
            </div>

            {/* Link 2 or "Made with Maze" */}
            <div 
              className={`overflow-hidden relative ${style?.orientation === 'vertical' ? 'col-span-1 row-span-1 col-start-2 row-start-3' : 'col-span-1 row-span-1'}`}
              style={{ borderRadius: `${(style?.borderRadius || 16) * 0.75}px` }}
            >
              {(() => {
                const link = getLinkByIndex(1);
                if (link && brandMode) {
                  const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                  return (
                    <>
                      {thumbnail ? (
                        <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500" />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm text-center px-1">
                          {link.title}
                        </span>
                      </div>
                    </>
                  );
                }
                // Always show "Made with Maze" when no second link or not in brand mode
                return (
                  <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-2 text-center">
                    <div className="text-gray-700 text-sm font-medium mb-0.5">Made with</div>
                    <div className="text-gray-700 text-sm font-bold">Maze</div>
                    <div className="text-gray-600 text-xs opacity-70 mt-0.5">getmaze.ai</div>
                  </div>
                );
              })()}
            </div>

            {/* Last Link - Spans 2 columns */}
            <div 
              className={`rounded-xl overflow-hidden relative ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1 col-start-1 row-start-4' : 'col-span-2 row-span-1'}`}
            >
              {(() => {
                const link = brandMode ? getLinkByIndex(2) : getLinkByIndex(1);
                if (link) {
                  const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                  return (
                    <>
                      {thumbnail ? (
                        <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600" />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold text-base text-center px-2">
                          {link.title}
                        </span>
                      </div>
                    </>
                  );
                }
                return (
                  <div className="bg-gradient-to-r from-rose-400/20 to-pink-600/20 h-full flex items-center justify-center">
                    <span style={{ color: mutedTextColor }} className="text-lg">
                      Link {brandMode ? '3' : '2'}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

