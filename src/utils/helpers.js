// @format
import React from "react";
import config from "../config";
import { Label } from "../components";

export function netToEtherscanAPI(network) {
  switch (config.TARGET_NETWORK) {
    case "mainnet":
      return "api";
    case "rinkeby":
      return "api-rinkeby";
  }
}

export function shortenAddress(value) {
  if (value && typeof value === "string") {
    return (
      value.substring(0, 4) +
      "..." +
      value.substring(value.length - 4, value.length)
    );
  } else {
    return value;
  }
}

export function shortenBalance(value) {
  const decimalPlaces = config.DECIMAL_PLACES;
  if (value === "0") {
    // Generate decimals
    let decimals = ".";
    for (let i = 0; i < decimalPlaces; i++) {
      decimals += "0";
    }
    return "0" + decimals;
  }

  if (value && typeof value === "string" && value.indexOf(".") > -1) {
    value = value.split(".");
    const before = value[0];
    const after = value[1];
    return before + "." + after.substring(0, decimalPlaces);
  } else if (value.indexOf(".")) {
    // Generate decimals
    let decimals = ".";
    for (let i = 0; i < decimalPlaces; i++) {
      decimals += "0";
    }
    return value + decimals;
  } else {
    return value;
  }
}

export function statusToLabel(status) {
  status = parseInt(status, 10);
  switch (status) {
    case 0:
      return <Label bgColor={config.CSS.COMMITTED}>Committed</Label>;
    case 1:
      return <Label bgColor={config.CSS.PAID}>Paid</Label>;
    case 2:
      return <Label bgColor={config.CSS.REVEALED}>Revealed</Label>;
    case 3:
      return <Label bgColor={config.CSS.EXITED}>Exited</Label>;
    case 4:
      return <Label bgColor={config.CSS.DECLINED}>Declined</Label>;
  }
}
