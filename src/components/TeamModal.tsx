import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, MoreVertical, UserPlus } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Analyst";
  avatar?: string;
}

export function TeamModal({ open, onOpenChange }: IntegrationModalProps) {
  const [email, setEmail] = useState("");
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "You",
      email: "you@yourdomain.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@yourdomain.com",
      role: "Editor",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@yourdomain.com",
      role: "Analyst",
    },
  ]);

  const getRoleBadgeColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "Admin":
        return "text-purple-700 bg-purple-100";
      case "Editor":
        return "text-blue-700 bg-blue-100";
      case "Analyst":
        return "text-green-700 bg-green-100";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-headline-medium">
            <Users className="h-6 w-6 text-primary" />
            <span>Team Management</span>
          </DialogTitle>
          <DialogDescription>
            Manage your team members and their access levels
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Invite Member */}
          <div className="space-y-3">
            <h3 className="text-body-large font-semibold">Invite Team Member</h3>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button variant="primary">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>

          {/* Team Members List */}
          <div className="space-y-3">
            <h3 className="text-body-large font-semibold">Team Members ({teamMembers.length})</h3>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface-variant/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={getRoleBadgeColor(member.role)}
                    >
                      {member.role}
                    </Badge>
                    {member.role !== "Admin" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Change to Admin</DropdownMenuItem>
                          <DropdownMenuItem>Change to Editor</DropdownMenuItem>
                          <DropdownMenuItem>Change to Analyst</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Descriptions */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-body-large font-semibold">Role Permissions</h3>
            <div className="space-y-2 text-body-small text-muted-foreground">
              <div className="flex items-start space-x-2">
                <Badge variant="secondary" className="text-purple-700 bg-purple-100 mt-0.5">
                  Admin
                </Badge>
                <p>Full access to all features, team management, and billing</p>
              </div>
              <div className="flex items-start space-x-2">
                <Badge variant="secondary" className="text-blue-700 bg-blue-100 mt-0.5">
                  Editor
                </Badge>
                <p>Can create and edit Editorial Mazes, manage integrations</p>
              </div>
              <div className="flex items-start space-x-2">
                <Badge variant="secondary" className="text-green-700 bg-green-100 mt-0.5">
                  Analyst
                </Badge>
                <p>Read-only access to analytics and reports</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
