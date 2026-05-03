export const analyzeStock = async (data) => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        decision: "BUY",
        explanation: "Price is above moving average indicating bullish trend. Volume supports upward momentum.",
        price: 112,
        ma: 105,
      });
    }, 1500);
  });
};
