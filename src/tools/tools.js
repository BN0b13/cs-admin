import dayjs from 'dayjs';

export default class Tools {

  usernameRegex = /^[a-zA-Z0-9\-._!?@#$]+$/;
  usernameMinLength = 4;
  usernameMaxLength = 30;
  restrictedUsernames = ['cosmicstrains', 'cosmic_strains', 'cosmic-strains', 'cscollectibles', 'admin', 'customerservice', 'customer-service', 'customer_service', 'help', 'support', 'sales'];
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
  passwordMinLength = 8;
  passwordMaxLength = 30;
  integerRegex = /^\d+$/;
  validationRes = {};
  states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
  ];

  handleEmailAddress = (email, setEmail, setShowEmailDisclaimer) => {
    if(email.toLowerCase().includes('hotmail') ||
      email.toLowerCase().includes('ymail') ||
      email.toLowerCase().includes('yahoo')) {
        setShowEmailDisclaimer(true);
    } else {
        setShowEmailDisclaimer(false);
    }
    setEmail(email);
  }

  emailValidation = (email) => {
    if(!email.includes('@') || !email.includes('.') || email.includes(' ') || email.length < 5) {
      return false;
    }

    return true;
  }

  usernameInputValidation = (username, setInput) => {
    if(username.includes(' ')) {
      return;
    }

    if(username.length === this.usernameMaxLength) {
      return;
    }

    if(!this.usernameRegex.test(username) && username !== '') {
      return;
    }
    
    return setInput(username);
  }

  usernameValidation = (username) => {
    if(username.length < this.usernameMinLength || 
      username.length > this.usernameMaxLength ||
      !this.usernameRegex.test(username)){
      return false;
    }
    return true;
  }

  passwordValidation = (password) => {
    if(password.length < this.passwordMinLength || 
      password.length > this.passwordMaxLength ||
      !this.passwordRegex.test(password)){
      return false;
    }
    return true;
  }

  phoneInputValidation = (e, setInput) => {
    if(e === '' || (this.integerRegex.test(e) && e.length <= 10)) {
        return setInput(e);
    } else {
        return
    }
  }

  phoneValidation = (phone) => {
    if(phone.length < 10) {
      return false;
    }
    return true;
  }

  validateAddress = (address) => {
    if(!address.addressOne || address.addressOne.length < 1 ||
      !address.city || address.city.length < 1 ||
      !address.state || address.state.length < 1 ||
      !address.zipCode || address.zipCode.length < 1) {
      return false;
    }

    return true;
  }

  zipCodeInputValidation = (e, setInput) => {
  if(e === '' || (this.integerRegex.test(e) && e.length <= 5)) {
        return setInput(e);
    } else {
        return
    }
  }

  zipCodeValidation = (zipCode) => {
    if(zipCode.length < 5) {
      return false;
    }

    return true;
  }

  formatUnixDate = (date) =>{
    return dayjs(new Date(parseInt(date))).format('MM/DD/YYYY hh:mm a').toString();
  }

  formatPrice = (price) => {
    return `$${price / 100}`;
  }

  formatCreatedAtDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
  }

  formatInputDate = (date) => {
    const monthDay = date.slice(5);
    const year = date.substring(0,4);
    return `${monthDay}-${year}`;
  }

  validate = (data) => {
    const res = {
      result: true
    };

    if(data.hasOwnProperty('email') && data.email === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('username') && data.username === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('password') && data.password === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('confirmPassword') && data.confirmPassword === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }
    
    if(data.hasOwnProperty('firstName') && data.firstName === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;

    }
    if(data.hasOwnProperty('lastName') && data.lastName === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('phone') && data.phone === '') { 
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if (data.hasOwnProperty('billingAddress') && !this.validateAddress(data.billingAddress)) {
      res.error = 'Please fill in all fields to submit';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('password') && data.hasOwnProperty('confirmPassword') && data.password !== data.confirmPassword) {
      res.error = 'Passwords do not match';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('email') && !this.emailValidation(data.email)) {
      res.error = 'Please enter a valid email';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('username') && !this.usernameValidation(data.username)) {
      res.error = 'Username needs to be at least 4 characters long. The only special characters allowed are -._!?@#$';
      res.result = false;
      return res;
    }

    if(data.hasOwnProperty('username') && this.restrictedUsernames.includes(data.username.toLowerCase())) {
      res.error = 'Username already exists';
      res.result = false;
      return res;
    }

      if(data.hasOwnProperty('password') && !this.passwordValidation(data.password)) {
        res.error = 'Password needs to be between 8 and 30 characters long with at least one number and one special character';
        res.result = false;
        return res;
      }

      if(data.hasOwnProperty('phone') && !this.phoneValidation(data.phone)) {
        res.error = 'Please enter a complete phone number';
        res.result = false;
        return res;
      }

      if(data.hasOwnProperty('billingAddress') && !this.zipCodeValidation(data.billingAddress.zipCode)) {
        res.error = 'Please enter a complete zip code';
        res.result = false;
        return res;
      }

      if(data.hasOwnProperty('shippingAddress') && !this.zipCodeValidation(data.shippingAddress.zipCode)) {
        res.error = 'Please enter a complete zip code';
        res.result = false;
        return res;
      }

      if(data.hasOwnProperty('eula') && !data.eula) {
        res.error = 'Terms and Conditions must be accepted to submit';
        res.result = false;
        return res;
      }

    return res;
  }

  sortByDateAscending = (data) => {
    return data.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  sortByDateDescending = (data) => {
    return data.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  sort = (data, sortDirection = 'descending',  sortBy = 'createdAt') => {
    if(sortBy === 'createdAt') {
      return data.sort(function(a,b){
        return sortDirection === 'descending' ? 
          new Date(b[sortBy]) - new Date(a[sortBy]) 
        : 
          new Date(a[sortBy]) - new Date(b[sortBy]);
      });
    }

    return data.sort(function(a,b){
      const first = a[sortBy] ? a[sortBy] : '';
      const second = b[sortBy] ? b[sortBy] : '';
      return sortDirection === 'descending' ? 
        second.localeCompare(first)
      : 
        first.localeCompare(second);
    });
  }
}