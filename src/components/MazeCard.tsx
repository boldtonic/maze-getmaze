import { Card } from "@/components/ui/card";

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
  return (
    <Card 
      className="w-80 shadow-2xl border-2 overflow-hidden"
      style={{
        backgroundColor: style.backgroundColor,
        borderRadius: `${style.borderRadius}px`,
      }}
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="h-24 overflow-hidden">
          <img 
            src={coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Profile Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 
            className="text-xl font-bold mb-1"
            style={{ fontFamily: style.fontFamily }}
          >
            {profile.displayName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{profile.title}</p>
          <p 
            className="text-sm"
            style={{ fontFamily: style.fontFamily }}
          >
            {profile.bio}
          </p>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg border hover:shadow-md transition-all duration-200"
                style={{
                  borderRadius: `${style.borderRadius * 0.75}px`,
                  borderColor: style.accentColor,
                }}
              >
                <div className="flex items-center gap-3">
                  {link.thumbnail && (
                    <img 
                      src={link.thumbnail} 
                      alt="" 
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{link.title}</p>
                    {link.url && (
                      <p className="text-xs text-gray-500 truncate">{link.url}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Maze Branding */}
      <div className="px-6 pb-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <span>Powered by</span>
        <img src="/src/assets/maze-logo.svg" alt="Maze" className="h-3" />
      </div>
    </Card>
  );
};
