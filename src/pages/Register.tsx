import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, User, Mail, Phone, GraduationCap, Hash, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import type { EventConfig } from "@/lib/eventConfig";
import type { RegistrationFormData } from "@/lib/registrationTypes";
import { buildUpiLink, renderQrToCanvas, postRegistration } from "@/lib/upiHelpers";

const createFormSchema = (teamSize: string) => {
  const baseSchema = {
    teamName: z.string().min(1, "Team name is required").max(100),
    teamSize: z.enum(["1", "2", "3"]),
    member1Name: z.string().min(1, "Lead name is required").max(100),
    member1USN: z.string().min(1, "USN is required").max(50),
    collegeName: z.string().min(1, "College name is required").max(200),
    contactNumber: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
    emailId: z.string().email("Invalid email address").max(255),
  };

  const member2Schema = {
    member2Name: z.string().min(1, "Member 2 name is required").max(100),
    member2USN: z.string().optional(),
    member2College: z.string().optional(),
    member2Contact: z.string().optional(),
    member2Email: z.string().optional(),
  };

  const member3Schema = {
    member3Name: z.string().min(1, "Member 3 name is required").max(100),
    member3USN: z.string().optional(),
    member3College: z.string().optional(),
    member3Contact: z.string().optional(),
    member3Email: z.string().optional(),
  };

  if (teamSize === "3") {
    return z.object({ ...baseSchema, ...member2Schema, ...member3Schema });
  } else if (teamSize === "2") {
    return z.object({
      ...baseSchema,
      ...member2Schema,
      member3Name: z.string().optional(),
      member3USN: z.string().optional(),
      member3College: z.string().optional(),
      member3Contact: z.string().optional(),
      member3Email: z.string().optional(),
    });
  }

  return z.object({
    ...baseSchema,
    member2Name: z.string().optional(),
    member2USN: z.string().optional(),
    member2College: z.string().optional(),
    member2Contact: z.string().optional(),
    member2Email: z.string().optional(),
    member3Name: z.string().optional(),
    member3USN: z.string().optional(),
    member3College: z.string().optional(),
    member3Contact: z.string().optional(),
    member3Email: z.string().optional(),
  });
};

interface RegisterProps {
  config: EventConfig;
}

