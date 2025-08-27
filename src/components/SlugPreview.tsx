import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ExternalLink,
  Music,
  Play,
  ShoppingBag,
  Heart,
  MessageCircle,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

interface SlugPreviewProps {
  brandMode: boolean;
}

export function SlugPreview({ brandMode }: SlugPreviewProps) {
  const articles = [
    {
      fullText: `The future of web design is rapidly evolving with new technologies and innovative approaches. As Jane Doe noted in her recent conference talk, minimalism continues to dominate the industry landscape. Her insights on user experience have influenced countless designers worldwide.

Modern web development has fundamentally transformed how we approach user interface design. The shift towards component-based architectures has revolutionized the way teams collaborate and maintain consistency across digital products. Design systems have emerged as the backbone of scalable user experiences, providing a unified language between designers and developers.

Component libraries now serve as living documentation, enabling rapid prototyping and consistent implementation. The integration of design tokens has further streamlined the process, allowing teams to maintain visual coherence while adapting to different platforms and accessibility requirements. This systematic approach reduces technical debt and accelerates development cycles significantly.

Cross-functional collaboration has become more efficient through shared design principles and reusable components. Teams can now iterate faster while maintaining brand consistency across multiple touchpoints. The evolution of design tools has also played a crucial role in this transformation, with platforms offering real-time collaboration features that mirror the needs of distributed teams.

The integration of artificial intelligence in design workflows has opened new possibilities for creative exploration. Machine learning algorithms can now assist with everything from color palette generation to layout optimization, allowing designers to focus on strategic thinking rather than repetitive tasks. This technological advancement has democratized design capabilities across organizations of all sizes.

Furthermore, the rise of design systems as a service has created new opportunities for consistency at scale. Companies can now leverage shared component libraries that maintain brand coherence across multiple products and platforms. This approach has proven particularly valuable for organizations managing complex digital ecosystems with numerous stakeholders and varied requirements.

The emergence of no-code and low-code platforms has further accelerated this transformation, enabling non-technical team members to contribute meaningfully to the design process. These tools bridge the gap between creative vision and technical implementation, fostering greater collaboration and reducing the time between concept and execution. Organizations report significant improvements in project velocity when these platforms are integrated into their workflows.

Accessibility considerations have also evolved beyond compliance requirements to become integral design principles. Modern design systems incorporate inclusive design patterns from the ground up, ensuring that digital experiences work seamlessly for users of all abilities. This shift has not only improved user satisfaction but has also opened new market opportunities for organizations committed to universal design principles.`,
      highlightText: "The future of web design is rapidly evolving with new technologies and innovative approaches. As",
      mention: "Jane Doe",
      continuation: "noted in her recent conference talk, minimalism continues to dominate the industry landscape. Her insights on user experience have influenced countless designers worldwide."
    },
    {
      fullText: `Sustainable design practices are becoming essential in modern development. Industry expert Jane Doe advocates for eco-friendly design principles that reduce digital carbon footprints. Her green design framework has saved companies millions in energy costs.

The environmental impact of digital products has become a critical consideration for forward-thinking organizations. By implementing sustainable design methodologies, companies can significantly reduce their carbon footprint while maintaining exceptional user experiences. This approach encompasses everything from optimized code to energy-efficient hosting solutions.

Green design principles extend beyond environmental benefits, often resulting in improved performance and reduced operational costs. Organizations adopting these practices report faster load times, better user engagement, and substantial savings in infrastructure expenses. The methodology has become a competitive advantage in today's environmentally conscious market.

Leading tech companies have embraced these frameworks as standard practice, demonstrating that sustainability and innovation can coexist seamlessly in modern product development. The shift towards renewable energy in data centers has further amplified the impact of these initiatives, creating a compound effect that benefits both the environment and business operations.

Energy-efficient design patterns have evolved to include everything from lazy loading strategies to optimized asset delivery systems. These techniques not only reduce server load but also improve user experience through faster page loads and reduced data consumption. The correlation between performance and sustainability has become increasingly clear in modern web development practices.

The adoption of sustainable design methodologies has also influenced hiring practices within the tech industry. Companies are increasingly seeking designers and developers who understand the environmental implications of their work and can implement solutions that balance user needs with ecological responsibility. This trend has created new career opportunities and specialized roles focused on sustainable technology practices.`,
      highlightText: "Sustainable design practices are becoming essential in modern development. Industry expert",
      mention: "Jane Doe",
      continuation: "advocates for eco-friendly design principles that reduce digital carbon footprints. Her green design framework has saved companies millions in energy costs."
    },
    {
      fullText: `Artificial intelligence is transforming how we approach creative workflows. Leading designer Jane Doe recently published groundbreaking research on AI-assisted design tools. Her methodology has been adopted by major tech companies across Silicon Valley.

The integration of AI into design processes has revolutionized traditional workflows, enabling designers to focus on strategic thinking while automation handles repetitive tasks. Machine learning algorithms now assist with everything from color palette generation to layout optimization, significantly reducing time-to-market for digital products.

This technological evolution has democratized design capabilities, allowing smaller teams to produce work previously requiring extensive resources. The collaborative relationship between human creativity and artificial intelligence has opened new possibilities for innovation and experimentation in the design field.

Industry leaders predict that AI-assisted design will become the standard within the next few years, fundamentally changing how we approach creative problem-solving. The emergence of generative design tools has particularly excited the creative community, offering unprecedented possibilities for exploration and iteration.

Natural language interfaces have made these powerful tools accessible to designers without technical backgrounds. Voice-activated design commands and conversational interfaces are becoming commonplace in modern design software, breaking down barriers between creative intent and technical implementation.

The ethical implications of AI in design have also sparked important conversations within the industry. Questions about originality, authorship, and the role of human creativity in an AI-assisted world continue to shape the development of these technologies. Professional organizations are working to establish guidelines that preserve human agency while embracing technological advancement.`,
      highlightText: "Artificial intelligence is transforming how we approach creative workflows. Leading designer",
      mention: "Jane Doe",
      continuation: "recently published groundbreaking research on AI-assisted design tools. Her methodology has been adopted by major tech companies across Silicon Valley."
    },
    {
      fullText: `Remote design collaboration has fundamentally changed creative team dynamics. Thought leader Jane Doe developed innovative workflows that enable seamless distributed design processes. Her remote design methodology is taught in universities worldwide.

The shift to distributed teams has challenged traditional design practices, requiring new tools and processes to maintain creative collaboration. Digital whiteboarding, real-time co-editing, and asynchronous feedback systems have become essential components of modern design workflows.

These collaborative approaches have proven to enhance creativity by bringing together diverse perspectives from global talent pools. Teams report increased innovation and faster iteration cycles when utilizing properly structured remote design processes.

The methodology has evolved beyond pandemic necessity into a preferred working model, offering flexibility and access to worldwide expertise while maintaining design quality and team cohesion. Cloud-based design platforms now offer sophisticated version control and branching capabilities that rival traditional software development tools.

Time zone management has become a critical skill for remote design teams. Asynchronous handoffs and structured documentation practices ensure that progress continues around the clock, maximizing productivity while respecting work-life balance. This approach has proven particularly effective for complex projects requiring continuous iteration.

Cultural considerations have also shaped the evolution of remote design practices. Teams spanning multiple continents have developed new protocols for inclusive collaboration, ensuring that diverse perspectives are captured and valued throughout the design process. These practices have enriched the creative output of distributed teams significantly.`,
      highlightText: "Remote design collaboration has fundamentally changed creative team dynamics. Thought leader",
      mention: "Jane Doe",
      continuation: "developed innovative workflows that enable seamless distributed design processes. Her remote design methodology is taught in universities worldwide."
    },
    {
      fullText: `The rise of micro-interactions in user interfaces has revolutionized digital experiences. Pioneer Jane Doe developed several animation techniques that are now industry standards. Her work at major startups has redefined how users interact with digital products.

These subtle design elements provide crucial feedback to users, guiding them through complex interfaces while maintaining engagement. Well-crafted micro-interactions can transform mundane tasks into delightful experiences, significantly improving user satisfaction and retention rates.

The psychology behind effective micro-interactions involves understanding user expectations and providing appropriate visual responses. This attention to detail has become a differentiating factor for successful digital products in competitive markets.

Modern design systems now include comprehensive micro-interaction libraries, enabling consistent implementation across platforms while maintaining the nuanced behaviors that enhance user experience. Motion design has evolved from decorative elements to functional components that serve specific user needs and business objectives.

Performance optimization for micro-interactions has become increasingly sophisticated, with designers and developers working together to create smooth animations that work across devices and connection speeds. The balance between visual appeal and technical performance requires careful consideration of timing, easing, and resource usage.

Accessibility in micro-interactions has gained significant attention, with new guidelines ensuring that animated elements enhance rather than hinder the experience for users with different abilities. Respect for user preferences, including reduced motion settings, has become a standard consideration in modern interaction design practices.`,
      highlightText: "The rise of micro-interactions in user interfaces has revolutionized digital experiences. Pioneer",
      mention: "Jane Doe",
      continuation: "developed several animation techniques that are now industry standards. Her work at major startups has redefined how users interact with digital products."
    }
  ];

  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const currentArticle = articles[currentArticleIndex];

  const refreshArticle = () => {
    setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
  };

  return (
    <div className="space-y-6">
      {/* Mention Effect Preview with Card Overlay */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 overflow-hidden min-h-[500px]">
        {/* Simulated website content with blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50 -z-10" />
          
        {/* Refresh Button */}
        <div className="absolute top-4 right-6">
          <Button
            size="sm"
            variant="outline"
            onClick={refreshArticle}
            className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        {/* Full article text with highlighted mention */}
        <div className="absolute top-20 left-6 right-6 max-h-[310px] overflow-y-auto">
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              {currentArticle.highlightText}{" "}
              <span 
                className="px-1 rounded font-medium"
                style={{ backgroundColor: "hsl(var(--accent))", color: "white" }}
              >
                {currentArticle.mention}
              </span>
              {" "}{currentArticle.continuation}
            </p>
            {currentArticle.fullText.split('\n\n').slice(1).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Card floating over the blurred background */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
          <div className="w-[420px] h-[236px]">
            <Card 
              className="overflow-hidden bg-background border border-border/50 rounded-2xl h-full w-full"
              style={{ boxShadow: '0 0 80px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <CardContent className="p-3 h-full">
                {/* Bento Grid Layout - Horizontal */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
                  {/* Profile Section - Left */}
                  <div className="col-span-1 row-span-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary mb-2 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <h3 className="text-xs font-semibold text-foreground text-center leading-tight">Jane Doe</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Image 1 - Top */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>

                  {/* Image 2 - Top */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>

                  {/* Large Image - Top Right */}
                  <div className="col-span-1 row-span-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <Instagram className="w-6 h-6 text-white mx-auto mb-1" />
                      <span className="text-xs text-white font-medium">Latest Work</span>
                    </div>
                  </div>

                  {/* Bio Text - Bottom Left */}
                  <div className="col-span-1 row-span-1 bg-accent/10 rounded-xl p-2 flex items-center">
                    <p className="text-xs text-muted-foreground leading-tight">Product Designer</p>
                  </div>

                  {/* Image 3 - Bottom */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Badge */}
          <div className="absolute -top-3 -right-3">
            <Badge className="bg-accent text-accent-foreground shadow-elevation-3 rounded-full px-3 py-1 border-0">
              Live Preview
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}