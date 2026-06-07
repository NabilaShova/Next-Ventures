"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import { teamMembers } from "@/data/about";

export function TeamSection() {
  return (
    <section>
      <MotionWrapper className="mb-12 text-center">
        <h2 className="heading-md">Leadership Team</h2>
        <p className="mt-4 text-muted-foreground">
          Experienced leaders from top tech companies building the future of enterprise AI.
        </p>
      </MotionWrapper>

      <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <StaggerItem key={member.name}>
            <div className="rounded-2xl border bg-card p-6 text-center transition-all hover:shadow-float">
              <Avatar className="mx-auto h-20 w-20">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
