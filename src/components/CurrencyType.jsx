import {
  IndianRupee,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
} from "lucide-react";

function CurrencyType({ baseCurrency, iconSize, className = "" }) {
  switch (baseCurrency) {
    case "INR":
      return <IndianRupee size={iconSize} className={`${className}`} />;
    case "USD":
      return <DollarSign size={iconSize} className={`${className}`} />;
    case "EUR":
      return <Euro size={iconSize} className={`${className}`} />;
    case "GBP":
      return <PoundSterling size={iconSize} className={`${className}`} />;
    case "JPY":
      return <JapaneseYen size={iconSize} className={`${className}`} />;
    case "AUD":
      return <DollarSign size={iconSize} className={`${className}`} />;
    default:
      return "";
  }
}

export default CurrencyType;
