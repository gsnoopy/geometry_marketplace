function validEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
  
    if (email.endsWith('.')) {
      return false;
    }
  
    const specialCharsRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
    if (!specialCharsRegex.test(email)) {
      return false;
    }
  
    return true;
    
}

module.exports = { validEmail };
