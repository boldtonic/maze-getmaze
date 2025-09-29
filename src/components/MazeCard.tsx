import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";

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

  return (
    <div className={style?.orientation === 'vertical' ? "w-[236px] h-[420px]" : "w-[420px] h-[236px]"}>
      <Card 
        className="overflow-hidden border-0 h-full w-full shadow-2xl" 
        style={{
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
          {/* Bento Grid Layout */}
          <div className={`grid gap-2 h-full ${style?.orientation === 'vertical' ? 'grid-cols-2 grid-rows-4' : 'grid-cols-4 grid-rows-2'}`}>
            
            {/* Profile Card - takes 2 columns in vertical, 2 rows in horizontal */}
            <div 
              className={`rounded-xl p-3 flex flex-col justify-between ${style?.orientation === 'vertical' ? 'col-span-2 row-span-2' : 'col-span-2 row-span-2'}`}
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: `${(style?.borderRadius || 16) * 0.75}px`
              }}
            >
              {coverImage && (
                <div className="mb-2 -mt-3 -mx-3 h-16 overflow-hidden rounded-t-xl">
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start gap-2 mb-2">
                  <Avatar className="h-10 w-10 border-2" style={{ borderColor: style?.accentColor }}>
                    <AvatarFallback style={{ backgroundColor: style?.accentColor, color: 'white' }}>
                      {profile.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-sm truncate" style={{ color: textColor }}>
                        {profile.displayName}
                      </h3>
                      <BadgeCheck className="h-3 w-3 flex-shrink-0" style={{ color: style?.accentColor }} />
                    </div>
                    <p className="text-xs truncate" style={{ color: mutedTextColor }}>
                      {profile.title}
                    </p>
                  </div>
                </div>
                <p className="text-xs line-clamp-2" style={{ color: mutedTextColor }}>
                  {profile.bio}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px]" style={{ color: mutedTextColor }}>Powered by</span>
                  <img src="/src/assets/maze-logo.svg" alt="Maze" className="h-2.5 opacity-60" />
                </div>
              </div>
            </div>

            {/* Link Cards */}
            {style?.orientation === 'vertical' ? (
              <>
                {/* Vertical: 2 single cards in row 3, 2 single cards in row 4 */}
                {[0, 1, 2, 3].map((index) => {
                  const link = getLinkByIndex(index);
                  const row = index < 2 ? 3 : 4;
                  const col = (index % 2) + 1;
                  
                  return (
                    <div 
                      key={index}
                      className="rounded-xl p-2 flex flex-col items-center justify-center text-center overflow-hidden"
                      style={{
                        gridColumn: col,
                        gridRow: row,
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        borderRadius: `${(style?.borderRadius || 16) * 0.75}px`
                      }}
                    >
                      {link ? (
                        <>
                          {(link.thumbnail || getDefaultThumbnail(link.url)) && (
                            <div className="w-full h-12 mb-1 rounded overflow-hidden">
                              <img 
                                src={link.thumbnail || getDefaultThumbnail(link.url)!} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="text-xs font-medium truncate w-full" style={{ color: textColor }}>
                            {link.title}
                          </span>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {/* Horizontal: 2 single cards in column 3, 2 single cards in column 4 */}
                {[0, 1, 2, 3].map((index) => {
                  const link = getLinkByIndex(index);
                  const col = index < 2 ? 3 : 4;
                  const row = (index % 2) + 1;
                  
                  return (
                    <div 
                      key={index}
                      className="rounded-xl p-2 flex flex-col items-center justify-center text-center overflow-hidden"
                      style={{
                        gridColumn: col,
                        gridRow: row,
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        borderRadius: `${(style?.borderRadius || 16) * 0.75}px`
                      }}
                    >
                      {link ? (
                        <>
                          {(link.thumbnail || getDefaultThumbnail(link.url)) && (
                            <div className="w-full h-12 mb-1 rounded overflow-hidden">
                              <img 
                                src={link.thumbnail || getDefaultThumbnail(link.url)!} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="text-xs font-medium truncate w-full" style={{ color: textColor }}>
                            {link.title}
                          </span>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

