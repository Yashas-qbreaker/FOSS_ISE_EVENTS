import type { EventConfig } from "./eventConfig";
import type { RegistrationFormData, PendingTicket } from "./registrationTypes";

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
    QRCode: any;
  }
}

export function buildUpiLink({
  vpa,
  name,
  amount,
  note,
  txnRef,
}: {
  vpa: string;
  name: string;
  amount: number;
  note: string;
  txnRef: string;
}): string {
  const params = new URLSearchParams({
    pa: vpa,
    pn: name,
    am: String(amount),
    tn: note,
    tr: txnRef,
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

export async function renderQrToCanvas(
  canvasEl: HTMLCanvasElement,
  text: string
): Promise<void> {
  if (window.QRCode) {
    await window.QRCode.toCanvas(canvasEl, text, { width: 220 });
  }
}

export async function postRegistration(
  form: RegistrationFormData,
  ticketId: string,
  config: EventConfig
): Promise<void> {
  const payload = {
    ticketId,
    teamName: form.teamName,
    teamSize: form.teamSize,
    leadName: form.member1Name,
    leadUSN: form.member1USN,
    college: form.collegeName,
    contact: form.contactNumber,
    email: form.emailId,
    member2Name: form.member2Name || "",
    member2USN: form.member2USN || "",
    member2College: form.member2College || "",
    member2Contact: form.member2Contact || "",
    member2Email: form.member2Email || "",
    member3Name: form.member3Name || "",
    member3USN: form.member3USN || "",
    member3College: form.member3College || "",
    member3Contact: form.member3Contact || "",
    member3Email: form.member3Email || "",
    // Include API key in body for Apps Script (matches body.apiKey check)
    apiKey: config.apiKey,
  };

  await fetch(config.webAppUrl, {
    method: "POST",
    headers: {
      // Use text/plain to avoid CORS preflight (Apps Script reads raw body)
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
}

export async function postLastDigits(
  ticketId: string,
  lastDigits: string,
  config: EventConfig
): Promise<void> {
  const payload = {
    ticketId,
    lastDigits,
    // Include API key in body for Apps Script (matches body.apiKey check)
    apiKey: config.apiKey,
  };

  await fetch(config.webAppUrl, {
    method: "POST",
    headers: {
      // Use text/plain to avoid CORS preflight (Apps Script reads raw body)
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
}

export async function generateTicketPDF(
  data: PendingTicket
): Promise<void> {
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "width:520px;padding:20px;border:1px solid #eee;font-family:system-ui,-apple-system,Segoe UI,Roboto;background:#fff;color:#000;";
  wrap.innerHTML = `
    <h2 style="margin:0 0 8px;color:#000">🎟️ ${data.eventName}</h2>
    <p style="margin:0;color:#555">${data.eventDate}</p>
    <hr style="margin:16px 0;border:1px solid #eee">
    <p style="color:#000"><strong>Team Name:</strong> ${data.teamName}</p>
    <p style="color:#000"><strong>Team Size:</strong> ${data.teamSize}</p>
    <p style="color:#000"><strong>Lead Name:</strong> ${data.member1Name}</p>
    <p style="color:#000"><strong>College:</strong> ${data.collegeName}</p>
    <p style="color:#000"><strong>Contact:</strong> ${data.contactNumber}</p>
    <p style="color:#000"><strong>Email:</strong> ${data.emailId}</p>
    <p style="color:#000"><strong>Ticket ID:</strong> ${data.ticketId}</p>
    <p style="color:#000"><strong>Txn last digits:</strong> ${data.last4Txn || "N/A"}</p>
    <div style="text-align:center;margin-top:16px">
      <canvas id="qrCanvas"></canvas>
      <div style="font-size:12px;color:#777;margin-top:8px">Show this QR at entry</div>
    </div>
  `;
  document.body.appendChild(wrap);

  const canvas = wrap.querySelector("#qrCanvas") as HTMLCanvasElement;
  if (window.QRCode) {
    await window.QRCode.toCanvas(canvas, `CHECKIN:${data.ticketId}`, {
      width: 160,
    });
  }

  if (window.jspdf && window.html2canvas) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const canvasImg = await window.html2canvas(wrap);
    const img = canvasImg.toDataURL("image/png");
    const pageW = pdf.internal.pageSize.getWidth();
    const imgW = pageW - 72;
    const scale = imgW / canvasImg.width;
    const imgH = canvasImg.height * scale;

    pdf.addImage(img, "PNG", 36, 36, imgW, imgH);
    pdf.save(`ticket_${data.ticketId}.pdf`);
  }

  document.body.removeChild(wrap);
}
