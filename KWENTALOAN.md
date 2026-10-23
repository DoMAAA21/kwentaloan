# Kwentaloan — Product Requirements Document

## 1. Product Overview

**Product name:** Kwentaloan  
**Product type:** Free, web-based financial calculator  
**Initial market:** Philippines  
**Primary monetization:** Display advertising (Google AdSense)  
**Initial focus:** Home loans and mortgage amortization

### Product vision

Build a fast, mobile-friendly website that helps Filipinos estimate home-loan payments and understand the long-term cost of borrowing. Visitors can use the calculator without signing up, paying, or providing personal information.

The experience is inspired by a spreadsheet-style mortgage calculator, but redesigned for the web with clear inputs, readable results, charts, and an annual amortization schedule.

### Core value proposition

> Calculate your estimated monthly home-loan payment, see how much interest you may pay, and understand how extra payments could change your loan.

### Product principles

- Free to use; no account required.
- Mobile-first and responsive.
- Philippine peso (₱) as the default currency.
- Transparent assumptions and calculations.
- Results update when inputs change, with no unnecessary page reload.
- Advertising must not obstruct the calculator or manipulate users into clicking ads.
- The calculator provides estimates, not a loan offer, bank approval, or financial advice.

## 2. Target Users

- Filipinos considering buying a house or condominium.
- Buyers comparing bank and Pag-IBIG financing scenarios.
- Homeowners evaluating loan terms or extra principal payments.
- People estimating affordability before speaking with a lender.

## 3. MVP Scope

### P0 — Required for launch

#### A. Loan input panel

Inputs:
- Loan amount (₱)
- Loan term in years
- Annual interest rate (%)
- Loan start year
- Loan start month
- Optional loan type / rate assumption note

Defaults should be clearly identified as examples, not recommended or guaranteed lender rates.

Validation:
- Loan amount must be greater than zero.
- Term must be a supported positive number of years.
- Annual interest rate must be within a reasonable configurable range and cannot be negative.
- Start month and year must be valid.
- Show helpful inline errors; do not silently accept invalid inputs.

#### B. Mortgage summary

Display:
- Estimated monthly principal-and-interest payment
- Number of monthly payments
- Total interest over the modeled term
- Total principal plus interest paid
- Estimated payoff date
- Starting loan amount

Clearly state whether insurance, taxes, bank fees, appraisal fees, and other charges are excluded.

#### C. Amortization schedule

Provide a monthly schedule with:
- Payment number
- Payment date
- Opening balance
- Payment amount
- Interest portion
- Principal portion
- Extra principal payment (if applicable)
- Closing balance

Include a toggle or tab for an annual summary:
- Year
- Interest paid
- Principal paid
- Total payments
- Extra principal paid
- End-of-year balance

The annual view should aggregate the underlying monthly schedule, rather than use separate approximate calculations.

#### D. Extra / advance principal payments

Allow users to add multiple planned extra-payment entries:
- Month
- Year
- Amount (₱)
- Optional note

Model extra payments as additional principal paid on top of the scheduled monthly payment. Do not treat an extra payment as a regular payment or as a guaranteed bank-approved prepayment.

Show:
- Estimated interest saved versus the baseline schedule
- Estimated earlier payoff date
- Estimated reduction in number of payments
- Updated balance and amortization schedule

Define the assumptions: extra payments are applied directly to principal on the selected date, without fees or prepayment penalties, unless the user configures otherwise. Explain that actual lender rules may differ.

#### E. Salary-based affordability estimator

Inputs:
- Gross monthly income (₱)
- Optional existing monthly debt payments (₱)
- Configurable share of gross income assumed available for housing payments

Display:
- User-selected estimated affordable monthly payment
- Illustrative loan amount supported by that payment, based on the selected rate and term

Do not label the result as the amount a bank will approve. Clearly state that lenders use their own underwriting criteria and may account for net income, other debt, expenses, credit profile, employment, and property details.

#### F. Results visualization

Include:
- Principal versus total interest summary
- Balance-over-time chart
- Optional baseline versus extra-payment comparison

Charts must have accessible labels and a non-chart alternative such as a summary table.

#### G. Responsive layout

Desktop:
- Inputs and headline results side by side.
- Amortization table in a wide content area.
- Annual summary can sit alongside or below the calculator.

Mobile:
- Inputs stacked vertically.
- Key results near the top.
- Tables horizontally scrollable or switch to a compact row/card layout.
- No horizontal page overflow.
- Ads must not cover controls or results.

### P1 — Good additions after the core calculator works

- Save or share a scenario through a URL containing non-sensitive calculator inputs.
- Download amortization schedule as CSV.
- Print-friendly summary.
- Compare two or three loan scenarios.
- Presets clearly labeled as examples, not current bank offers.
- FAQ section explaining amortization, fixed versus variable rates, and extra principal payments.
- Search-engine-friendly educational pages.

