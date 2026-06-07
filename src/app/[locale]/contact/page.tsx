import { setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/ui/page-header";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Contact",
    description:
      "Get in touch with our enterprise sales team. We're here to help you find the right AI solution.",
    path: `/${locale}/contact`,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        badge="Contact"
        title="Let's Talk"
        description="Tell us about your project and our enterprise team will get back to you within 24 hours."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <MotionWrapper>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.address}</p>
                    </div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="font-semibold mb-4">Schedule a Call</h3>
                  <div className="aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Calendly embed placeholder</p>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.2}>
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-brand-500/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Map placeholder</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
