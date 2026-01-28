import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

interface HeaderProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (id: number) => void;
}

export function Header({ currentStep, completedSteps, onStepClick }: HeaderProps) {
  const { user, logout, isLoggingOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleStepClick = (index: number) => {
    onStepClick(index);
    setIsOpen(false);
  };

  return (
    <header className="h-16 border-b border-border bg-white px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-secondary">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar 
              currentStep={currentStep} 
              completedSteps={completedSteps} 
              onStepClick={handleStepClick}
              className="w-full border-none h-full"
            />
          </SheetContent>
        </Sheet>

        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <img
            src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/11/GoodTherapy-Logo.png"
            alt="GoodTherapy"
            className="h-8 w-auto"
          />
          <div className="hidden md:block h-6 w-px bg-border mx-2" />
          <span className="text-sm font-medium text-muted-foreground hidden md:block">
            Business Profile Guide
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-foreground">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-muted-foreground">{user.email}</p>
            </div>
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full border border-border" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">
                {user.firstName?.[0]}
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => logout()} 
              disabled={isLoggingOut}
              className="text-muted-foreground hover:text-destructive"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => window.location.href = "/api/login"}
            className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20"
            size="sm"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In with Google
          </Button>
        )}
      </div>
    </header>
  );
}