export default function Register({ config }: RegisterProps) {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState<"1" | "2" | "3">("1");
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [isLoadingQr, setIsLoadingQr] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(createFormSchema(teamSize)),
    defaultValues: {
      teamSize: "1",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setIsLoadingQr(true);
      const ticketId = `TKT_${Date.now()}`;
      const payload = {
        ...data,
        ticketId,
        amount: config.regFeeInr,
        eventName: config.eventName,
        eventDate: config.eventDate,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem("pendingTicket", JSON.stringify(payload));

      await postRegistration(data, ticketId, config);

      const link = buildUpiLink({
        vpa: config.upiId,
        name: config.payeeName,
        amount: config.regFeeInr,
        note: `${config.eventName} Registration`,
        txnRef: ticketId,
      });

      setUpiLink(link);
      setShowUpiModal(true);
    } catch (error) {
      setIsLoadingQr(false);
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  const handleContinueToConfirm = () => {
    setShowUpiModal(false);
    navigate(`/confirm-${config.eventSlug}`);
  };

  const handleCopyUpi = async () => {
    await navigator.clipboard.writeText(config.upiId);
    toast.success("UPI ID copied!");
  };

  // Render QR code when modal opens and upiLink is available
  useEffect(() => {
    if (showUpiModal && upiLink && qrCanvasRef.current) {
      renderQrToCanvas(qrCanvasRef.current, upiLink)
        .then(() => {
          setIsLoadingQr(false);
        })
        .catch((error) => {
          console.error("Failed to render QR code:", error);
          setIsLoadingQr(false);
          toast.error("Failed to generate QR code. Please try again.");
        });
    }
  }, [showUpiModal, upiLink]);

  return (
    <div className="min-h-screen relative overflow-auto">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link
          to={config.eventSlug === "pixel2portal" ? "/event-one" : "/event-two"}
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </Link>

        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{config.eventName}</h1>
            <p className="text-muted-foreground">Complete the registration form below to secure your spot</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Team Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Team Information</h2>
              </div>
              
              <div>
                <Label htmlFor="teamName" className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  Team Name *
                </Label>
                <Input
                  id="teamName"
                  {...form.register("teamName")}
                  placeholder="Enter your team name"
                  className="mt-1.5"
                />
                {form.formState.errors.teamName && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.teamName.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Team Size *
                </Label>
                <RadioGroup
                  value={teamSize}
                  onValueChange={(value: "1" | "2" | "3") => {
                    setTeamSize(value);
                    form.setValue("teamSize", value);
                  }}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="size1" />
                    <Label htmlFor="size1" className="cursor-pointer font-medium">1 Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="size2" />
                    <Label htmlFor="size2" className="cursor-pointer font-medium">2 Members</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="size3" />
                    <Label htmlFor="size3" className="cursor-pointer font-medium">3 Members</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Member 1 (Lead) Section */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Member 1 (Lead)</h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">Required</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="member1Name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name *
                  </Label>
                  <Input
                    id="member1Name"
                    {...form.register("member1Name")}
                    placeholder="Enter full name"
                    className="mt-1.5"
                  />
                  {form.formState.errors.member1Name && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.member1Name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="member1USN" className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    USN *
                  </Label>
                  <Input
                    id="member1USN"
                    {...form.register("member1USN")}
                    placeholder="e.g., 4PS23IS065"
                    className="mt-1.5 uppercase"
                  />
                  {form.formState.errors.member1USN && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.member1USN.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="collegeName" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    College Name *
                  </Label>
                  <Input
                    id="collegeName"
                    {...form.register("collegeName")}
                    placeholder="Enter college name"
                    className="mt-1.5"
                  />
                  {form.formState.errors.collegeName && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.collegeName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contactNumber" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    {...form.register("contactNumber")}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="mt-1.5"
                  />
                  {form.formState.errors.contactNumber && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.contactNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="emailId" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email ID *
                  </Label>
                  <Input
                    id="emailId"
                    type="email"
                    {...form.register("emailId")}
                    placeholder="your.email@example.com"
                    className="mt-1.5"
                  />
                  {form.formState.errors.emailId && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.emailId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {(teamSize === "2" || teamSize === "3") && (
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-semibold">Member 2</h3>
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">Required</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="member2Name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name *
                    </Label>
                    <Input
                      id="member2Name"
                      {...form.register("member2Name")}
                      placeholder="Enter full name"
                      className="mt-1.5"
                    />
                    {form.formState.errors.member2Name && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.member2Name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="member2USN" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      USN
                    </Label>
                    <Input
                      id="member2USN"
                      {...form.register("member2USN")}
                      placeholder="e.g., 4PS23IS065"
                      className="mt-1.5 uppercase"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="member2College" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      College Name
                    </Label>
                    <Input
                      id="member2College"
                      {...form.register("member2College")}
                      placeholder="Enter college name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member2Contact" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Contact Number
                    </Label>
                    <Input
                      id="member2Contact"
                      type="tel"
                      {...form.register("member2Contact")}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member2Email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email ID
                    </Label>
                    <Input
                      id="member2Email"
                      type="email"
                      {...form.register("member2Email")}
                      placeholder="your.email@example.com"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {teamSize === "3" && (
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-semibold">Member 3</h3>
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">Required</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="member3Name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name *
                    </Label>
                    <Input
                      id="member3Name"
                      {...form.register("member3Name")}
                      placeholder="Enter full name"
                      className="mt-1.5"
                    />
                    {form.formState.errors.member3Name && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.member3Name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="member3USN" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      USN
                    </Label>
                    <Input
                      id="member3USN"
                      {...form.register("member3USN")}
                      placeholder="e.g., 4PS23IS065"
                      className="mt-1.5 uppercase"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="member3College" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      College Name
                    </Label>
                    <Input
                      id="member3College"
                      {...form.register("member3College")}
                      placeholder="Enter college name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member3Contact" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Contact Number
                    </Label>
                    <Input
                      id="member3Contact"
                      type="tel"
                      {...form.register("member3Contact")}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member3Email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email ID
                    </Label>
                    <Input
                      id="member3Email"
                      type="email"
                      {...form.register("member3Email")}
                      placeholder="your.email@example.com"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Section */}
            <div className="border-t border-border pt-6">
              <div className="bg-primary/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Fee</p>
                    <p className="text-2xl font-bold text-foreground">₹{config.regFeeInr}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Pay via UPI</p>
                    <p className="text-sm font-medium text-foreground">{config.payeeName}</p>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoadingQr || form.formState.isSubmitting}>
                {isLoadingQr || form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay via UPI (₹${config.regFeeInr})`
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                By submitting, you agree to the event terms and conditions
              </p>
            </div>
          </form>
        </div>
      </div>

      {showUpiModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Pay via UPI</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Scan or tap to pay ₹{config.regFeeInr} to{" "}
              <strong>{config.payeeName}</strong>
            </p>
            <div className="flex justify-center my-6">
              <canvas
                ref={qrCanvasRef}
                className="border-4 border-white rounded-lg"
              />
            </div>
            <p className="text-sm mb-2">
              <strong>UPI ID:</strong> {config.upiId}
            </p>
            <div className="flex gap-2 mb-4">
              <Button onClick={handleCopyUpi} variant="outline" size="sm">
                Copy UPI ID
              </Button>
              <a href={upiLink} className="flex-1">
                <Button className="w-full" size="sm">
                  Open UPI App
                </Button>
              </a>
            </div>
            <Button
              onClick={handleContinueToConfirm}
              className="w-full"
              variant="secondary"
            >
              I've Paid → Continue
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              After paying, click "I've Paid → Continue" to confirm and get your
              ticket.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
