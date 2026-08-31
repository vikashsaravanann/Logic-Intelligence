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
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto mt-8">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 sticky top-24">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                    isActive 
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
