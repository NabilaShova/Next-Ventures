"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: siteConfig.name,
    siteDescription: siteConfig.description,
    contactEmail: siteConfig.contact.email,
    contactPhone: siteConfig.contact.phone,
    emailNotifications: true,
    demoRequestAlerts: true,
    leadAlerts: true,
    analyticsEnabled: true,
    maintenanceMode: false,
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AdminShell
      title="Settings"
      description="Configure platform preferences and notifications"
    >
      <form onSubmit={handleSave} className="mx-auto max-w-2xl space-y-8">
        <section className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold">General</h2>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) =>
                setSettings((s) => ({ ...s, siteName: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings((s) => ({ ...s, siteDescription: e.target.value }))
              }
              rows={3}
            />
          </div>
        </section>

        <section className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, contactEmail: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, contactPhone: e.target.value }))
                }
              />
            </div>
          </div>
        </section>

        <section className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Separator />
          <div className="space-y-4">
            {[
              {
                id: "emailNotifications",
                label: "Email Notifications",
                desc: "Receive email alerts for important events",
              },
              {
                id: "demoRequestAlerts",
                label: "Demo Request Alerts",
                desc: "Get notified when new demo requests arrive",
              },
              {
                id: "leadAlerts",
                label: "Lead Alerts",
                desc: "Get notified when new leads are captured",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={settings[item.id as keyof typeof settings] as boolean}
                  onCheckedChange={(v) =>
                    setSettings((s) => ({ ...s, [item.id]: v }))
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Platform</h2>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Analytics Tracking</p>
                <p className="text-sm text-muted-foreground">
                  Enable client-side analytics event collection
                </p>
              </div>
              <Switch
                checked={settings.analyticsEnabled}
                onCheckedChange={(v) =>
                  setSettings((s) => ({ ...s, analyticsEnabled: v }))
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">
                  Show maintenance page to visitors
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(v) =>
                  setSettings((s) => ({ ...s, maintenanceMode: v }))
                }
              />
            </div>
          </div>
        </section>

        <Button type="submit">
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </form>
    </AdminShell>
  );
}
