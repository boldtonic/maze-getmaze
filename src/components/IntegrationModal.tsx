import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, CheckCircle, Globe, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface IntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntegrationModal({ open, onOpenChange }: IntegrationModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const isVerified = true; // Simulated verification status
  const siteUrl = "yourdomain.com";
  
  const scriptCode = `<!-- Maze Integration Script -->
<script>
  (function(m,a,z,e){
    m[e]=m[e]||{};
    m[e].siteId='YOUR_SITE_ID';
    var s=a.createElement(z);
    s.async=1;
    s.src='https://cdn.maze.com/script.js';
    a.head.appendChild(s);
  })(window,document,'script','maze');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Integration script copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-headline-medium">
            <Code className="h-6 w-6 text-primary" />
            <span>Integration Setup</span>
          </DialogTitle>
          <DialogDescription>
            Add the Maze script to your website to enable Editorial Mazes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Site Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">{siteUrl}</p>
                  </div>
                </div>
                {isVerified ? (
                  <Badge variant="secondary" className="text-green-700 bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Installation Instructions */}
          <div className="space-y-3">
            <div>
              <h3 className="text-body-large font-semibold mb-2">Installation Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-body-medium text-muted-foreground">
                <li>Copy the script code below</li>
                <li>Paste it in the <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;head&gt;</code> section of your website</li>
                <li>Save and deploy your changes</li>
                <li>Test the integration using the button below</li>
              </ol>
            </div>

            {/* Script Code */}
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{scriptCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button variant="primary" className="flex-1">
              Test Maze
            </Button>
            <Button variant="outline" className="flex-1">
              View Documentation
            </Button>
          </div>

          {/* Status Info */}
          {isVerified && (
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      Integration Active
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your Editorial Mazes are now live and ready to engage your audience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
