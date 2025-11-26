import { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
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

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(createFormSchema(teamSize)),
    defaultValues: {
      teamSize: "1",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
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

        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{config.eventName}</h1>
          <p className="text-muted-foreground mb-8">Registration Form</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                {...form.register("teamName")}
                className="mt-1.5"
              />
              {form.formState.errors.teamName && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.teamName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Team Size *</Label>
              <RadioGroup
                value={teamSize}
                onValueChange={(value: "1" | "2" | "3") => {
                  setTeamSize(value);
                  form.setValue("teamSize", value);
                }}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="size1" />
                  <Label htmlFor="size1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="size2" />
                  <Label htmlFor="size2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="size3" />
                  <Label htmlFor="size3">3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Member 1 (Lead)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="member1Name">Name *</Label>
                  <Input
                    id="member1Name"
                    {...form.register("member1Name")}
                    className="mt-1.5"
                  />
                  {form.formState.errors.member1Name && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.member1Name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="member1USN">USN *</Label>
                  <Input
                    id="member1USN"
                    {...form.register("member1USN")}
                    className="mt-1.5"
                  />
                  {form.formState.errors.member1USN && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.member1USN.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="collegeName">College Name *</Label>
                  <Input
                    id="collegeName"
                    {...form.register("collegeName")}
                    className="mt-1.5"
                  />
                  {form.formState.errors.collegeName && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.collegeName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    {...form.register("contactNumber")}
                    className="mt-1.5"
                  />
                  {form.formState.errors.contactNumber && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.contactNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="emailId">Email ID *</Label>
                  <Input
                    id="emailId"
                    type="email"
                    {...form.register("emailId")}
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
                <h3 className="text-lg font-semibold mb-4">Member 2</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="member2Name">Name *</Label>
                    <Input
                      id="member2Name"
                      {...form.register("member2Name")}
                      className="mt-1.5"
                    />
                    {form.formState.errors.member2Name && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.member2Name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="member2USN">USN</Label>
                    <Input
                      id="member2USN"
                      {...form.register("member2USN")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member2College">College Name</Label>
                    <Input
                      id="member2College"
                      {...form.register("member2College")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member2Contact">Contact Number</Label>
                    <Input
                      id="member2Contact"
                      type="tel"
                      {...form.register("member2Contact")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member2Email">Email ID</Label>
                    <Input
                      id="member2Email"
                      type="email"
                      {...form.register("member2Email")}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {teamSize === "3" && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Member 3</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="member3Name">Name *</Label>
                    <Input
                      id="member3Name"
                      {...form.register("member3Name")}
                      className="mt-1.5"
                    />
                    {form.formState.errors.member3Name && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.member3Name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="member3USN">USN</Label>
                    <Input
                      id="member3USN"
                      {...form.register("member3USN")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member3College">College Name</Label>
                    <Input
                      id="member3College"
                      {...form.register("member3College")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member3Contact">Contact Number</Label>
                    <Input
                      id="member3Contact"
                      type="tel"
                      {...form.register("member3Contact")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="member3Email">Email ID</Label>
                    <Input
                      id="member3Email"
                      type="email"
                      {...form.register("member3Email")}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              Pay via UPI (₹{config.regFeeInr})
            </Button>
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
                ref={(canvas) => {
                  if (canvas) renderQrToCanvas(canvas, upiLink);
                }}
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