### Out of scope for MVP

- Loan applications or bank referrals.
- Collecting bank credentials, government IDs, or sensitive financial records.
- Claiming that the calculator predicts approval.
- Real-time bank-rate claims without a reliable, maintained source.
- User accounts, cloud-saved financial profiles, or paid subscriptions.

## 4. Calculation Rules

Use a consistent monthly amortization model.

Let:
- `P` = starting principal
- `r` = annual nominal interest rate divided by 12
- `n` = number of monthly payments

For a fixed rate and regular end-of-month payments:

If `r > 0`:

`monthlyPayment = P * r * (1 + r)^n / ((1 + r)^n - 1)`

If `r = 0`:

`monthlyPayment = P / n`

For each month:
- `interest = openingBalance * monthlyRate`
- `scheduledPrincipal = scheduledPayment - interest`
- `actualPrincipal = scheduledPrincipal + extraPrincipal`, capped at the amount needed to settle the remaining balance
- `closingBalance = max(0, openingBalance - actualPrincipal)`

The final payment must be capped to the remaining amount due so the balance cannot become negative. Stop the schedule once the loan is paid off.

### Important calculation requirements

- Calculate using full internal precision; round only for display.
- State the timing convention for monthly payments and extra payments.
- The annual breakdown must sum its monthly rows.
- Total interest and total payments must derive from the generated schedule.
- Extra-payment savings must compare two schedules using identical baseline inputs.
- Recalculate the schedule when the user changes the amount, term, rate, start date, or extra payments.
- Handle zero-interest loans and early payoff safely.
- Unit-test rounding and final-payment edge cases.

### Rate assumptions and limitations

The initial MVP models a fixed annual rate throughout the selected term. Many real-world Philippine home loans have repricing periods or variable rates. Do not imply that a fixed-rate estimate is the actual future bank payment if the rate can change. A future version can support rate changes by period.

## 5. UX / Page Structure

### Main page

1. Header
   - Product name / logo
   - Links: Home Loan Calculator, Guides, About
2. Intro
   - Clear heading: “Kwentaloan” (Philippine home loan calculator)
   - Short explanation of what the tool calculates
3. Calculator workspace
   - Loan inputs
   - Mortgage summary cards
   - Affordability estimator
   - Extra-payment planner
4. Results
   - Principal-versus-interest visualization
   - Amortization schedule with monthly / annual views
   - Baseline-versus-extra-payment comparison
5. Explanation and FAQs
6. Footer
   - Privacy Policy
   - Terms / Disclaimer
   - Contact
   - About

### UX requirements

- Use plain language rather than banking jargon where possible.
- Use Philippine pesos and readable number formatting.
- Inputs should be editable and keyboard accessible.
- Label every field and chart.
- Explain “interest,” “principal,” “amortization,” and “extra principal payment.”
- Make the assumptions visible near the results.
- Do not hide key caveats in tiny text.
- Show a useful example on first visit, while making clear that it is sample data.

## 6. Advertising and Monetization

### Business model

The site is free to visitors and earns revenue from display ads, primarily through Google AdSense after the site is eligible and approved.

### Suggested ad placements

Start conservatively:
1. One responsive display placement after the intro and before the calculator, without pushing the calculator too far down.
2. One placement after the main calculator summary or after the amortization results.
3. Optional placement within long educational content, separated clearly from interactive controls.

Do not put ads:
- Between an input label and its field.
- Over charts, buttons, dropdowns, or the amortization table.
- In a way that resembles a calculator control or a download button.
- So close to controls that accidental clicks are likely.
- In pop-ups that block access to the calculator.

Start with two or three placements and measure performance and user experience before adding more. More placements do not guarantee more revenue.

### AdSense readiness checklist

- Publish useful original content, not just a thin page consisting of a calculator and ads.
- Add About, Contact, Privacy Policy, and Terms / Disclaimer pages.
- Use a valid domain and ensure the site is accessible to Google's review systems.
- Follow current AdSense publisher policies and consent requirements that apply to the site's visitors and ad setup.
- Never click own ads, incentivize ad clicks, or ask visitors to click ads.
- Do not promise a specific income level or approval timeline.
- Ensure ads do not interfere with the tool or cause accidental clicks.

## 7. SEO and Content Strategy

Focus on useful, intent-driven Philippine home-financing searches, for example:
- Home loan calculator Philippines
- House loan monthly amortization calculator
- Pag-IBIG housing loan calculator (clearly mark assumptions and avoid claiming official status)
- Bank home loan calculator Philippines
- Home loan interest calculator
- Mortgage amortization schedule Philippines
- Home loan extra payment calculator
- How much house loan can I afford in the Philippines

