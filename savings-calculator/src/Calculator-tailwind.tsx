import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [averageThirdPartyOrders, setAverageThirdPartyOrders] = useState<string>('');
  const [averageDirectOrders, setAverageDirectOrders] = useState<string>(''); 
  const [averageCheckSize, setAverageCheckSize] = useState<string>('');
  const [averageCommission, setAverageCommission] = useState<string>('');
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  const calculateResults = () => {
    const avgThirdPartyOrders = parseFloat(averageThirdPartyOrders);
    const avgDirectOrders = parseFloat(averageDirectOrders);
    const avgOrders = avgThirdPartyOrders + avgDirectOrders;

    const avgCheckSize = parseFloat(averageCheckSize);
    const avgCommission = parseFloat(averageCommission);

    const avgThirdPartyAnnualRevenue = avgThirdPartyOrders * avgCheckSize * 365;
    const avgDirectAnnualRevenue = avgDirectOrders * avgCheckSize * 365;
    const avgAnnualRevenue = avgOrders * avgCheckSize * 365;

    // const withThirdPartyDelivery = avgOrders * avgCheckSize - avgOrders * avgCheckSize * avgCommission / 100;
    // const withoutThirdPartyDelivery = avgOrders * avgCheckSize;
    // const withApp = withoutThirdPartyDelivery;

    setResults({
        "Average Third Party Orders": avgThirdPartyOrders,
        "Average Direct Orders": avgDirectOrders,
        "With Food Boss Total Orders": Math.round(avgOrders*1.25),

        "Annual Third Party Revenue": Math.round(avgThirdPartyAnnualRevenue),
        "Annual Direct Revenue": Math.round(avgDirectAnnualRevenue),
        "Annual Revenue with App": Math.round(avgAnnualRevenue * 1.25),

        "Annual Third Party Commissions/Fees": Math.round(avgThirdPartyOrders * avgCheckSize * avgCommission / 100 * 365),
        "Annual App Commissions/Fees": Math.round(avgOrders* 1.25 * avgCheckSize * .05 * 365),

        "Annual Third Party Net Revenue": Math.round(avgThirdPartyAnnualRevenue * (1-(avgCommission/100))),
        "Annual Direct Net Revenue": Math.round(avgDirectOrders * avgCheckSize * 365),
        "Annual Net Revenue with App": Math.round(avgAnnualRevenue * (1.25 * .95)),

      });
    };

  return (
    <div className="container mx-auto p-5 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Savings Calculator</h1>
      <h3 className="text-lg mb-4">Enter your average orders, average check size, and average commission to see how much you can save with our App!</h3>
      <div className="p-4">
    <div className="flex flex-wrap mb-3">
        <label htmlFor="averageThirdPartyOrders" className="w-2/3 text-left">Average number of third party orders (<em>delivery and pickup daily</em>): </label>
        <input type="text" id="averageOrders" pattern="\d*\.?\d*" onChange={e => setAverageThirdPartyOrders(e.target.value)} className="border p-2 rounded w-1/3 h-7" />
    </div>
    <div className="flex flex-wrap mb-3">
        <label htmlFor="averageDirectOrders" className="w-2/3 text-left">Average number of direct orders: </label>
        <input type="text" id="averageDirectOrders" pattern="\d*\.?\d*" onChange={e => setAverageDirectOrders(e.target.value)} className="border p-2 rounded w-1/3 h-7" />
    </div>
    <div className="flex flex-wrap mb-3">
        <label htmlFor="averageCheckSize" className="w-2/3 text-left">Average order check size: </label>
        <input type="text" id="averageCheckSize" pattern="\d*\.?\d*" onChange={e => setAverageCheckSize(e.target.value)} className="border p-2 rounded w-1/3 h-7" />
    </div>
    <div className="flex flex-wrap mb-3">
        <label htmlFor="averageCommission" className="w-2/3 text-left">Average commission (<em>for example input 10 for 10%</em>) : </label>
        <input type="text" id="averageCommission" pattern="\d*\.?\d*" onChange={e => setAverageCommission(e.target.value)} className="w-1/3" />
    </div>
    <div className="mb-4 text-center">
        <button onClick={calculateResults} className="bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition-all">Submit</button>
    </div>
    {results && (
        <table className="min-w-full text-right border border-black table-auto text-sm md:text-base border-collapse">
        <thead>
        <tr>
            <th className="px-2 py-1"></th>
            <th className="px-2 py-1 border border-black text-center">3rd Party Delivery</th>
            <th className="px-2 py-1 border border-black text-center">Direct Ordering Only</th>
            <th className="px-2 py-1 border border-black text-center">w/ App (all order types)</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>Orders</td>
            <td>{results["Average Third Party Orders"].toLocaleString()}</td>
            <td>{results["Average Direct Orders"].toLocaleString()}</td>
            <td>{results["With Food Boss Total Orders"].toLocaleString()}</td>
          </tr>
          <tr>
            <td>Annual Revenue</td>
            <td>${results["Annual Third Party Revenue"].toLocaleString()}</td>
            <td>${results["Annual Direct Revenue"].toLocaleString()}</td>
            <td>${results["Annual Revenue with App"].toLocaleString()}</td>
          </tr>
          <tr>
            <td>Annual Commissions/Fees</td>
            <td>${results["Annual Third Party Commissions/Fees"].toLocaleString()}</td>
            <td>$0</td>
            <td>${results["Annual App Commissions/Fees"].toLocaleString()}</td>
          </tr>
          <tr>
            <td>Net Revenue</td>
            <td>${results["Annual Third Party Net Revenue"].toLocaleString()}</td>
            <td>${results["Annual Direct Revenue"].toLocaleString()}</td>
            <td>${results[ "Annual Net Revenue with App"].toLocaleString()}</td>
          </tr>
          <tr>
            <td>Cost/Benefit</td>
            <td>${results["Annual Third Party Commissions/Fees"].toLocaleString()}</td>
            <td>${results["Annual Third Party Net Revenue"].toLocaleString()}</td>
            <td>$xxx</td>
          </tr>
        </tbody>
      </table>
        )}
        </div>
    </div>
  );
};

export default Calculator;


