import copy from "copy-to-clipboard";
import Vue from "vue"
export function copy2clipboard(string) {
    copy(string)
    Vue.prototype.$notify({
        message: '复制成功',
        // message: '复制成功',
        type: 'success'
    });
}

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem('token')
}
export function setUsername(username) {
    localStorage.setItem("username", username);
}

export function getUsername() {
    return localStorage.getItem('username')
}

export function logout() {
    localStorage.clear()
}
export function isLogin() {
    let token = localStorage.getItem('token')
    if (!token) {
        return false
    }
    return true
}

export function openGithub() {
    openUrl("https://github.com/aoaostar")

}
export function openUrl(url) {
    window.open(url)
}