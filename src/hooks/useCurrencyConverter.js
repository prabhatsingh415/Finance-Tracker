import { useSelector } from "react-redux";
import { useGetRatesQuery } from "../redux/currencyApiSlice";

export const useCurrencyConverter = () => {
  const baseCurrency = useSelector((state) => state.currency.base);
  const { data, error, isLoading } = useGetRatesQuery(baseCurrency);

  const convert = (amount, currency) => {
    if (!currency || currency === baseCurrency) return Number(amount);
    if (isLoading || !data || !data.conversion_rates) return Number(amount);
    if (error) return Number(amount);

    const baseRate = data.conversion_rates[baseCurrency];
    const currRate = data.conversion_rates[currency];

    if (!baseRate || !currRate) return Number(amount);

    return Number((amount * (baseRate / currRate)).toFixed(2));
  };

  return convert;
};
