import axios from "axios";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem("token");

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // TODO MAYBE: move check for companies search or job search from Search component to API call here
  static async getCompanyList(data) {
    let res = await this.request(`companies/`, data);
    return res.companies;
  }

  static async getJobList(data) {
    let res = await this.request(`jobs/`, data);
    return res.jobs;
  }
  
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
 
  static async authenticateUser(data) {
    let res = await this.request(`login/`, data, "post");
    return res.token; 
  }

  static async registerUser(data) {
    let res = await this.request(`users/`, data, "post");
    return res.token;
  }

}

export default JoblyApi;