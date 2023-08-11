function luhnAlgorithm(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, '');  
    const digits = cardNumber.split('').map(Number);
  
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      digits[i] *= 2;
      if (digits[i] > 9) {
        digits[i] -= 9;
      }
    }
  
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
  
    return sum % 10 === 0;
  }

module.exports = luhnAlgorithm;