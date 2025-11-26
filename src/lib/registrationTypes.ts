export interface RegistrationFormData {
  teamName: string;
  teamSize: "1" | "2" | "3";
  member1Name: string;
  member1USN: string;
  collegeName: string;
  contactNumber: string;
  emailId: string;
  member2Name?: string;
  member2USN?: string;
  member2College?: string;
  member2Contact?: string;
  member2Email?: string;
  member3Name?: string;
  member3USN?: string;
  member3College?: string;
  member3Contact?: string;
  member3Email?: string;
}

export interface PendingTicket extends RegistrationFormData {
  ticketId: string;
  amount: number;
  eventName: string;
  eventDate: string;
  createdAt: string;
  last4Txn?: string;
}
