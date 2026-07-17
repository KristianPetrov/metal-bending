"use client";

import { upload } from "@vercel/blob/client";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  FileUp,
  LoaderCircle,
  LockKeyhole,
  Paperclip,
  ShieldCheck,
  X,
} from "lucide-react";
import { DragEvent, FormEvent, useRef, useState } from "react";

const projectTypes = [
  "Metal framing",
  "Glass & glazing",
  "Ceiling components",
  "Copper gutters",
  "Aerospace / specialty",
  "Other",
];

const acceptedFiles = ".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.zip,.jpg,.jpeg,.png";

type Tab = "quote" | "payment";

function safeUploadFilename(filename: string) {
  return filename
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 120) || "drawing";
}

export default function QuoteWorkspace({ initialPaymentComplete = false }: { initialPaymentComplete?: boolean }) {
  const [tab, setTab] = useState<Tab>(initialPaymentComplete ? "payment" : "quote");
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentComplete] = useState(initialPaymentComplete);

  function chooseFile(file?: File) {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setError("Please choose a file smaller than 25 MB.");
      return;
    }
    setError("");
    setSelectedFile(file);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files[0]);
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set("projectType", projectType);
    formData.delete("file");

    try {
      if (selectedFile) {
        setUploadProgress(0);
        const filename = safeUploadFilename(selectedFile.name);
        const pathname = `quotes/pending/${crypto.randomUUID()}/${filename}`;
        const blob = await upload(pathname, selectedFile, {
          access: "private",
          contentType: selectedFile.type || "application/octet-stream",
          handleUploadUrl: "/api/upload",
          multipart: selectedFile.size >= 5 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setUploadProgress(Math.round(percentage)),
        });

        formData.set("filePathname", blob.pathname);
        formData.set("fileName", filename);
        formData.set("fileSize", String(selectedFile.size));
        setUploadProgress(100);
      }

      const response = await fetch("/api/quote", { method: "POST", body: formData });
      const data = (await response.json()) as { reference?: string; error?: string };
      if (!response.ok || !data.reference) {
        throw new Error(data.error || "We could not send your request. Please try again.");
      }
      setReference(data.reference);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not send your request.");
    } finally {
      setSubmitting(false);
      setUploadProgress(null);
    }
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentError("");
    setPaymentLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      invoice: String(formData.get("invoice") || ""),
      email: String(formData.get("paymentEmail") || ""),
      amount: Number(formData.get("amount")),
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Secure checkout is unavailable right now.");
      }
      window.location.assign(data.url);
    } catch (submitError) {
      setPaymentError(
        submitError instanceof Error ? submitError.message : "Secure checkout is unavailable right now.",
      );
    } finally {
      setPaymentLoading(false);
    }
  }

  return (
    <div className="quote-workspace">
      {paymentComplete && (
        <div className="payment-confirmation" role="status">
          <Check size={16} aria-hidden="true" /> Payment received. A confirmation is on its way to your email.
        </div>
      )}
      <div className="workspace-tabs" role="tablist" aria-label="Quote and payment options">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "quote"}
          className={tab === "quote" ? "is-active" : ""}
          onClick={() => setTab("quote")}
        >
          <FileUp size={17} aria-hidden="true" /> Request a quote
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "payment"}
          className={tab === "payment" ? "is-active" : ""}
          onClick={() => setTab("payment")}
        >
          <CreditCard size={17} aria-hidden="true" /> Pay an invoice
        </button>
      </div>

      {tab === "quote" ? (
        reference ? (
          <div className="form-success" role="status">
            <span className="success-icon"><Check aria-hidden="true" /></span>
            <p className="form-kicker">Request received</p>
            <h3>Your curve is in motion.</h3>
            <p>
              Reference <strong>{reference}</strong>. Our team will review the details and follow up at the
              email you provided.
            </p>
            <button
              type="button"
              className="button button-dark"
              onClick={() => {
                setReference("");
                setStep(1);
                setSelectedFile(null);
              }}
            >
              Start another quote
            </button>
          </div>
        ) : (
          <form className="quote-form" onSubmit={submitQuote}>
            <div className="form-progress" aria-label={`Step ${step} of 3`}>
              {["Project", "Files", "Contact"].map((label, index) => {
                const number = index + 1;
                return (
                  <div key={label} className={number <= step ? "is-current" : ""}>
                    <span>{number < step ? <Check size={13} aria-hidden="true" /> : number}</span>
                    <small>{label}</small>
                  </div>
                );
              })}
            </div>

            <div className="form-step" hidden={step !== 1}>
              <div className="form-heading">
                <p className="form-kicker">Step 1 of 3</p>
                <h3>Tell us what needs to curve.</h3>
                <p>Rough details are fine. Our team can help resolve the rest.</p>
              </div>
              <fieldset>
                <legend>Project type</legend>
                <div className="project-type-grid">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={projectType === type ? "is-selected" : ""}
                      aria-pressed={projectType === type}
                      onClick={() => setProjectType(type)}
                    >
                      <span>{projectType === type && <Check size={13} aria-hidden="true" />}</span>
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="field-grid field-grid-2">
                <label>
                  Material
                  <select name="material" defaultValue="Aluminum">
                    <option>Aluminum</option>
                    <option>Steel</option>
                    <option>Stainless steel</option>
                    <option>Copper</option>
                    <option>Brass / bronze</option>
                    <option>Other / unsure</option>
                  </select>
                </label>
                <label>
                  Quantity
                  <input name="quantity" type="number" min="1" placeholder="e.g. 24" />
                </label>
                <label>
                  Profile / section
                  <input name="profile" placeholder="e.g. 6 in. track" />
                </label>
                <label>
                  Target radius
                  <input name="radius" placeholder="e.g. 12 ft. inside radius" />
                </label>
              </div>
              <label>
                Anything else we should know?
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Tolerances, alloy, tangents, finish requirements, or project context…"
                />
              </label>
            </div>

            <div className="form-step" hidden={step !== 2}>
              <div className="form-heading">
                <p className="form-kicker">Step 2 of 3</p>
                <h3>Add a drawing or CAD file.</h3>
                <p>Optional, but the fastest way to an accurate quote.</p>
              </div>
              <div
                className={`file-drop ${dragging ? "is-dragging" : ""}`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInput}
                  type="file"
                  name="file"
                  accept={acceptedFiles}
                  onChange={(event) => chooseFile(event.target.files?.[0])}
                />
                {selectedFile ? (
                  <div className="selected-file">
                    <span><Paperclip aria-hidden="true" /></span>
                    <div>
                      <strong>{selectedFile.name}</strong>
                      <small>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</small>
                    </div>
                    <button type="button" onClick={() => setSelectedFile(null)} aria-label="Remove file">
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="drop-icon"><FileUp aria-hidden="true" /></span>
                    <strong>Drop your drawing here</strong>
                    <p>or choose a file from your device</p>
                    <button type="button" className="button button-outline" onClick={() => fileInput.current?.click()}>
                      Browse files
                    </button>
                    <small>PDF, DWG, DXF, STEP, IGES, ZIP, JPG or PNG · 25 MB max</small>
                  </>
                )}
              </div>
            </div>

            <div className="form-step" hidden={step !== 3}>
              <div className="form-heading">
                <p className="form-kicker">Step 3 of 3</p>
                <h3>Where should we send the quote?</h3>
                <p>A stretch forming specialist will review your request.</p>
              </div>
              <div className="field-grid field-grid-2">
                <label>
                  Company <span aria-hidden="true">*</span>
                  <input name="company" required autoComplete="organization" />
                </label>
                <label>
                  Your name <span aria-hidden="true">*</span>
                  <input name="contactName" required autoComplete="name" />
                </label>
                <label>
                  Work email <span aria-hidden="true">*</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label className="field-span-2">
                  Desired timeline
                  <select name="timeline" defaultValue="Standard">
                    <option value="Rush">Rush / as soon as possible</option>
                    <option value="Standard">Standard lead time</option>
                    <option value="2-4 weeks">Within 2–4 weeks</option>
                    <option value="Planning">Planning / budgeting</option>
                  </select>
                </label>
              </div>
              <p className="privacy-note">
                <ShieldCheck size={16} aria-hidden="true" /> Your drawings are used only to review and quote
                your project.
              </p>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="form-actions">
              {step > 1 && (
                <button type="button" className="button button-ghost" onClick={() => setStep((value) => value - 1)}>
                  <ArrowLeft size={16} aria-hidden="true" /> Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" className="button button-dark form-next" onClick={() => setStep((value) => value + 1)}>
                  Continue <ArrowRight size={16} aria-hidden="true" />
                </button>
              ) : (
                <button className="button button-dark form-next" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <LoaderCircle className="spin" size={17} aria-hidden="true" />
                      {uploadProgress !== null && uploadProgress < 100
                        ? `Uploading ${uploadProgress}%…`
                        : "Sending…"}
                    </>
                  ) : (
                    <>Send quote request <ArrowRight size={16} aria-hidden="true" /></>
                  )}
                </button>
              )}
            </div>
          </form>
        )
      ) : (
        <form className="payment-form" onSubmit={submitPayment}>
          <span className="payment-lock"><LockKeyhole aria-hidden="true" /></span>
          <div className="form-heading">
            <p className="form-kicker">Secure online payment</p>
            <h3>Pay an invoice or order deposit.</h3>
            <p>Enter the amount shown on your Metal Bending Corporation invoice.</p>
          </div>
          <label>
            Invoice or order number <span aria-hidden="true">*</span>
            <input name="invoice" required placeholder="e.g. MBC-10482" />
          </label>
          <label>
            Email <span aria-hidden="true">*</span>
            <input name="paymentEmail" type="email" required autoComplete="email" />
          </label>
          <label>
            Amount <span aria-hidden="true">*</span>
            <span className="currency-input"><span>$</span><input name="amount" type="number" min="1" max="250000" step="0.01" required placeholder="0.00" /></span>
          </label>
          {paymentError && <p className="form-error" role="alert">{paymentError}</p>}
          <button className="button button-dark payment-button" type="submit" disabled={paymentLoading}>
            {paymentLoading ? (
              <><LoaderCircle className="spin" size={17} aria-hidden="true" /> Opening checkout…</>
            ) : (
              <>Continue to secure checkout <ArrowRight size={16} aria-hidden="true" /></>
            )}
          </button>
          <p className="payment-note"><LockKeyhole size={14} aria-hidden="true" /> Payments are processed securely by Stripe.</p>
        </form>
      )}
    </div>
  );
}
