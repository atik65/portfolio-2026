const numberToBangla = (number) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit, 10)] || digit)
    .join("");
};

export default numberToBangla;
