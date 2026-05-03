export const analyzeStock = async (data) => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        decision: "BUY",
        score: 3,
        confidence: "High",
        price: 112,
        ma: 105,
        indicators: {
          ma_signal: "+2",
          rsi_signal: "0",
          trend_signal: "+1"
        },
        explanation: [
          "Price above moving average (+2)",
          "RSI neutral (0)",
          "Uptrend detected (+1)"
        ]
      });
    }, 1500);
  });
};
