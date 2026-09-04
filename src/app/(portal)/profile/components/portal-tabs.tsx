"use client";

import { useState } from "react";
import { User, Briefcase, Receipt, Shield, MessageSquare, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileForm from "../profile-form";
import { ProjectsTab } from "./projects-tab";
import { BillingTab } from "./billing-tab";
import { VaultTab } from "./vault-tab";
import { SupportTab } from "./support-tab";
import { OnboardingTab } from "./onboarding-tab";

interface PortalTabsProps {
  portalData: any;
  profileDetails: {
    fullName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
  };
}

export function PortalTabs({ portalData, profileDetails }: PortalTabsProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Details", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "billing", label: "Billing", icon: Receipt },
    { id: "vault", label: "Document Vault", icon: Shield },
    { id: "support", label: "Support", icon: MessageSquare },
    { id: "onboarding", label: "Onboarding", icon: ClipboardList },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileForm 
            initialFullName={profileDetails.fullName}
            email={profileDetails.email}
            initialCompanyName={profileDetails.companyName}
            initialPhoneNumber={profileDetails.phoneNumber}
          />
        );
      case "projects":
        return <ProjectsTab projects={portalData.projects} />;
      case "billing":
        return <BillingTab invoices={portalData.invoices} />;
      case "vault":
        return <VaultTab files={portalData.clientFiles} user={portalData.user} />;
      case "support":
        return <SupportTab tickets={portalData.supportTickets} />;
      case "onboarding":
        return <OnboardingTab onboarding={portalData.onboarding} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 md:p-10 w-full max-w-4xl mx-auto mt-6">
      {/* Horizontal Navigation */}
      <div className="w-full">
        <div className="bg-[rgba(10,15,30,0.6)] border border-white/[0.08] rounded-2xl p-2 backdrop-blur-2xl shadow-xl">
          <nav className="flex flex-row gap-2 overflow-x-auto justify-start sm:justify-center custom-scrollbar pb-2 sm:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.4)]" 
                      : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Centered Main Content Area */}
      <div className="w-full min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
