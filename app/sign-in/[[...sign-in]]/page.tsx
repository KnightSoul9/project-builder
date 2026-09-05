import { SignIn } from "@clerk/nextjs";
import { Check } from "lucide-react";

const features = [
  "Collaborative project workspaces",
  "AI-powered architecture generation",
  "Shared canvas editing and specs",
];

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-4 py-8 text-copy-primary">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-surface-border bg-bg-surface">
        <div className="grid min-h-[640px] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="hidden items-center justify-center border-r border-surface-border bg-bg-base p-8 lg:flex">
            <div className="w-full max-w-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-bg-surface text-base font-semibold text-brand">
                  G
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-copy-muted">
                    Ghost AI
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-copy-muted">
                    Welcome back
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-copy-primary">
                    Design systems with your team.
                  </h1>
                </div>

                <p className="text-base leading-7 text-copy-secondary">
                  Turn architecture ideas into shared canvas workspaces and
                  generate polished technical specs in one flow.
                </p>

                <ul className="space-y-4 text-sm text-copy-secondary">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-dim text-brand">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center p-4 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                forceRedirectUrl="/editor"
                fallbackRedirectUrl="/editor"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
