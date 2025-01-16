import axios from "axios";
import { setServerStatus } from "../store/server.store";
import { Config } from "./config";
import { getAccessToken } from "../store/profile.store";
//import { message } from "antd";


export const request = (url = "", method = "get", data = {}) => {

    //verify token
    var access_token = getAccessToken();
    return axios({
        url: Config.base_url + url,
        method: method,
        data: data,
        // headers: {
        //     //   ...headers,
        //     //...headers,
        //     Authorization: "Bearer " + access_token,
        // },
        headers:{ Authorization: "Bearer " + access_token, }
    })
        .then((res) => {
            setServerStatus(200);
            return res.data;
        })
        .catch((err) => {
            var response = err.response;
            if (response) {
                var status = response.status;
                if (status == "401") {
                    status = 403;
                }
                setServerStatus(status);
            } else if (err.code == "ERR_NETWORK") {
                setServerStatus("error");
            }
            console.log(err.message({
                message:"something when wrong!"
            }));
            return false;
        });

}
