import { Html, Head, Body, Container, Font, Preview } from "@react-email/components";
import * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
  preview?: string;
}

/**
 * On-brand transactional shell.
 * Inbox avatar/DP is controlled by the Zoho mailbox photo + BIMI DNS —
 * HTML cannot set the Gmail/Outlook sender face next to the From name.
 */
export const EmailLayout = ({ children, preview }: EmailLayoutProps) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          fontWeight={400}
          fontStyle="normal"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
        />
      </Head>
      {preview ? <Preview>{preview}</Preview> : null}
      <Body style={main}>
        <Container style={wrapper}>{children}</Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#0A0F1E",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  padding: "32px 12px",
  margin: 0,
};

const wrapper = {
  backgroundColor: "#ffffff",
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: "16px",
  overflow: "hidden" as const,
  border: "1px solid #e2e8f0",
};
