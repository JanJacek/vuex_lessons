//================================================
import moment from 'moment'

//================================================
export default {
  
  //----------------------
  //.jj keeps information if user id logged
  user: null, // reset //jj. '_' is jus information that varr should be treat private
  
  //----------------------
  // router.js check if use is logged
  loggedIn() {
    let temp= JSON.parse(window.localStorage.getItem('zw_logowanie'));// js thanks to sentence and specially method getItem check if  
    this.user = temp?.user;
    return !!this.user; // ORG // returns true or false
  },

  
  //----------------------
  // sender zapytania POST, na potrzeby logowania i innych autoryzacji

  async sendLoginPOST(endPoint, request){
    const response = await fetch(endPoint, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin // było cors, ale wtedy wysyła preflight przed zapytaniem // teraz zwraca: 415 Unsupported Media Type 
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit // było same-origin
      headers: {
        'Content-Type': 'application/json; charset=utf8' // dla body JSON // dodałem ; charset=utf8
        // 'Content-Type': 'application/x-www-form-urlencoded', // dla pól forma
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(request) // request jako body tulko dla 'Content-Type': 'application/json'
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log('err: ',err);
      let info = err.message;
      return {
        status: "ERROR",
        message: info, // zakłada ze jeśli odebrał message to pobranie danych się NIE udało // dla zgodności z JAVA
        err: err,
      };
    });
    return response; 
  },

  //----------------------
  // wywoływany przez login-form.vue
  // NEW, bo routing inaczej nie przekierowuje po zalogowaniu
  async login(email, password) {
    let endPoint = process.env.VUE_APP_SERVER_JAVA+'service/users/login';
    let request ={
      organizationId: 0, // przy logowaniu nie podaje organizacji
      usernameOrEmail: email,
      password: password,
    };
    
    let zw = await this.sendLoginPOST(endPoint, request); // zwraca obiekt
    let zwraca ={};
    if(zw?.message){ // zakłada ze jeśli odebrał message (JAVA) to pobranie danych się NIE udało // dla zgodności z JAVA
      zwraca.isOk = false;
      zwraca.message = zw?.message; 
      this.user = null;

    }else{
      //----------
      // define user
      zwraca.isOk = true;
      this.user = {
        email: zw?.email,
        name: zw?.name,
        id: zw?.userId,
      };
      //console.log('this.user: ',this.user);

      //----------
      // loading storage
      let temp = {};
      temp.user = this.user;
      temp.loggedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      temp.zw = zw;
      window.localStorage.setItem('zw_logowanie',JSON.stringify(temp)); // wkłada całośc do storage, potem do zmiany na session
      window.localStorage.setItem('token',JSON.stringify(zw?.jwt)); // wkłada token do storage
    }

    zwraca.zw = zw; // dodaje zawartość tego co pobrał fetch
    return zwraca;
  },


  //----------------------
  // after logout 
  async logOut() {
    this.user = null;
    // remove 3 nodes form stoage
    window.localStorage.removeItem('zw_logowanie');
    window.localStorage.removeItem('token');
  },


  //----------------------
  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Błąd resetowania hasła"
      };
    }
  },

  //----------------------
  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  //----------------------
  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
