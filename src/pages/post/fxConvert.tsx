/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
function CurrencyConverter() {
  const [apeCoin, setApeCoin] = useState(0);
  const [usd, setUsd] = useState(0);
//   const conversionRate = 0.013; // Conversion rate from APEcoin to USD
    const [conversionRate, setConversionRate] = useState(null);

 useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/apecoin');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConversionRate(data.market_data.current_price.usd);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConversionRate();
  }, []);

  const handleApeCoinChange = (values) => {
    setApeCoin(values.value);
    setUsd(values.value * conversionRate);
  };

  const handleUSDChange = (values) => {
    setUsd(values.value);
    setApeCoin(values.value / conversionRate);
  };

  return (
    <div>
      <NumericFormat
        value={apeCoin}
        onValueChange={handleApeCoinChange}
        thousandSeparator
        decimalScale={2}
        allowNegative={false}
        prefix={'APEcoin: '}
      />
      <NumericFormat
        value={usd}
        onValueChange={handleUSDChange}
        thousandSeparator
        decimalScale={2}
        allowNegative={false}
        prefix={'USD: $'}
      />
    </div>
  );
}

export default CurrencyConverter;
