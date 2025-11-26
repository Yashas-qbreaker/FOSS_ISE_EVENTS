import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleModal = ({ open, onOpenChange }: ScheduleModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-glass-border/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading gradient-text">
            Event Schedule & Rules
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-4">
            Detailed schedule and rules will be uploaded here shortly. Stay tuned for updates!
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-4 text-foreground/80">
          <p>
            Both events will be conducted on the same day with separate tracks.
            Registration opens soon.
          </p>
          <p className="text-sm text-muted-foreground">
            For more information, please contact the FOSS Club organizing committee.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
