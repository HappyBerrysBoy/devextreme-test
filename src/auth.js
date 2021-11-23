import axios from "axios";
import notify from "devextreme/ui/notify";
import {
  LOGIN_URL,
  STORAGE_LOGIN,
  STORAGE_LOGIN_EXPIRE_TIME,
} from "./functions/constant";
import { getWithExpiry, setWithExpiry } from "./commfunc";

const defaultUser = {
  name: "",
  tmlCod: "",
  id: "",
  email: "",
};

export default {
  _user: null,
  loggedIn() {
    console.log("loggedIn this._user", this._user);

    if (this._user) {
      const sessionInfo = getWithExpiry(STORAGE_LOGIN);

      if (sessionInfo) {
        setWithExpiry(STORAGE_LOGIN, this._user, STORAGE_LOGIN_EXPIRE_TIME);
      } else {
        this._user = null;
        notify("Session timed out. Log In Again.", "error", 5000);
      }
    }

    return !!this._user;
  },

  async logIn(tmnCod, id, password) {
    try {
      // Send request
      let convertedTmnCod = "";

      if (tmnCod === "HUCY") {
        convertedTmnCod = "B";
      } else if (tmnCod === "HPNT") {
        convertedTmnCod = "H";
      } else if (tmnCod === "PNIT") {
        convertedTmnCod = "P";
      } else if (tmnCod === "PUCY") {
        convertedTmnCod = "A";
      }

      const param = {
        TMN_COD: convertedTmnCod,
        ID: id,
        PASSWORD: password,
      };

      console.log(
        `programid:${this.programId}, parameter`,
        JSON.stringify(param)
      );

      const userInfo = await axios
        .post(LOGIN_URL, {
          param: JSON.stringify(param),
          fileName: "TEST.json",
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          notify("Fail to load query data");
          this.loadingVisible = false;
        });

      this.loadingVisible = false;

      if (!userInfo.USER_ID) {
        return {
          isOk: false,
          message: "Please Check ID or Password",
        };
      } else {
        this._user = {
          name: userInfo.NAME,
          tmlCod: userInfo.TMN_COD,
          id: userInfo.USER_ID,
          email: userInfo.E_MAIL,
        };

        setWithExpiry(STORAGE_LOGIN, this._user, STORAGE_LOGIN_EXPIRE_TIME);
      }

      console.log("logged in user info", this._user);

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: "Authentication failed",
      };
    }
  },

  async logOut() {
    this._user = null;
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password",
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to change password",
      };
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to create account",
      };
    }
  },
};
