import { createContractSuite } from "@cimplify/sdk/testing/suite";
import { wigSeedSource } from "../lib/demo/wig-seed";

// Run the SDK↔mock shape contract against the Eliz Luxury Hair wig seed.
createContractSuite({ seed: wigSeedSource });