Create genuinely helpful supporting guides, such as:
- How monthly home-loan amortization is calculated
- Principal versus interest explained
- How extra principal payments affect interest
- Fixed interest rate versus repricing
- Costs not included in a basic mortgage calculator

Avoid keyword-stuffed pages or mass-produced articles without useful original information. Keep any bank rates or fees dated and sourced if they are added later.

## 8. Privacy, Security, and Trust

- Perform calculations in the browser for the MVP; no server storage is needed for normal use.
- Do not request names, salaries, or debt details from a backend unless there is a clear need and transparent consent.
- If sharing scenarios by URL, explain that URL parameters may be visible in browser history or shared links; avoid putting personal details in the URL.
- Publish a clear privacy policy describing advertising cookies and third-party services.
- Implement any consent mechanism required for the applicable regions and ad configuration.
- Make no guarantee that results match a lender's final computation.

## 9. Suggested Technical Implementation

Use the developer's preferred stack; a suitable starting option is:
- Next.js / React with TypeScript
- Responsive CSS or a component library
- A pure calculation module independent of UI components
- Client-side state for calculator inputs and derived results
- Automated unit tests for amortization and prepayment logic
- Lightweight chart library, if needed
- Analytics only with appropriate privacy disclosures

Suggested component structure:

```text
app/
  page.tsx
  layout.tsx
  privacy/page.tsx
  terms/page.tsx
  about/page.tsx
  contact/page.tsx
  guides/
components/
  calculator/
    LoanInputs.tsx
    MortgageSummary.tsx
    AffordabilityEstimator.tsx
    ExtraPaymentPlanner.tsx
    AmortizationSchedule.tsx
    AnnualBreakdown.tsx
    LoanCharts.tsx
  ads/
    AdSlot.tsx
lib/
  mortgage/
    calculatePayment.ts
    buildAmortizationSchedule.ts
    calculatePrepaymentSavings.ts
    calculateAffordability.ts
  formatters/
tests/
  mortgage.test.ts
```

This is an illustrative structure, not a requirement to use Next.js. Keep calculations separate from UI and advertising code.

### Ad component rules

- Load the AdSense script once at the application/layout level, using the exact publisher ID and setup supplied by Google.
- Create an `AdSlot` component for approved ad units.
- Use the actual ad slot IDs supplied by AdSense; do not invent IDs.
- Avoid pushing the same ad unit multiple times due to React development remounts or rerenders.
- Do not expect real ads to display until the account, site, and ad unit are properly configured.
- Keep a stable reserved area for ads where appropriate, but avoid oversized blank blocks.
- Keep ad rendering separate from calculation logic.

## 10. Acceptance Criteria

The MVP is ready for launch when:

- A visitor can calculate a payment from loan amount, term, and interest rate.
- Changing an input updates the payment, totals, chart, and schedule correctly.
- The schedule contains exactly the modeled payment period unless paid off earlier.
- Total scheduled principal plus extra principal equals the amount borrowed, within defined rounding tolerance.
- The balance never becomes negative.
- Total interest equals the sum of monthly interest entries.
- An extra-payment scenario can be compared with a baseline scenario.
- The affordability estimate clearly identifies its assumptions and is not represented as bank approval.
- The page works on mobile and desktop and supports keyboard navigation.
- Privacy, terms, contact, and disclaimer pages are available.
- Ad placements do not obstruct use of the calculator.
- Tests cover zero interest, small balances, long terms, extra payments, final-payment adjustment, and early payoff.

## 11. Success Metrics

Track aggregate, privacy-conscious metrics:
- Organic search visits
- Calculator starts and completed calculations
- Returning visitors
- Average engagement with the calculator and guides
- Page performance and Core Web Vitals
- Ad impressions and page RPM after monetization
- Revenue per visitor, balanced against usability

Do not optimize only for ad impressions. A useful calculator that earns repeat visits and search traffic is the long-term goal.

## 12. Recommended Build Order

1. Implement and test the mortgage calculation engine.
2. Build the input panel and monthly payment summary.
3. Generate the monthly amortization schedule and annual aggregation.
4. Add extra principal payments and savings comparison.
5. Add the salary-based affordability estimator.
6. Make the experience responsive and accessible.
7. Publish original supporting guides and policy pages.
8. Deploy to a custom domain and test performance.
9. Apply to AdSense and implement the provided code after setup/approval.
10. Measure search traffic, usability, and revenue; iterate based on evidence.

## Disclaimer

This tool provides estimates for educational purposes only. It is not affiliated with, endorsed by, or an official calculator of Pag-IBIG Fund or any bank. Actual payments, interest, fees, insurance, taxes, repricing, prepayment rules, and loan approval depend on the lender and the borrower's circumstances. Users should verify terms directly with the relevant lender.
