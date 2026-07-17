import { env } from "cloudflare:workers";

interface RuntimeBindings {
  STRIPE_SECRET_KEY?: string;
  SITE_URL?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { invoice?: string; email?: string; amount?: number };
    const invoice = body.invoice?.trim().slice(0, 80) || "";
    const email = body.email?.trim().toLowerCase().slice(0, 200) || "";
    const amount = Number(body.amount);

    if (!invoice || !email.includes("@") || !Number.isFinite(amount) || amount < 1 || amount > 250000) {
      return Response.json({ error: "Please check the invoice number, email, and payment amount." }, { status: 400 });
    }

    const bindings = env as unknown as RuntimeBindings;
    const stripeKey = bindings.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return Response.json(
        { error: "Online payments are being connected. Please call (714) 238-1200 to make a payment." },
        { status: 503 },
      );
    }

    const requestUrl = new URL(request.url);
    const siteUrl = (bindings.SITE_URL || process.env.SITE_URL || requestUrl.origin).replace(/\/$/, "");
    const params = new URLSearchParams({
      mode: "payment",
      customer_email: email,
      client_reference_id: invoice,
      success_url: `${siteUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?payment=cancelled#quote`,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][unit_amount]": String(Math.round(amount * 100)),
      "line_items[0][price_data][product_data][name]": `Metal Bending payment · ${invoice}`,
      "metadata[invoice]": invoice,
    });

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const stripeData = (await stripeResponse.json()) as {
      url?: string;
      error?: { message?: string };
    };

    if (!stripeResponse.ok || !stripeData.url) {
      console.error("Stripe checkout failed", stripeData.error?.message);
      return Response.json({ error: "Secure checkout is unavailable right now. Please call us for help." }, { status: 502 });
    }

    return Response.json({ url: stripeData.url });
  } catch (error) {
    console.error("Payment request failed", error);
    return Response.json({ error: "Secure checkout is unavailable right now. Please call us for help." }, { status: 500 });
  }
}
