import axios from "axios";
import { getAccesToken } from "../store/profile.store"
import { setServerStatus } from "../store/server.store";
import { Config } from "./config";


export const request = (url = "", method = "get", data = {}) => {

    //verify token
    var access_token = getAccesToken();
    return axios({
        //connect to api
        url: Config.base_url + url,
        method: method,
        data: data,
        headers: {
            //"Content-Type": "application/json",
            Authorization: "Bearer " + access_token
        }
    }).then((res) => {
        setServerStatus(200);
        return res.data;
    }).catch((err) => {
        var response = err.response;
        if (response) {
            var status = response.status;
            if (status == "401") {
                status = 403;
            }
            setServerStatus(status);
        }
        else if (err.code == "ERR_NETWORK") {
            setServerStatus("error");
        }
        console.log(err)
        return false;
    });
}