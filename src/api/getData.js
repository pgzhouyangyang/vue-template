import request from "@/utils/request.js"


export const login = data => request("/user/login.do", "POST", data)
