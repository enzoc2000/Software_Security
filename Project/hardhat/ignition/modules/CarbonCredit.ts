import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CarbonCreditModule = buildModule("CarbonCreditModule", (m) => {
  // Deploy the CarbonCredit token contract.
  // The constructor does not require any parameters in this example.
  const carbonCredit = m.contract("CarbonCredit", []);

  return { carbonCredit };
});

export default CarbonCreditModule;