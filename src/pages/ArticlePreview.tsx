import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
  category: string;
  headerFont: string;
  bodyFont: string;
  accentColor: string;
  layout: "modern" | "classic" | "minimal" | "bold";
};

const publishers: Record<string, PublisherStyle> = {
  "el-pais": {
    name: "El País",
    category: "General News",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-blue-600",
    layout: "classic",
  },
  "el-mundo": {
    name: "El Mundo",
    category: "General News",
    headerFont: "font-serif",
    bodyFont: "font-sans",
    accentColor: "text-red-600",
    layout: "classic",
  },
  "la-vanguardia": {
    name: "La Vanguardia",
    category: "General News",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-blue-700",
    layout: "classic",
  },
  "the-guardian": {
    name: "The Guardian",
    category: "General News",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-blue-500",
    layout: "modern",
  },
  "huffpost": {
    name: "Huffington Post",
    category: "General News",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-green-600",
    layout: "bold",
  },
  "politico": {
    name: "Politico",
    category: "General News",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-red-500",
    layout: "modern",
  },
  "natgeo": {
    name: "National Geographic",
    category: "Science & Nature",
    headerFont: "font-serif",
    bodyFont: "font-sans",
    accentColor: "text-yellow-500",
    layout: "bold",
  },
  "muy-interesante": {
    name: "Muy Interesante",
    category: "Science & Nature",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-purple-600",
    layout: "modern",
  },
  "wired": {
    name: "Wired",
    category: "Science & Nature",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-black",
    layout: "minimal",
  },
  "quartz": {
    name: "Quartz",
    category: "Science & Nature",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-orange-500",
    layout: "minimal",
  },
  "techcrunch": {
    name: "TechCrunch",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-green-500",
    layout: "modern",
  },
  "ars-technica": {
    name: "Ars Technica",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-orange-600",
    layout: "classic",
  },
  "gizmodo": {
    name: "Gizmodo",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-blue-600",
    layout: "bold",
  },
  "xataka": {
    name: "Xataka",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-teal-600",
    layout: "modern",
  },
  "hipertextual": {
    name: "Hipertextual",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-purple-500",
    layout: "modern",
  },
  "smashing": {
    name: "Smashing Magazine",
    category: "Technology",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-red-600",
    layout: "minimal",
  },
  "vogue": {
    name: "Vogue",
    category: "Lifestyle",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-black",
    layout: "bold",
  },
  "vanity-fair": {
    name: "Vanity Fair",
    category: "Lifestyle",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-red-700",
    layout: "classic",
  },
  "esquire": {
    name: "Esquire",
    category: "Lifestyle",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-gray-800",
    layout: "classic",
  },
  "vice": {
    name: "Vice",
    category: "Lifestyle",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-black",
    layout: "bold",
  },
  "pitchfork": {
    name: "Pitchfork",
    category: "Lifestyle",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-yellow-400",
    layout: "minimal",
  },
  "marca": {
    name: "Marca",
    category: "Sports",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-red-600",
    layout: "bold",
  },
  "motorpasion": {
    name: "Motorpasion",
    category: "Sports",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-orange-600",
    layout: "modern",
  },
  "medium": {
    name: "Medium",
    category: "Blogs",
    headerFont: "font-serif",
    bodyFont: "font-serif",
    accentColor: "text-black",
    layout: "minimal",
  },
  "minimalist-baker": {
    name: "Minimalist Baker",
    category: "Blogs",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-green-700",
    layout: "minimal",
  },
  "wordpress": {
    name: "WordPress Blog",
    category: "Blogs",
    headerFont: "font-sans",
    bodyFont: "font-sans",
    accentColor: "text-blue-500",
    layout: "classic",
  },
};

