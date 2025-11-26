import gsaLogo from "@/assets/GSA_LOGO.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PartnerStrip = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="w-full border-t border-border/30 bg-background/80 backdrop-blur-sm py-3">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Partner
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 group">
                  <img 
                    src={gsaLogo} 
                    alt="Google Student Ambassador Program" 
                    className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-[11px] font-medium text-foreground/80">
                    Google Student Ambassador
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Minor Partner</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-[10px] text-muted-foreground/40 mx-2">•</span>
          <p className="text-[9px] text-muted-foreground/60">
            © {currentYear} FOSS Club, ISE, PESCE Mandya
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerStrip;
