import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EventButtonProps {
  to: string;
  children: React.ReactNode;
}

const EventButton = ({ to, children }: EventButtonProps) => {
  return (
    <Link to={to} className="group block w-full">
      <div className="event-cta-wrapper w-full max-w-md mx-auto">
        <Button
          variant="outline"
          size="lg"
          className="event-cta-inner glass-card hover-lift border-0 h-12 sm:h-16 px-6 sm:px-10 w-full text-sm sm:text-lg font-heading tracking-tight relative overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-3 group-hover:text-primary transition-colors">
            {children}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </Link>
  );
};

export default EventButton;