const ArticlePreview = () => {
  const navigate = useNavigate();
  const [selectedPublisher, setSelectedPublisher] = useState<string>("el-pais");
  const style = publishers[selectedPublisher];

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
                  <SelectLabel>General News & Newspapers</SelectLabel>
                  <SelectItem value="el-pais">El País</SelectItem>
                  <SelectItem value="el-mundo">El Mundo</SelectItem>
                  <SelectItem value="la-vanguardia">La Vanguardia</SelectItem>
                  <SelectItem value="the-guardian">The Guardian</SelectItem>
                  <SelectItem value="huffpost">Huffington Post</SelectItem>
                  <SelectItem value="politico">Politico</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Science, Knowledge & Nature</SelectLabel>
                  <SelectItem value="natgeo">National Geographic</SelectItem>
                  <SelectItem value="muy-interesante">Muy Interesante</SelectItem>
                  <SelectItem value="wired">Wired</SelectItem>
                  <SelectItem value="quartz">Quartz</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Technology & Business</SelectLabel>
                  <SelectItem value="techcrunch">TechCrunch</SelectItem>
                  <SelectItem value="ars-technica">Ars Technica</SelectItem>
                  <SelectItem value="gizmodo">Gizmodo</SelectItem>
                  <SelectItem value="xataka">Xataka</SelectItem>
                  <SelectItem value="hipertextual">Hipertextual</SelectItem>
                  <SelectItem value="smashing">Smashing Magazine</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Lifestyle, Fashion & Culture</SelectLabel>
                  <SelectItem value="vogue">Vogue</SelectItem>
                  <SelectItem value="vanity-fair">Vanity Fair</SelectItem>
                  <SelectItem value="esquire">Esquire</SelectItem>
                  <SelectItem value="vice">Vice</SelectItem>
                  <SelectItem value="pitchfork">Pitchfork</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Sports & Automotive</SelectLabel>
                  <SelectItem value="marca">Marca</SelectItem>
                  <SelectItem value="motorpasion">Motorpasion</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Independent / Blogs</SelectLabel>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="minimalist-baker">Minimalist Baker</SelectItem>
                  <SelectItem value="wordpress">WordPress Blog</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Publisher Header */}
        <div className="mb-8 pb-4 border-b">
          <h3 className={`text-2xl font-bold ${style.accentColor} ${style.headerFont}`}>
            {style.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{style.category}</p>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${style.headerFont} leading-tight`}>
            The Future of Innovation: How Technology is Reshaping Our World
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">By Jane Doe</span>
            <span>•</span>
            <time>March 15, 2024</time>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-8">
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Featured Image</span>
          </div>
          <figcaption className="text-sm text-gray-500 mt-2 italic">
            A glimpse into the technological revolution transforming industries worldwide
          </figcaption>
        </figure>

        {/* Article Body */}
        <div className={`prose prose-lg max-w-none ${style.bodyFont}`}>
          <p className="text-lg leading-relaxed mb-6">
            In an era where artificial intelligence seamlessly integrates into our daily routines and quantum computing promises to solve problems once deemed impossible, we stand at the precipice of a technological revolution that will fundamentally alter the fabric of human existence.
          </p>

          <p className="leading-relaxed mb-6">
            The convergence of breakthrough technologies—from machine learning algorithms that predict our needs before we articulate them, to biotechnology that extends human capabilities beyond natural limits—is creating a world that would have seemed like pure science fiction just a decade ago.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-4 ${style.headerFont}`}>
            The AI Revolution
          </h2>

          <p className="leading-relaxed mb-6">
            Artificial intelligence has moved beyond the realm of research laboratories and into every corner of our lives. From the moment we wake up to smart alarms that adjust to our sleep patterns, to the personalized recommendations that guide our entertainment choices, AI has become an invisible yet omnipresent force.
          </p>

          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
            "The question is not whether AI will change our world, but how we will adapt to a world fundamentally transformed by intelligent machines."
          </blockquote>

          <p className="leading-relaxed mb-6">
            Major corporations and startups alike are racing to develop more sophisticated AI systems. These technologies are not just automating tasks—they're augmenting human creativity, accelerating scientific discovery, and opening new frontiers in fields ranging from medicine to space exploration.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-4 ${style.headerFont}`}>
            Sustainable Innovation
          </h2>

          <p className="leading-relaxed mb-6">
            As we embrace these technological advances, a parallel movement emphasizes sustainability and ethical development. Green technologies are no longer alternative solutions but mainstream imperatives. Solar panels that double as building materials, batteries that store renewable energy efficiently, and carbon capture systems that reverse climate damage represent just the beginning.
          </p>

          <p className="leading-relaxed mb-6">
            The most exciting innovations emerge at the intersection of different disciplines—where biotechnology meets computer science, where nanotechnology enables new materials, and where our understanding of the human brain informs the next generation of computing architectures.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-4 ${style.headerFont}`}>
            Looking Ahead
          </h2>

          <p className="leading-relaxed mb-6">
            The future promises even more dramatic transformations. Quantum computers could revolutionize everything from drug discovery to financial modeling. Brain-computer interfaces might allow direct communication between minds and machines. And advances in space technology could make humanity a truly multi-planetary species.
          </p>

          <p className="leading-relaxed mb-6">
            Yet with these possibilities come profound questions about privacy, equality, and the very nature of human identity. As we build this future, we must ensure that innovation serves humanity's best interests, creating a world that is not only more technologically advanced but also more equitable and sustainable.
          </p>

          <p className="leading-relaxed">
            The transformation is already underway. How we navigate this pivotal moment will determine not just the shape of technology, but the future of civilization itself.
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
            <div>
              <h3 className="font-bold text-lg">Jane Doe</h3>
              <p className="text-gray-600 text-sm mt-1">
                Technology correspondent covering innovation, AI, and the future of computing. 
                Based in San Francisco with a background in computer science and journalism.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePreview;
