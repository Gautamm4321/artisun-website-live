'use client';

import React from 'react';
import Link from 'next/link';

const TOC_ITEMS = [
  { id: 'what-pa-measures-and-what-spf-leaves-out', label: 'What PA measures, and what SPF leaves out' },
  { id: 'the-four-bands-and-the-numbers-underneath-them', label: 'The four bands, and the numbers underneath them' },
  { id: 'pa-has-no-upper-limit-and-that-changes-how-you-read-it', label: 'PA++++ has no upper limit, and that changes how you read it' },
  { id: 'how-the-rating-is-actually-measured', label: 'How the rating is actually measured' },
  { id: 'the-dose-problem-which-no-rating-on-the-bottle-can-fix', label: 'The dose problem, which no rating on the bottle can fix' },
  { id: 'why-the-uva-half-matters-more-in-india-than-the-label-suggests', label: 'Why the UVA half matters more in India than the label suggests' },
  { id: 'what-pa-does-not-tell-you', label: 'What PA does not tell you' },
  { id: 'reading-a-label-in-practice', label: 'Reading a label in practice' },
  { id: 'where-origin-sits', label: 'Where Origin sits' },
  { id: 'common-questions', label: 'Common questions' },
  { id: 'sources', label: 'Sources' },
];

export default function Blog() {
  return (
    <div className="relative w-full min-h-screen pt-32 sm:pt-40 md:pt-48 pb-24 px-6 sm:px-12 md:px-16 font-suisse antialiased text-white selection:bg-[#A52A2C] selection:text-white">
      {/* Site-wide Eclipse Background */}
      <div className="artisun-bg fixed inset-0 -z-10" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[880px] mx-auto space-y-12 sm:space-y-16">
        {/* Hero / Header Section */}
        <header className="space-y-6">
          {/* Eyebrow */}
          <div className="text-[12px] tracking-[0.28em] uppercase font-semibold text-white/80">
            ISO 24442
          </div>

          {/* Main Title */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-light leading-[1.04] tracking-tight text-white">
            What Is PA in Sunscreen? PA+ to PA++++, Explained
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-[14px] tracking-wide font-light text-white/80">
            <span>Artisun Skinwear</span>
            <span>August 15, 2026</span>
            <span>10 min read</span>
          </div>
        </header>

        {/* ── Table of Contents (Transparent Box) ── */}
        <section className="w-full rounded-2xl p-6 sm:p-10 bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="text-[12px] tracking-[0.26em] uppercase font-semibold text-white/60 mb-6">
            In this article
          </div>

          <div className="divide-y divide-white/10">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center justify-between py-3.5 text-[14.5px] sm:text-[15.5px] font-light transition-all duration-150"
              >
                <span className="text-white underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">
                  {item.label}
                </span>
                <span className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all text-base pl-4">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Lead Paragraph ── */}
        <div className="text-[15px] sm:text-[16px] leading-[1.75] font-light text-white pt-4">
          <p>
            PA is a sunscreen&apos;s UVA rating, set by the Japanese grading system and measured by the persistent
            pigment darkening test in ISO 24442. PA+ means a UVA protection factor of 2 to under 4, PA++ is 4 to
            under 8, PA+++ is 8 to under 16, and PA++++ is 16 or higher.
          </p>
        </div>

        {/* ── Article Sections ── */}
        <div className="space-y-14 sm:space-y-16 text-[14.5px] sm:text-[16px] leading-[1.75] font-light text-white">

          {/* Section 1 */}
          <section id="what-pa-measures-and-what-spf-leaves-out" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                What PA measures, and what SPF leaves out
              </h2>
            </div>
            <p>
              The two ratings on a sunscreen bottle are not two versions of the same measurement. SPF describes protection against UVB, the shorter wavelengths that cause sunburn. PA describes protection against UVA, the longer wavelengths that reach further into skin and drive most of what gets called photoageing. A high SPF with no UVA rating beside it has told you about one half of the spectrum and stayed silent on the other.
            </p>
            <p>
              UVA also behaves differently through a day and through a year. It passes through window glass, and it passes through cloud. It does not fall away in the monsoon the way the burning wavelengths seem to, which is why the UVA half of the label is the half that matters most on the days you assume you are safe, at a desk beside a window or in a car under an overcast July sky.
            </p>
            <p>
              So PA is not a bonus number printed next to the important one. It is the rating that covers everything SPF was never designed to measure.
            </p>
          </section>

          {/* Section 2 */}
          <section id="the-four-bands-and-the-numbers-underneath-them" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                The four bands, and the numbers underneath them
              </h2>
            </div>
            <p>
              The plus signs look like a rough scale, the way a chilli rating on a menu does. They are not. Each band maps onto a measured UVA protection factor, and the boundaries are exact.
            </p>

            {/* Minimalist Data Table */}
            <div className="overflow-x-auto my-6 border-y border-white/15 py-3">
              <table className="w-full text-left border-collapse text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="border-b border-white/15 font-medium text-white/70">
                    <th className="py-3 pr-6 font-normal">Rating</th>
                    <th className="py-3 px-6 font-normal">UVA protection factor</th>
                    <th className="py-3 pl-6 font-normal">What that means in practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-3.5 pr-6 font-medium text-white">PA+</td>
                    <td className="py-3.5 px-6 text-white">2 to under 4</td>
                    <td className="py-3.5 pl-6 text-white/90">Some UVA protection. Low by any current standard</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-medium text-white">PA++</td>
                    <td className="py-3.5 px-6 text-white">4 to under 8</td>
                    <td className="py-3.5 pl-6 text-white/90">Moderate</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-medium text-white">PA+++</td>
                    <td className="py-3.5 px-6 text-white">8 to under 16</td>
                    <td className="py-3.5 pl-6 text-white/90">High</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-medium text-white">PA++++</td>
                    <td className="py-3.5 px-6 text-white">16 or above</td>
                    <td className="py-3.5 pl-6 text-white/90">Very high, with no stated ceiling</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              A UVA protection factor of 8 means the tested layer let through roughly an eighth of the UVA dose that bare skin received. That is the whole of what the number claims. It is a ratio between two doses under laboratory conditions, not a percentage of the sun blocked and not a duration of safety.
            </p>
            <p>
              The system came out of Japan rather than out of a regulator. The Japan Cosmetic Industry Association published it in 1996 with three grades, then revised it in 2012 to add a fourth, which came into use in January 2013 and was keyed to the ISO test method. Brands elsewhere, including in India, use it voluntarily. That is worth knowing, because a rating a company adopts by choice is only as good as the testing behind it.
            </p>
          </section>

          {/* Section 3 */}
          <section id="pa-has-no-upper-limit-and-that-changes-how-you-read-it" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                PA++++ has no upper limit, and that changes how you read it
              </h2>
            </div>
            <p>This is the part the label cannot tell you, and the part almost nobody writes down.</p>
            <p>
              Three of the four bands are closed at both ends. PA+++ means the measured value landed somewhere between 8 and 16, and you know roughly where you are. PA++++ is open. It means 16 or more, and it says nothing about how much more.
            </p>
            <p>
              A sunscreen measured at 16 and a sunscreen measured at 40 carry the same four plus signs. One lets through around a sixteenth of the UVA reaching bare skin; the other lets through around a fortieth. They are more than twice as far apart as PA+ is from PA++, and the front of the bottle prints them identically.
            </p>
            <p>
              That is not a scandal, and it is not an argument against the rating. PA++++ still tells you a product cleared a genuinely demanding bar, and clearing it is not trivial. But it means two things that are worth carrying around. Comparing two PA++++ sunscreens on their UVA rating alone is not possible, because the rating has already collapsed the difference. And a brand that publishes its measured UVA protection factor as a number is giving you information the plus signs threw away.
            </p>
          </section>

          {/* Section 4 */}
          <section id="how-the-rating-is-actually-measured" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                How the rating is actually measured
              </h2>
            </div>
            <p>
              ISO 24442, now in its 2022 edition, sets out the in vivo method for UVA protection. It is a human panel test, not a machine reading, and the details of it explain a lot about what the number can and cannot promise.
            </p>
            <p>
              The endpoint is persistent pigment darkening. UVA does not redden skin reliably, so sunburn cannot be used as the signal the way it is in SPF testing. What UVA does do is oxidise melanin already present in the skin, producing a light, even tan that is still visible hours later. The test finds the smallest UVA dose that produces that darkening on unprotected skin, then finds the smallest dose that produces it through the sunscreen. The ratio between the two is the UVA protection factor, read between two and twenty-four hours after exposure.
            </p>
            <p>Two conditions of that test matter more than the result:</p>
            <p>
              The panel is small. A minimum of ten volunteers, with more added if the numbers scatter. That is enough for a defensible figure and not enough to describe every skin on earth, and it is one honest reason the same formula can be reported slightly differently by two laboratories.
            </p>
            <p>
              The layer is thick. The sunscreen is spread at 2 milligrams per square centimetre of skin, weighed before and after so the dose is known rather than estimated. Every PA rating you have ever seen describes performance at that thickness.
            </p>
          </section>

          {/* Section 5 */}
          <section id="the-dose-problem-which-no-rating-on-the-bottle-can-fix" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                The dose problem, which no rating on the bottle can fix
              </h2>
            </div>
            <p>
              Two milligrams per square centimetre is roughly a quarter teaspoon for a face and neck, or what the two-finger method is trying to get you to. It is considerably more than most people wear, and that gap is not a personal failing. It is the normal finding, repeated across decades of measurement in many countries, and we went through the evidence for it in{' '}
              <a
                href="https://artisunskin.com/blogs/artifacts/lightweight-sunscreen-what-makes-one-feel-light"
                className="text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                our piece on what makes a sunscreen feel light
              </a>.
            </p>
            <p>
              The consequence for UVA is straightforward and unforgiving. Protection does not fall off in proportion to the layer you leave out. It falls off faster than that, because the film thins unevenly and the gaps in it are not paying attention to your intentions. A PA++++ sunscreen worn at half the tested dose is not delivering half of PA++++. It is delivering something lower, and nobody can tell you exactly how much lower, because the only dose it was ever measured at is the one on the test protocol.
            </p>
            <p>
              Which puts the rating in its proper place. PA++++ describes the best the formula can do. What you get is that number minus whatever you left in the bottle, and the second half of that sentence is usually the larger term.
            </p>
          </section>

          {/* Section 6 */}
          <section id="why-the-uva-half-matters-more-in-india-than-the-label-suggests" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Why the UVA half matters more in India than the label suggests
              </h2>
            </div>
            <p>
              Indian sun care conversation is built almost entirely around burning and tanning, which are UVB stories. The UVA story is quieter and longer.
            </p>
            <p>
              UVA reaches ground level in far greater quantity than UVB and stays comparatively steady through the day, so the early morning and late afternoon hours people treat as safe are not especially safe from it. It passes through window glass, which means a commute and a desk are exposure rather than shelter. And it moves less with season and cloud than UVB does, so the months when nobody feels they are being burnt are not months off.
            </p>
            <p>
              None of this is a reason for alarm. It is a reason to treat the PA rating as the number you check first on a sunscreen you are going to wear on ordinary days, indoors as much as out, rather than the number you skim past on the way to the SPF.
            </p>
            <p>
              How much of any of it you need on a given week is a weather question more than a skin type question, and that is the subject of{' '}
              <a
                href="https://artisunskin.com/blogs/artifacts/sun-care-by-weather-not-skin-type"
                className="text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                our month-by-month guide to sun care in Indian weather
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section id="what-pa-does-not-tell-you" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                What PA does not tell you
              </h2>
            </div>
            <p>A rating is a summary, and summaries drop things. Four of the things it drops are worth knowing about.</p>
            <ol className="list-decimal pl-6 space-y-3 marker:text-white/60">
              <li>
                <strong>Which filters did the work.</strong> Two products can reach the same band through very different chemistry, and the chemistry decides how the layer feels and whether it leaves a cast on deeper skin.
              </li>
              <li>
                <strong>How well the protection holds up.</strong> Some UV filters degrade under sustained light more than others. The test measures a fresh layer, so photostability sits outside the number entirely.
              </li>
              <li>
                <strong>How it survives a real day.</strong> Sweat and an absent-minded hand on the face both remove film that the laboratory never had to account for.
              </li>
              <li>
                <strong>Whether you will wear enough of it.</strong> The largest variable in the whole equation, and the one no rating system has ever attempted to capture.
              </li>
            </ol>
            <p>
              There is also a broader caution about UVA labelling that has nothing to do with PA. Andrews and colleagues tested 51 sunscreens sold in the United States, where PA is not used and products carry only a broad spectrum statement, and found their average UVA protection came to roughly a quarter of what the labelled SPF implied. It is a different market and a different method, and it does not transfer directly to a PA-rated product. What it does show is how little the phrase broad spectrum guarantees on its own, and why a graded UVA rating is worth having at all.
            </p>
          </section>

          {/* Section 8 */}
          <section id="reading-a-label-in-practice" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Reading a label in practice
              </h2>
            </div>
            <p>What this adds up to, standing in front of a shelf or a product page.</p>
            <ol className="list-decimal pl-6 space-y-3 marker:text-white/60">
              <li>Look for a PA rating at all. A sunscreen with an SPF number and nothing about UVA has not made a claim you can check.</li>
              <li>Treat PA+++ as the sensible floor for daily wear in Indian conditions, and PA++++ as better where you can get it.</li>
              <li>Do not try to separate two PA++++ products on the rating. Compare the filter system and the finish instead.</li>
              <li>Give more weight to what you will wear generously than to the last plus sign. The dose gap is larger than the gap between the top two bands.</li>
              <li>Check whether the brand states its UVA protection factor as a number. Very few do, and it is a fair signal when one does.</li>
            </ol>
          </section>

          {/* Section 9 */}
          <section id="where-origin-sits" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Where Origin sits
              </h2>
            </div>
            <p>
              <Link
                href="/origin"
                className="text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                Origin
              </Link>{' '}
              is rated SPF 50+ and PA++++. It is a milk emulsion in a 50 ml glass bottle with a pump, at ₹1,499, built on three organic UV filters: ethylhexyl methoxycinnamate, ethylhexyl salicylate, and diethylamino hydroxybenzoyl hexyl benzoate. There is no zinc oxide and no titanium dioxide in it, which is the honest reason it does not leave a cast on deeper skin.
            </p>
            <p>
              <Link
                href="/aura"
                className="text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                Aura
              </Link>{' '}
              is the gel, dosed in pearls from a 50 g glass jar with a spatula, at ₹1,799, worn on its own or under makeup rather than layered over Origin.
            </p>
            <p>
              The rating is the easy part to print. The reason Origin was built as a single layer that does the work of a serum, a moisturiser, a sunscreen and a primer at once is that a layer you are willing to wear at a proper dose, twice on a hot day, is worth more than a higher number worn thinly. That is the whole argument, and everything above is why.
            </p>
          </section>

          {/* ── Common Questions Section ── */}
          <section id="common-questions" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Common questions
              </h2>
            </div>
            <div className="space-y-6 pt-2">
              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  What is PA+++ in sunscreen?
                </h3>
                <p className="text-white">
                  PA+++ means the sunscreen measured a UVA protection factor between 8 and just under 16 in laboratory testing. It is a high level of UVA protection and a reasonable floor for daily wear.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  What is PA++++ in sunscreen?
                </h3>
                <p className="text-white">
                  PA++++ means a measured UVA protection factor of 16 or above. It is the top band and it has no upper limit, so a product measured at 16 and one measured at 40 both carry it.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  Is PA++++ better than PA+++?
                </h3>
                <p className="text-white">
                  Yes, on the rating. PA++++ starts where PA+++ ends. The difference in practice is smaller than the difference between wearing a proper dose and wearing half of one, so it is not the thing to optimise first.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  Does SPF cover UVA protection?
                </h3>
                <p className="text-white">
                  No. SPF is measured against sunburn, which is almost entirely UVB. A sunscreen can carry a high SPF and offer weak UVA protection, which is exactly why a separate UVA rating exists.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  Do I need PA++++ in India?
                </h3>
                <p className="text-white">
                  PA+++ is adequate for most daily wear and PA++++ is better where it is available at a texture you will wear generously. Indian UVA levels are high year round and change less with season than UVB does, so the UVA rating is worth checking every month of the year.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal">
                  Does the PA rating matter indoors?
                </h3>
                <p className="text-white">
                  Yes, more than SPF does. UVA passes through window glass while most UVB is filtered out by it, so a day spent beside a window is largely a UVA exposure. Screens themselves emit a negligible amount of UV.
                </p>
              </div>
            </div>
          </section>

          {/* ── Sources Section ── */}
          <section id="sources" className="space-y-6 pt-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Sources
              </h2>
            </div>
            <ul className="list-disc pl-6 space-y-4 text-white marker:text-white/60">
              <li>
                ISO 24442:2022, <em>Cosmetics — Sun protection test methods — In vivo determination of sunscreen UVA protection</em>. 2nd edition, ISO/TC 217. Specifies the persistent pigment darkening endpoint, the 2 mg/cm² application dose and the minimum panel size.
              </li>
              <li>
                Andrews D, et al. <em>Laboratory testing of sunscreens on the US market finds lower in vitro SPF values than on labels and even less UVA protection.</em> Photodermatology, Photoimmunology &amp; Photomedicine, 2022. doi:10.1111/phpp.12738
              </li>
              <li>
                Japan Cosmetic Industry Association PA grading system: three grades from 1996, revised to four grades in 2012 and in use from January 2013, keyed to the ISO 24442 test method.
              </li>
            </ul>
          </section>

          {/* ── Author attribution card ── */}
          <div className="pt-4">
            <div className="w-full rounded-2xl p-6 sm:p-8 bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="font-editorial text-xl sm:text-2xl text-white">
                Artisun Skinwear
              </span>
            </div>
          </div>

        </div>

        {/* ── More Like This (3 Terracotta Cards) ── */}
        <section className="space-y-6 pt-10 border-t border-white/10">
          <div>
            <div className="text-[12px] tracking-[0.26em] uppercase font-semibold text-white/80 mb-2">
              More Like This
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-white font-light">
              Keep exploring Artifacts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1 */}
            <a
              href="/blogs/artifacts/how-sunscreen-should-feel"
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#982b26] hover:bg-[#85231f] border border-white/10 transition-all duration-200 min-h-[260px]"
            >
              <div className="space-y-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80 block">
                  dry-down
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-white leading-snug font-normal">
                  How Sunscreen Should Feel: A Guide to Texture and Finish
                </h3>
              </div>
              <div className="text-[13px] text-white/80 pt-4">
                Aug 18, 2026 · 11 min
              </div>
            </a>

            {/* Card 2 */}
            <a
              href="/blogs/artifacts/lightweight-sunscreen-what-makes-one-feel-light"
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#982b26] hover:bg-[#85231f] border border-white/10 transition-all duration-200 min-h-[260px]"
            >
              <div className="space-y-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80 block">
                  dose
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-white leading-snug font-normal">
                  Lightweight Sunscreen: What Makes One Feel Light, and Why It Matters
                </h3>
                <p className="text-[13.5px] text-white/90 line-clamp-2">
                  Lightweight describes how a sunscreen dries down, not how well it protects. What emolli...
                </p>
              </div>
              <div className="text-[13px] text-white/80 pt-4">
                Aug 14, 2026 · 11 min
              </div>
            </a>

            {/* Card 3 */}
            <a
              href="/blogs/artifacts/sun-care-by-weather-not-skin-type"
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#982b26] hover:bg-[#85231f] border border-white/10 transition-all duration-200 min-h-[260px]"
            >
              <div className="space-y-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80 block">
                  humidity
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-white leading-snug font-normal">
                  Sunscreen in Indian Weather: A Month-by-Month Guide
                </h3>
                <p className="text-[13.5px] text-white/90 line-clamp-2">
                  A month-by-month guide to what India&apos;s weather does to a sunscreen film, and how to adj...
                </p>
              </div>
              <div className="text-[13px] text-white/80 pt-4">
                Aug 13, 2026 · 14 min
              </div>
            </a>
          </div>
        </section>

        {/* ── Newsletter Section ── */}
        <section className="pt-12 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-[420px]">
            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal tracking-tight">
              Get Artifacts in Your Inbox
            </h2>
            <p className="text-[14px] sm:text-[15px] text-white/80 font-light">
              New weather-smart skincare notes from the Journal, sent straight to you. No spam, ever.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full lg:max-w-[420px] rounded-full border border-white/30 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md focus-within:border-white transition-colors"
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent text-white placeholder:text-white placeholder:opacity-100 text-base outline-none px-2"
              required
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="text-white hover:translate-x-0.5 transition-all text-lg px-2"
            >
              &rarr;
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}