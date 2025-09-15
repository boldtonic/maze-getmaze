import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Twitter, Instagram, Youtube, Linkedin, ExternalLink, Music, Play, ShoppingBag, Heart, MessageCircle, RefreshCw, CheckCircle, Upload, ImagePlus, BadgeCheck, Plus, Link } from "lucide-react";
import mazeIsotype from "@/assets/maze-isotype.png";
import { useState, useRef } from "react";
interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}
interface MazePreviewProps {
  brandMode: boolean;
  coverImage: string | null;
  onImageUpload: () => void;
  onAddLink: () => void;
  canAddLink: boolean;
  profile: {
    displayName: string;
    title: string;
    bio: string;
  };
  links: Link[];
  style?: {
    backgroundColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: number;
    theme: string;
    orientation: 'horizontal' | 'vertical';
  };
}
export function MazePreview({
  brandMode,
  coverImage,
  onImageUpload,
  onAddLink,
  canAddLink,
  profile,
  links,
  style
}: MazePreviewProps) {
  const articles = [{
    fullText: `The future of web design is rapidly evolving with new technologies and innovative approaches. As Jane Doe noted in her recent conference talk, minimalism continues to dominate the industry landscape. Her insights on user experience have influenced countless designers worldwide.

Modern web development has fundamentally transformed how we approach user interface design. The shift towards component-based architectures has revolutionized the way teams collaborate and maintain consistency across digital products. Design systems have emerged as the backbone of scalable user experiences, providing a unified language between designers and developers.

Component libraries now serve as living documentation, enabling rapid prototyping and consistent implementation. The integration of design tokens has further streamlined the process, allowing teams to maintain visual coherence while adapting to different platforms and accessibility requirements. This systematic approach reduces technical debt and accelerates development cycles. Cross-functional collaboration has become more efficient through shared design principles and reusable components.`,
    highlightText: "The future of web design is rapidly evolving with new technologies and innovative approaches. As",
    mention: "Jane Doe",
    continuation: "noted in her recent conference talk, minimalism continues to dominate the industry landscape. Her insights on user experience have influenced countless designers worldwide."
  }, {
    fullText: `Sustainable design practices are becoming essential in modern development. Industry expert Jane Doe advocates for eco-friendly design principles that reduce digital carbon footprints. Her green design framework has saved companies millions in energy costs.

The environmental impact of digital products has become a critical consideration for forward-thinking organizations. By implementing sustainable design methodologies, companies can significantly reduce their carbon footprint while maintaining exceptional user experiences. This approach encompasses everything from optimized code to energy-efficient hosting solutions.

Green design principles extend beyond environmental benefits, often resulting in improved performance and reduced operational costs. Organizations adopting these practices report faster load times, better user engagement, and substantial savings in infrastructure expenses. The methodology has become a competitive advantage in today's environmentally conscious market.

Leading tech companies have embraced these frameworks as standard practice, demonstrating that sustainability and innovation can coexist seamlessly in modern product development. The shift towards renewable energy in data centers has further amplified the impact of these initiatives, creating a compound effect that benefits both the environment and business operations.

Energy-efficient design patterns have evolved to include everything from lazy loading strategies to optimized asset delivery systems. These techniques not only reduce server load but also improve user experience through faster page loads and reduced data consumption. The correlation between performance and sustainability has become increasingly clear in modern web development practices.

The adoption of sustainable design methodologies has also influenced hiring practices within the tech industry. Companies are increasingly seeking designers and developers who understand the environmental implications of their work and can implement solutions that balance user needs with ecological responsibility. This trend has created new career opportunities and specialized roles focused on sustainable technology practices.`,
    highlightText: "Sustainable design practices are becoming essential in modern development. Industry expert",
    mention: "Jane Doe",
    continuation: "advocates for eco-friendly design principles that reduce digital carbon footprints. Her green design framework has saved companies millions in energy costs."
  }, {
    fullText: `Artificial intelligence is transforming how we approach creative workflows. Leading designer Jane Doe recently published groundbreaking research on AI-assisted design tools. Her methodology has been adopted by major tech companies across Silicon Valley.

The integration of AI into design processes has revolutionized traditional workflows, enabling designers to focus on strategic thinking while automation handles repetitive tasks. Machine learning algorithms now assist with everything from color palette generation to layout optimization, significantly reducing time-to-market for digital products.

This technological evolution has democratized design capabilities, allowing smaller teams to produce work previously requiring extensive resources. The collaborative relationship between human creativity and artificial intelligence has opened new possibilities for innovation and experimentation in the design field.

Industry leaders predict that AI-assisted design will become the standard within the next few years, fundamentally changing how we approach creative problem-solving. The emergence of generative design tools has particularly excited the creative community, offering unprecedented possibilities for exploration and iteration.

Natural language interfaces have made these powerful tools accessible to designers without technical backgrounds. Voice-activated design commands and conversational interfaces are becoming commonplace in modern design software, breaking down barriers between creative intent and technical implementation.

The ethical implications of AI in design have also sparked important conversations within the industry. Questions about originality, authorship, and the role of human creativity in an AI-assisted world continue to shape the development of these technologies. Professional organizations are working to establish guidelines that preserve human agency while embracing technological advancement.`,
    highlightText: "Artificial intelligence is transforming how we approach creative workflows. Leading designer",
    mention: "Jane Doe",
    continuation: "recently published groundbreaking research on AI-assisted design tools. Her methodology has been adopted by major tech companies across Silicon Valley."
  }, {
    fullText: `Remote design collaboration has fundamentally changed creative team dynamics. Thought leader Jane Doe developed innovative workflows that enable seamless distributed design processes. Her remote design methodology is taught in universities worldwide.

The shift to distributed teams has challenged traditional design practices, requiring new tools and processes to maintain creative collaboration. Digital whiteboarding, real-time co-editing, and asynchronous feedback systems have become essential components of modern design workflows.

These collaborative approaches have proven to enhance creativity by bringing together diverse perspectives from global talent pools. Teams report increased innovation and faster iteration cycles when utilizing properly structured remote design processes.

The methodology has evolved beyond pandemic necessity into a preferred working model, offering flexibility and access to worldwide expertise while maintaining design quality and team cohesion. Cloud-based design platforms now offer sophisticated version control and branching capabilities that rival traditional software development tools.

Time zone management has become a critical skill for remote design teams. Asynchronous handoffs and structured documentation practices ensure that progress continues around the clock, maximizing productivity while respecting work-life balance. This approach has proven particularly effective for complex projects requiring continuous iteration.

Cultural considerations have also shaped the evolution of remote design practices. Teams spanning multiple continents have developed new protocols for inclusive collaboration, ensuring that diverse perspectives are captured and valued throughout the design process. These practices have enriched the creative output of distributed teams significantly.`,
    highlightText: "Remote design collaboration has fundamentally changed creative team dynamics. Thought leader",
    mention: "Jane Doe",
    continuation: "developed innovative workflows that enable seamless distributed design processes. Her remote design methodology is taught in universities worldwide."
  }, {
    fullText: `The rise of micro-interactions in user interfaces has revolutionized digital experiences. Pioneer Jane Doe developed several animation techniques that are now industry standards. Her work at major startups has redefined how users interact with digital products.

These subtle design elements provide crucial feedback to users, guiding them through complex interfaces while maintaining engagement. Well-crafted micro-interactions can transform mundane tasks into delightful experiences, significantly improving user satisfaction and retention rates.

The psychology behind effective micro-interactions involves understanding user expectations and providing appropriate visual responses. This attention to detail has become a differentiating factor for successful digital products in competitive markets.

Modern design systems now include comprehensive micro-interaction libraries, enabling consistent implementation across platforms while maintaining the nuanced behaviors that enhance user experience. Motion design has evolved from decorative elements to functional components that serve specific user needs and business objectives.

Performance optimization for micro-interactions has become increasingly sophisticated, with designers and developers working together to create smooth animations that work across devices and connection speeds. The balance between visual appeal and technical performance requires careful consideration of timing, easing, and resource usage.

Accessibility in micro-interactions has gained significant attention, with new guidelines ensuring that animated elements enhance rather than hinder the experience for users with different abilities. Respect for user preferences, including reduced motion settings, has become a standard consideration in modern interaction design practices.`,
    highlightText: "The rise of micro-interactions in user interfaces has revolutionized digital experiences. Pioneer",
    mention: "Jane Doe",
    continuation: "developed several animation techniques that are now industry standards. Her work at major startups has redefined how users interact with digital products."
  }];
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const currentArticle = articles[currentArticleIndex];
  const refreshArticle = () => {
    setCurrentArticleIndex(prev => (prev + 1) % articles.length);
  };
  const getLinkByIndex = (index: number) => {
    return links[index] || null;
  };
  const getDefaultThumbnail = (url: string) => {
    // Simple domain-based thumbnail logic
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop';
    }
    if (url.includes('instagram.com')) {
      return 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop';
    }
    if (url.includes('twitter.com') || url.includes('x.com')) {
      return 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop';
    }
    // Default gradient for other links
    return null;
  };
  // Helper function to determine if a color is dark
  const isColorDark = (color: string) => {
    if (!color) return false;
    
    // Handle RGB format
    if (color.startsWith('rgb')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
      }
    }
    
    // Handle hex format
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

  return <div className="space-y-6">
      {/* Mention Effect Preview with Card Overlay */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-5 overflow-hidden min-h-[550px] flex items-center justify-center">
        {/* Simulated website content with blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50 -z-10" />
          

        {/* Full article text with highlighted mention */}
        <div className="absolute top-5 left-5 right-5">
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              {currentArticle.highlightText}{" "}
              <span className="px-1 rounded font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {currentArticle.mention}
              </span>
              {" "}{currentArticle.continuation}
            </p>
            {currentArticle.fullText.split('\n\n').slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>

        {/* Article Refresh Button - Lower Right Corner */}
        <div className="absolute bottom-5 right-5">
          <button 
            onClick={refreshArticle} 
            className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <RefreshCw className="w-5 h-5 text-gray-700" strokeWidth={2} />
          </button>
        </div>

        {/* Card floating over the blurred background */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2" style={{ fontFamily: style?.fontFamily || 'Inter' }}>
          <div className={style?.orientation === 'vertical' ? "w-[236px] h-[420px]" : "w-[420px] h-[236px]"}>
            <Card 
              className="overflow-hidden border border-border/50 h-full w-full" 
              style={{
                boxShadow: '0 0 80px 20px rgba(0, 0, 0, 0.2)',
                borderRadius: `${style?.borderRadius || 16}px`
              }}
            >
              <div 
                className="p-3 h-full"
                style={{
                  backgroundColor: style?.backgroundColor || 'white',
                  color: textColor
                }}
              >
                {/* Bento Grid Layout */}
                <div className={`grid gap-2 h-full ${style?.orientation === 'vertical' ? 'grid-cols-2 grid-rows-4' : 'grid-cols-4 grid-rows-2'}`}>
                  {/* Drag Drop Zones for visual feedback */}
                  <div className={`absolute inset-0 pointer-events-none gap-2 p-3 ${style?.orientation === 'vertical' ? 'grid grid-cols-2 grid-rows-4' : 'grid grid-cols-4 grid-rows-2'}`}>
                    {style?.orientation === 'vertical' ? (
                      <>
                        {/* Vertical layout drop zones */}
                        <div className="col-span-1 row-span-1 col-start-2 row-start-2 rounded-xl border-2 border-dashed border-transparent"></div>
                        <div className="col-span-1 row-span-1 col-start-1 row-start-3 rounded-xl border-2 border-dashed border-transparent"></div>
                        <div className="col-span-2 row-span-1 col-start-1 row-start-4 rounded-xl border-2 border-dashed border-transparent"></div>
                      </>
                    ) : (
                      <>
                        {/* Horizontal layout drop zones */}
                        <div className="col-span-1 row-span-1 col-start-3 row-start-1 rounded-xl border-2 border-dashed border-transparent"></div>
                        <div className="col-span-1 row-span-1 col-start-4 row-start-1 rounded-xl border-2 border-dashed border-transparent"></div>
                        <div className="col-span-2 row-span-1 col-start-3 row-start-2 rounded-xl border-2 border-dashed border-transparent"></div>
                      </>
                    )}
                  </div>
                  {/* Combined A1+B1 - Cover Image with Upload */}
                  <div className={`bg-gradient-to-br from-blue-400/20 to-indigo-500/20 relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-sm ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1' : 'col-span-2 row-span-1'}`}
                    style={{ 
                      borderRadius: `${(style?.borderRadius || 16) * 0.75}px`
                    }}
                    onClick={onImageUpload}>
                    {coverImage ?
                  // Show uploaded image
                  <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" /> :
                  // Show upload placeholder
                  <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <ImagePlus className="w-5 h-5 mx-auto mb-1" strokeWidth={2} />
                            <span className="text-label-large font-medium text-base">Add Cover</span>
                          </div>
                        </div>
                      </>}
                  </div>

                  {/* Profile Section A4 - Transparent with profile info */}
                  <div className={`rounded-xl flex flex-col justify-center p-3 text-left ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1 col-start-1 row-start-2' : 'col-span-2 row-span-1 row-start-2'}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <span 
                        className="text-title-medium font-semibold"
                        style={{ 
                          color: textColor
                        }}
                      >
                        {profile.displayName}
                      </span>
                      <BadgeCheck className="w-4 h-4 text-blue-500" strokeWidth={2} />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-body-small font-semibold" style={{ color: mutedTextColor }}>{profile.title}</p>
                    </div>
                    <p className="text-body-small leading-tight" style={{ color: mutedTextColor }}>{profile.bio}</p>
                  </div>

                  {/* Square A2 - Top Second */}
                  <div className={`overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-sm ${style?.orientation === 'vertical' ? 'col-span-1 row-span-1 col-start-1 row-start-3' : 'col-span-1 row-span-1'}`}
                    style={{ borderRadius: `${(style?.borderRadius || 16) * 0.75}px` }}>
                    {(() => {
                    const link = getLinkByIndex(0);
                    if (link) {
                      const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                      return <>
                            {thumbnail ? <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-300" /> : <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500" />}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-semibold text-label-medium text-center px-1">{link.title}</span>
                            </div>
                          </>;
                    }
                    return <div className="bg-gradient-to-br from-emerald-400/20 to-teal-500/20 h-full flex items-center justify-center transition-all duration-200 cursor-pointer" onClick={canAddLink ? onAddLink : undefined}>
                          {canAddLink ? <div className="text-center text-muted-foreground">
                              <Link className="w-5 h-5 mx-auto mb-1" strokeWidth={2} />
                              <span className="text-label-large font-medium text-base">Add Link</span>
                            </div> : <span className="text-muted-foreground text-xs">Link 1</span>}
                        </div>;
                  })()}
                  </div>

                  {/* Square A3 - Made with Maze or Second Link */}
                  <div className={`overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-sm ${style?.orientation === 'vertical' ? 'col-span-1 row-span-1 col-start-2 row-start-3' : 'col-span-1 row-span-1'}`}
                    style={{ borderRadius: `${(style?.borderRadius || 16) * 0.75}px` }}>
                    {(() => {
                    const link = getLinkByIndex(1);
                    if (link && brandMode) {
                      const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                      return <>
                            {thumbnail ? <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-300" /> : <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500" />}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-semibold text-label-medium text-center px-1">{link.title}</span>
                            </div>
                          </>;
                    }
                    // Always show "Made with Maze" when no second link or not in brand mode
                    return <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-2 text-center">
                          <div className="text-gray-700 text-label-medium font-medium mb-0.5">Made with</div>
                          <div className="text-gray-700 text-label-medium font-bold">Maze</div>
                          <div className="text-gray-600 text-body-small opacity-70 mt-0.5">getmaze.ai</div>
                        </div>;
                  })()}
                  </div>


                  {/* Square B3 - Bottom Right (spans 2 columns) */}
                  <div className={`rounded-xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-sm ${style?.orientation === 'vertical' ? 'col-span-2 row-span-1 col-start-1 row-start-4' : 'col-span-2 row-span-1'}`}>
                    {(() => {
                    const link = brandMode ? getLinkByIndex(2) : getLinkByIndex(1);
                    if (link) {
                      const thumbnail = link.thumbnail || getDefaultThumbnail(link.url);
                      return <>
                            {thumbnail ? <img src={thumbnail} alt={link.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-300" /> : <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600" />}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-semibold text-title-small text-center px-2">{link.title}</span>
                            </div>
                          </>;
                    }
                    return <div className="bg-gradient-to-r from-rose-400/20 to-pink-600/20 h-full flex items-center justify-center transition-all duration-200 cursor-pointer" onClick={canAddLink ? onAddLink : undefined}>
                          {canAddLink ? <div className="text-center text-muted-foreground">
                              <Link className="w-5 h-5 mx-auto mb-1" strokeWidth={2} />
                              <span className="text-label-large font-medium text-base">Add Link</span>
                            </div> : <span className="text-muted-foreground text-lg">Link {brandMode ? '3' : '2'}</span>}
                        </div>;
                  })()}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}