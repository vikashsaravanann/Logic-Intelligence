import { Section, Img, Text, Row, Column } from "@react-email/components";
import * as React from "react";

const LOGO_URL =
  "https://www.logicintelligencetechnologies.in/assets/logo.jpg";

export const EmailHeader = () => {
  return (
    <Section style={header}>
      <Row>
        <Column style={{ width: "56px", verticalAlign: "middle" }}>
          <Img
            src={LOGO_URL}
            alt="Logic Intelligence Technologies"
            width="48"
            height="48"
            style={logo}
          />
        </Column>
        <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
          <Text style={brand}>Logic Intelligence Technologies</Text>
          <Text style={tagline}>Web · AI · Production software</Text>
        </Column>
      </Row>
    </Section>
  );
};

const header = {
  padding: "28px 36px 20px 36px",
  backgroundColor: "#0A0F1E",
  borderBottom: "1px solid rgba(0,191,255,0.25)",
};

const logo = {
  display: "block",
  borderRadius: "999px",
  border: "2px solid rgba(0,191,255,0.45)",
};

const brand = {
  margin: "0",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.02em",
};

const tagline = {
  margin: "4px 0 0 0",
  color: "#94a3b8",
  fontSize: "12px",
};
