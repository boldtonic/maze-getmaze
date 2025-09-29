import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MazeCard } from "@/components/MazeCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PublisherStyle = {
  name: string;
  theme: string;
};

const publishers: Record<string, PublisherStyle> = {
  "vogue": {
    name: "Vogue",
    theme: "lifestyle",
  },
  "architectural-digest": {
    name: "Architectural Digest",
    theme: "decoration",
  },
  "espn": {
    name: "ESPN",
    theme: "sports",
  },
  "nytimes": {
    name: "The New York Times",
    theme: "news",
  },
  "wired": {
    name: "Wired",
    theme: "tech",
  },
  "gq": {
    name: "GQ",
    theme: "lifestyle",
  },
  "elle-decor": {
    name: "Elle Decor",
    theme: "decoration",
  },
  "marca": {
    name: "Marca",
    theme: "sports",
  },
};

const ArticlePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPublisher, setSelectedPublisher] = useState<string>("vogue");
  const [hoveredName, setHoveredName] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const style = publishers[selectedPublisher];

  // Get profile data from navigation state
  const profileData = location.state || {
    profile: { displayName: "Jane Doe", bio: "Sharing my journey", title: "Creator" },
    links: [],
    style: {
      backgroundColor: "#ffffff",
      accentColor: "#6366f1",
      fontFamily: "Inter",
      borderRadius: 12,
      theme: "light",
      orientation: "horizontal" as const,
    },
    coverImage: null,
  };

  const handleNameHover = (e: React.MouseEvent) => {
    setHoveredName(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleNameLeave = () => {
    setHoveredName(false);
  };

  const renderArticle = () => {
    const articleProps = {
      publisherName: style.name,
      userName: profileData.profile.displayName,
      onNameHover: handleNameHover,
      onNameLeave: handleNameLeave,
      highlightColor: profileData.style.backgroundColor,
    };

    switch (style.theme) {
      case "lifestyle":
        return <LifestyleArticle {...articleProps} />;
      case "decoration":
        return <DecorationArticle {...articleProps} />;
      case "sports":
        return <SportsArticle {...articleProps} />;
      case "news":
        return <NewsArticle {...articleProps} />;
      case "tech":
        return <TechArticle {...articleProps} />;
      default:
        return <LifestyleArticle {...articleProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4 mr-2" />
            Close Preview
          </Button>
          
          <div className="flex-1 max-w-md">
            <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a publisher style" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <SelectGroup>
                  <SelectLabel>Lifestyle</SelectLabel>
                  <SelectItem value="vogue">Vogue</SelectItem>
                  <SelectItem value="gq">GQ</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Decoration & Design</SelectLabel>
                  <SelectItem value="architectural-digest">Architectural Digest</SelectItem>
                  <SelectItem value="elle-decor">Elle Decor</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Sports</SelectLabel>
                  <SelectItem value="espn">ESPN</SelectItem>
                  <SelectItem value="marca">Marca</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>News</SelectLabel>
                  <SelectItem value="nytimes">The New York Times</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Technology</SelectLabel>
                  <SelectItem value="wired">Wired</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Article Content */}
      {renderArticle()}

      {/* Maze Card Hover */}
      {hoveredName && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 100}px`,
          }}
        >
          <MazeCard
            profile={profileData.profile}
            links={profileData.links}
            style={profileData.style}
            coverImage={profileData.coverImage}
          />
        </div>
      )}
    </div>
  );
};

interface ArticleProps {
  publisherName: string;
  userName: string;
  onNameHover: (e: React.MouseEvent) => void;
  onNameLeave: () => void;
  highlightColor: string;
}

// Highlighted Name Component
const HighlightedName = ({ 
  name, 
  onHover, 
  onLeave, 
  backgroundColor = "#fef08a" 
}: { 
  name: string; 
  onHover: (e: React.MouseEvent) => void; 
  onLeave: () => void;
  backgroundColor?: string;
}) => {
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

  const textColor = isColorDark(backgroundColor) ? 'white' : '#1f2937';

  return (
    <span
      className="px-1 rounded cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: backgroundColor,
        color: textColor
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {name}
    </span>
  );
};

// Lifestyle Article (Vogue, GQ) - Image-heavy, elegant
const LifestyleArticle = ({ publisherName, userName, onNameHover, onNameLeave, highlightColor }: ArticleProps) => (
  <article className="max-w-5xl mx-auto px-4 py-12">
    <div className="max-w-3xl mx-auto">
      {/* Publisher Header */}
      <div className="text-center mb-12">
        <h3 className="text-5xl font-serif tracking-wider mb-2">{publisherName}</h3>
        <div className="h-px bg-black w-24 mx-auto"></div>
      </div>

      {/* Article Header */}
      <header className="text-center mb-16">
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Fashion & Style</p>
        <h1 className="text-6xl font-serif leading-tight mb-8">
          The Art of Modern Elegance
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm">
          <span>By ISABELLA MARTINEZ</span>
          <span>•</span>
          <time>March 2024</time>
        </div>
      </header>

      {/* Content with interspersed images */}
      <div className="space-y-12">
        <p className="text-xl font-serif leading-relaxed">
          In the ever-evolving landscape of contemporary fashion, elegance remains a timeless pursuit—one that transcends fleeting trends and speaks to something deeper within the human spirit. As <HighlightedName name={userName} onHover={onNameHover} onLeave={onNameLeave} backgroundColor={highlightColor} /> recently noted at the Milan Fashion Week, authenticity is becoming the new luxury.
        </p>

        <div className="aspect-[4/5] bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Editorial Image</span>
        </div>

        <p className="text-lg font-serif leading-relaxed">
          The season's most captivating collections demonstrate a masterful balance between tradition and innovation. Designers are reimagining classic silhouettes with unexpected textures and revolutionary construction techniques.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-50 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Detail</span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Detail</span>
          </div>
        </div>

        <p className="text-lg font-serif leading-relaxed italic text-center px-12">
          "Fashion is not merely about what we wear—it's about who we choose to become."
        </p>

        <p className="text-lg font-serif leading-relaxed">
          From the runways of Paris to the streets of Tokyo, we're witnessing a renaissance of personal style. The modern aesthetic embraces individuality while honoring the craftsmanship that defines luxury.
        </p>

        <div className="aspect-video bg-gradient-to-br from-slate-100 to-zinc-50 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Runway Image</span>
        </div>

        <p className="text-lg font-serif leading-relaxed">
          As we move forward, the conversation around sustainable luxury becomes increasingly central. The most prestigious houses are proving that environmental consciousness and exceptional design are not mutually exclusive.
        </p>
      </div>
    </div>
  </article>
);

// Decoration Article (Architectural Digest, Elle Decor) - Very image-heavy, spacious
const DecorationArticle = ({ publisherName, userName, onNameHover, onNameLeave, highlightColor }: ArticleProps) => (
  <article className="max-w-6xl mx-auto px-4 py-12">
    {/* Publisher Header */}
    <div className="text-center mb-16">
      <h3 className="text-4xl font-serif mb-2">{publisherName}</h3>
      <p className="text-sm uppercase tracking-widest text-gray-500">Interior Design</p>
    </div>

    {/* Article Header */}
    <header className="max-w-4xl mx-auto text-center mb-20">
      <h1 className="text-7xl font-serif leading-tight mb-6">
        A Study in Refined Living
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        How minimalist principles create maximum impact in this stunning renovation
      </p>
      <div className="flex items-center justify-center gap-3 text-sm">
        <span>Photography by JAMES CHEN</span>
        <span>•</span>
        <span>Text by SOPHIA ANDERSON</span>
      </div>
    </header>

    {/* Content with LOTS of images */}
    <div className="space-y-16">
      <div className="aspect-[16/10] bg-gradient-to-br from-stone-200 to-neutral-100 flex items-center justify-center rounded">
        <span className="text-gray-400">Living Room</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-2xl font-serif leading-relaxed mb-8">
          Natural light floods through floor-to-ceiling windows, illuminating a carefully curated collection of mid-century furniture and contemporary art. Interior designer <HighlightedName name={userName} onHover={onNameHover} onLeave={onNameLeave} backgroundColor={highlightColor} /> consulted on the color palette, bringing warmth to the minimalist aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center rounded">
          <span className="text-gray-400 text-sm">Detail Shot</span>
        </div>
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center rounded">
          <span className="text-gray-400 text-sm">Texture Close-up</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-xl font-serif leading-relaxed">
          The designer's approach prioritizes quality over quantity, selecting each piece for its ability to harmonize with the architecture while maintaining its individual character. Neutral tones provide a sophisticated backdrop for pops of color in carefully chosen accessories.
        </p>
      </div>

      <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-gray-50 flex items-center justify-center rounded">
        <span className="text-gray-400">Panoramic View</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center rounded">
          <span className="text-gray-400 text-xs">Vignette</span>
        </div>
        <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center rounded">
          <span className="text-gray-400 text-xs">Plant Detail</span>
        </div>
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-violet-50 flex items-center justify-center rounded">
          <span className="text-gray-400 text-xs">Art Piece</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-xl font-serif leading-relaxed">
          In the bedroom, organic materials and soft textures create a sanctuary of calm. The result is a space that feels both luxurious and livable—a true reflection of contemporary elegance.
        </p>
      </div>
    </div>
  </article>
);

// Sports Article (ESPN, Marca) - Bold, dynamic, stats-focused
const SportsArticle = ({ publisherName, userName, onNameHover, onNameLeave, highlightColor }: ArticleProps) => (
  <article className="max-w-7xl mx-auto px-4 py-8">
    {/* Bold Publisher Header */}
    <div className="bg-red-600 text-white px-8 py-4 mb-8">
      <h3 className="text-4xl font-black uppercase tracking-tight">{publisherName}</h3>
    </div>

    {/* Breaking News Style Header */}
    <div className="border-l-8 border-red-600 pl-6 mb-8">
      <p className="text-red-600 font-black uppercase tracking-wide text-sm mb-2">BREAKING</p>
      <h1 className="text-6xl font-black uppercase leading-none mb-4">
        HISTORIC VICTORY STUNS THE WORLD
      </h1>
      <p className="text-2xl font-bold text-gray-700 mb-4">
        Underdog team defeats champions in dramatic final seconds
      </p>
      <div className="flex items-center gap-6 text-sm font-bold">
        <span className="uppercase">JUAN RODRIGUEZ</span>
        <span>|</span>
        <time>15 Mar 2024, 23:47 CET</time>
        <span>|</span>
        <span className="text-red-600">ÚLTIMA HORA</span>
      </div>
    </div>

    {/* Stats Box */}
    <div className="bg-gray-900 text-white p-6 mb-8 grid grid-cols-3 gap-8">
      <div className="text-center">
        <div className="text-5xl font-black mb-2">98</div>
        <div className="text-sm uppercase tracking-wider">Final Score</div>
      </div>
      <div className="text-center border-x border-gray-700">
        <div className="text-5xl font-black mb-2">95</div>
        <div className="text-sm uppercase tracking-wider">Opposition</div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-black mb-2">0.3</div>
        <div className="text-sm uppercase tracking-wider">Seconds Left</div>
      </div>
    </div>

    {/* Bold Content */}
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-6">
        <p className="text-xl font-bold leading-relaxed">
          In what will be remembered as one of the greatest upsets in sports history, the underdogs pulled off an impossible victory with a last-second play that left millions of fans in absolute shock. Among those celebrating was former player <HighlightedName name={userName} onHover={onNameHover} onLeave={onNameLeave} />, who called it "the most incredible moment in the sport's history."
        </p>

        <p className="text-lg leading-relaxed">
          The stadium erupted as the final buzzer sounded. Players collapsed on the court in disbelief. Fans couldn't contain their emotions. This wasn't just a game—it was a moment that will be replayed for generations.
        </p>

        <div className="bg-yellow-400 border-l-4 border-yellow-600 p-6 my-8">
          <p className="text-xl font-black uppercase mb-2">Key Moment</p>
          <p className="text-lg font-bold">
            "I've never seen anything like it in my 20 years covering this sport. Absolutely incredible."
          </p>
          <p className="text-sm font-bold mt-2">— Sports Analyst Maria Santos</p>
        </div>

        <p className="text-lg leading-relaxed">
          The victory caps off an extraordinary season for a team that was written off by critics at the start. Their journey from underdogs to champions is the stuff of legend, proving once again that in sports, anything is possible.
        </p>

        <p className="text-lg leading-relaxed">
          As celebrations continue into the night, one thing is certain: this historic moment will be talked about for decades to come. The impossible became possible, and sports fans around the world witnessed something truly magical.
        </p>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-gray-100 p-4">
          <h3 className="font-black uppercase text-sm mb-4 border-b-2 border-black pb-2">Top Players</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between font-bold">
              <span>M. Johnson</span>
              <span>34 PTS</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>A. Davis</span>
              <span>12 REB</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>K. Williams</span>
              <span>8 AST</span>
            </div>
          </div>
        </div>

        <div className="bg-red-600 text-white p-4">
          <h3 className="font-black uppercase text-sm mb-3">Latest News</h3>
          <div className="space-y-3 text-sm font-bold">
            <div className="border-b border-red-400 pb-2">Transfer rumors heat up</div>
            <div className="border-b border-red-400 pb-2">Coach speaks out</div>
            <div>Next match preview</div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

// News Article (NYTimes) - Classic newspaper layout
const NewsArticle = ({ publisherName, userName, onNameHover, onNameLeave, highlightColor }: ArticleProps) => (
  <article className="max-w-5xl mx-auto px-4 py-8 bg-white">
    {/* Classic Newspaper Header */}
    <div className="border-b-4 border-black pb-4 mb-8">
      <h3 className="text-5xl font-serif text-center tracking-tight">{publisherName}</h3>
      <div className="flex justify-center gap-8 text-xs mt-2">
        <span>VOL. CLXXIII . . . No. 59,876</span>
        <span>FRIDAY, MARCH 15, 2024</span>
      </div>
    </div>

    {/* Newspaper Style Header */}
    <header className="border-b border-gray-300 pb-6 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">World News</p>
      <h1 className="text-5xl font-serif leading-tight mb-4 font-bold">
        Global Leaders Convene to Address Critical Economic Challenges
      </h1>
      <p className="text-xl font-serif text-gray-700 mb-4">
        Summit focuses on inflation, trade policies, and sustainable development as nations seek collaborative solutions
      </p>
      <div className="text-sm text-gray-600">
        <span className="font-bold">By ROBERT ANDERSON</span>
        <span className="mx-2">|</span>
        <span>March 15, 2024</span>
      </div>
    </header>

    {/* Columned Text - Classic Newspaper */}
    <div className="columns-2 gap-8 text-justify space-y-4">
      <p className="font-serif leading-relaxed">
        <span className="text-5xl font-serif float-left mr-2 leading-none">W</span>
        ASHINGTON — World leaders gathered today for an unprecedented summit addressing the interconnected challenges of global inflation, trade disruptions, and the urgent need for sustainable economic development. Economic advisor <HighlightedName name={userName} onHover={onNameHover} onLeave={onNameLeave} backgroundColor={highlightColor} /> attended the conference as a key policy consultant, marking what many observers are calling a pivotal moment in international cooperation.
      </p>

      <p className="font-serif leading-relaxed">
        The three-day conference brings together representatives from more than 50 nations, each grappling with economic pressures that have mounted in recent months. Central bank governors, finance ministers, and heads of state are working to forge consensus on coordinated policy responses.
      </p>

      <p className="font-serif leading-relaxed">
        "The challenges we face today require collaborative solutions," said European Commission President Maria Schneider in her opening remarks. "No single nation can address these issues alone."
      </p>

      <p className="font-serif leading-relaxed">
        The summit agenda encompasses a broad range of topics, from monetary policy coordination to supply chain resilience and climate-related financial risks. Participants have emphasized the need for both immediate interventions and long-term structural reforms.
      </p>

      <p className="font-serif leading-relaxed">
        Economists watching the proceedings suggest that any agreements reached could have far-reaching implications for global markets. Early discussions have focused on harmonizing approaches to inflation control while maintaining economic growth.
      </p>

      <p className="font-serif leading-relaxed">
        Critics, however, have questioned whether the summit can produce concrete action rather than symbolic gestures. Previous international gatherings have sometimes resulted in ambitious declarations that proved difficult to implement.
      </p>

      <p className="font-serif leading-relaxed">
        Nevertheless, organizers remain optimistic that the current economic climate creates unique incentives for substantive cooperation. The conference continues through Sunday, with major policy announcements expected in the coming days.
      </p>
    </div>
  </article>
);

// Tech Article (Wired) - Minimalist, clean, modern
const TechArticle = ({ publisherName, userName, onNameHover, onNameLeave, highlightColor }: ArticleProps) => (
  <article className="max-w-4xl mx-auto px-4 py-16 bg-white">
    {/* Minimal Header */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold tracking-tight mb-8">{publisherName}</h3>
      <div className="h-px bg-black w-full"></div>
    </div>

    {/* Clean, Minimal Header */}
    <header className="mb-16">
      <p className="text-sm font-mono uppercase tracking-widest mb-6">Technology</p>
      <h1 className="text-6xl font-bold leading-none mb-8 tracking-tight">
        The Algorithm That Changed Everything
      </h1>
      <p className="text-2xl text-gray-600 font-light leading-relaxed mb-8">
        How a breakthrough in machine learning is reshaping the boundaries of artificial intelligence
      </p>
      <div className="flex items-center gap-6 text-sm font-mono">
        <span>ALEX RIVERA</span>
        <span>/</span>
        <time>03.15.24</time>
        <span>/</span>
        <span>8 MIN READ</span>
      </div>
    </header>

    {/* Clean Content */}
    <div className="space-y-8 text-lg leading-relaxed">
      <p className="text-2xl font-light leading-relaxed">
        In a nondescript laboratory, researchers have developed an algorithm that fundamentally alters our understanding of machine learning—and with it, the future of artificial intelligence itself. The breakthrough came from collaboration with AI researcher <HighlightedName name={userName} onHover={onNameHover} onLeave={onNameLeave} />, whose insights proved crucial to the project's success.
      </p>

      <div className="my-12 h-px bg-gray-200"></div>

      <p>
        The breakthrough came unexpectedly. What started as an incremental improvement to existing neural network architectures revealed something far more significant: a new approach to how machines process and understand information.
      </p>

      <p>
        Traditional machine learning models require vast amounts of data and computing power. This new algorithm achieves comparable—and in some cases superior—results with a fraction of the resources. The implications are staggering.
      </p>

      <div className="bg-black text-white p-8 my-12 font-mono text-sm">
        <div className="mb-2 text-gray-400">// Core principle</div>
        <div>efficiency × adaptability = breakthrough</div>
      </div>

      <p>
        "We're not just talking about incremental improvements," explains Dr. Sarah Chen, lead researcher on the project. "This represents a fundamental shift in how we approach artificial intelligence."
      </p>

      <p>
        The technology has already attracted attention from major tech companies, though the research team remains focused on publication and peer review rather than immediate commercialization. Their goal is to establish a solid scientific foundation before broader application.
      </p>

      <div className="my-12 h-px bg-gray-200"></div>

      <p>
        As the AI landscape continues to evolve at breakneck speed, this development suggests we may be entering a new phase—one where efficiency and elegance matter as much as raw computational power.
      </p>

      <p className="text-sm text-gray-500 italic">
        The full research paper will be published in Nature next month.
      </p>
    </div>
  </article>
);

export default ArticlePreview;
