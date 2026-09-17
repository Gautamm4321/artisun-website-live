'use client';

import React from 'react';

export default function TermsContent() {
  return (
    <div className="relative w-full min-h-screen pt-28 sm:pt-36 md:pt-44 pb-24 px-4 md:px-8 font-suisse antialiased text-[#242623] selection:bg-[#A52A2C] selection:text-[#F3ECE0]">

      <div className="relative z-10 max-w-[1040px] mx-auto">
        <section className="w-full rounded-[18px] overflow-hidden relative shadow-[0_40px_80px_rgba(80,20,15,0.22)] grid grid-cols-1 md:grid-cols-[340px_1fr]">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#242623] text-[#F3ECE0] text-[8px] tracking-[0.16em] uppercase px-3 py-1 rounded-full font-semibold z-20 opacity-70">
            Terms
          </div>

          {/* Left Rail (Red Gradient) */}
          <div className="relative overflow-hidden p-10 md:p-12 flex flex-col justify-between text-[#F3ECE0] min-h-[260px] md:min-h-full bg-gradient-to-br from-[#b83232] to-[#7E1D1E]">
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_9px)]" />
            <div className="absolute w-[340px] height-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,165,85,0.45),transparent_66%)] -bottom-[120px] -left-[80px] blur-[30px] pointer-events-none" />
            <div className="absolute w-[180px] height-[180px] rounded-full bg-[radial-gradient(circle,rgba(255,200,140,0.3),transparent_66%)] -top-[40px] -right-[30px] blur-[24px] pointer-events-none" />

            <div className="absolute right-6 top-[46%] -translate-y-1/2 z-[1] opacity-15 pointer-events-none">
              <svg viewBox="0 0 60 120" className="w-[132px] stroke-[#F3ECE0] fill-none stroke-[1.3]">
                <rect x="20" y="4" width="20" height="14" rx="3" />
                <rect x="16" y="20" width="28" height="12" rx="3" />
                <rect x="12" y="34" width="36" height="82" rx="8" />
              </svg>
            </div>

            <div className="relative z-10 font-editorial font-light text-[15px] tracking-[0.5em]">
              ARTISUN
            </div>

            <div className="relative z-10 my-8 md:my-0">
              <div className="text-[10px] tracking-[0.3em] uppercase font-semibold opacity-60 mb-4">
                Policy · 03
              </div>
              <h1 className="font-editorial font-extralight text-3xl md:text-5xl leading-tight tracking-tight">
                Terms of <em className="italic font-light">Service.</em>
              </h1>
            </div>

            <p className="relative z-10 text-[13px] leading-relaxed font-light opacity-85 max-w-[34ch]">
              Clear, transparent guidelines governing your use of our website, orders, and skinwear products.
            </p>
          </div>

          {/* Right Body */}
          <div className="relative p-8 md:p-14 bg-[radial-gradient(120%_60%_at_84%_0%,#F3ECE0,#EDE3D3_86%,#e4d4bd)]">
            <div className="relative z-10 space-y-6">
              
              {/* Introduction */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">1. Agreement to Terms</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  By browsing, accessing, or purchasing from artisunskin.com (&ldquo;Artisun&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), you accept and agree to be bound by these Terms of Service and our related policies, including our Privacy Policy and Shipping &amp; Returns Policy. If you do not agree, please do not use our website or services.
                </p>
              </div>

              {/* Products & Orders */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">2. Orders &amp; Acceptance</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch] mb-3">
                  All orders placed through our website are subject to product availability and our acceptance. We reserve the right to decline or cancel any order for reasons including inaccuracies in product details, suspected fraudulent transactions, or unforeseen stock shortages.
                </p>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  Upon order placement, you will receive an electronic confirmation. This notification confirms receipt of your order request and does not constitute final binding acceptance until dispatch.
                </p>
              </div>

              {/* Pricing & Payments */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">3. Pricing &amp; Payment</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  All prices displayed on artisunskin.com are in Indian Rupees (INR) and are inclusive of applicable GST unless stated otherwise. Payments are processed through secure, PCI-DSS compliant third-party payment gateways. We do not store or process your sensitive debit/credit card credentials on our servers.
                </p>
              </div>

              {/* Product Use & Patch Testing */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">4. Product Use &amp; Skin Tolerance</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  Our skinwear formulations are rigorously tested for broad-spectrum protection and gentle skin compatibility. However, individual skin profiles differ. We recommend performing a 24-hour patch test before full facial application. Discontinue use if irritation occurs and consult a dermatologist.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">5. Intellectual Property</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  All content on this site—including but not limited to brand identity, logos, text copy, editorial photography, 3D renderings, and design assets—is the exclusive proprietary property of Artisun Private Limited and protected by applicable copyright and trademark laws.
                </p>
              </div>

              {/* Governing Law & Dispute Resolution */}
              <div className="pb-5 border-b border-[#242623]/10">
                <h4 className="font-editorial font-normal text-[17px] mb-2 tracking-tight">6. Governing Law &amp; Jurisdiction</h4>
                <p className="text-[13.5px] leading-relaxed font-light opacity-85 max-w-[62ch]">
                  These terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising in connection with these terms or purchases shall be subject to the exclusive jurisdiction of the competent courts in India.
                </p>
              </div>

              {/* Contact Banner */}
              <div className="mt-6 bg-[#A52A2C]/5 border border-[#A52A2C]/20 rounded-xl p-4 md:p-5 text-[13px] leading-relaxed">
                Questions regarding our terms? Reach our support team at{' '}
                <a href="mailto:support@artisunskin.com" className="text-[#A52A2C] underline decoration-[#A52A2C]/40 hover:decoration-[#A52A2C]">
                  support@artisunskin.com
                </a>{' '}
                or review our designated{' '}
                <a href="/contact" className="text-[#A52A2C] underline decoration-[#A52A2C]/40 hover:decoration-[#A52A2C]">
                  Grievance Redressal details
                </a>.
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
