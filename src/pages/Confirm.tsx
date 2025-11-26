import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import type { EventConfig } from "@/lib/eventConfig";
import type { PendingTicket } from "@/lib/registrationTypes";
import { postLastDigits, generateTicketPDF } from "@/lib/upiHelpers";

interface ConfirmProps {
  config: EventConfig;
}

export default function Confirm({ config }: ConfirmProps) {
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [lastDigits, setLastDigits] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleConfirm = async () => {
    if (!screenshot) {
      toast.error("Please upload payment screenshot");
      return;
    }

    if (!lastDigits || lastDigits.length < 4 || lastDigits.length > 8) {
      toast.error("Please enter 4-8 digits/UTR tail");
      return;
    }

    const raw = sessionStorage.getItem("pendingTicket");
    if (!raw) {
      toast.error("No registration found. Please register again.");
      navigate(`/register-${config.eventSlug}`);
      return;
    }

    setIsGenerating(true);

    try {
      const data: PendingTicket = JSON.parse(raw);
      data.last4Txn = lastDigits;

      await postLastDigits(data.ticketId, lastDigits, config);

      await generateTicketPDF(data);

      toast.success("Ticket downloaded successfully!");
      sessionStorage.removeItem("pendingTicket");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Failed to generate ticket. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-auto">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link
          to={`/register-${config.eventSlug}`}
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration
        </Link>

        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Confirm Payment
          </h1>
          <p className="text-muted-foreground mb-8">
            Upload your payment screenshot and enter transaction details
          </p>

          <div className="space-y-6">
            <div>
              <Label htmlFor="screenshot">Payment Screenshot *</Label>
              <div className="mt-2">
                <label
                  htmlFor="screenshot"
                  className="flex items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  {screenshot ? (
                    <div className="text-center">
                      <p className="text-sm font-medium">{screenshot.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload screenshot
                      </p>
                    </div>
                  )}
                </label>
                <input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lastDigits">
                Last 4-8 Digits / UTR Tail *
              </Label>
              <Input
                id="lastDigits"
                type="text"
                value={lastDigits}
                onChange={(e) => setLastDigits(e.target.value)}
                placeholder="Enter last digits of transaction"
                minLength={4}
                maxLength={8}
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the last 4-8 digits of your UPI transaction ID or UTR
                number
              </p>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? "Generating Ticket..." : "Confirm & Get Ticket"}
            </Button>

            <div className="bg-muted/30 rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-2">Important Notes:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Keep your payment screenshot safe for verification</li>
                <li>Your ticket will be downloaded as a PDF</li>
                <li>Show the ticket QR code at the event entrance</li>
                <li>Contact support if you face any issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
