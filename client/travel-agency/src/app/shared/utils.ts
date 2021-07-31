export function getUserId(): string {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error(`You are not signed in!`)
    console.log(`token is:${token}`);
    const data = JSON.parse(atob(token.split('.')[1]));
    const userId = data._id;
    return userId;
}
export function getEmail(): string {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error(`You are not signed in!`)
    console.log(`token is:${token}`);
    const data = JSON.parse(atob(token.split('.')[1]));
    const email = data.email;
    return email;
}
export function getPropFromResponse(res, name) {
    const x = res['_body'];
    const token = JSON.parse(x)[name];
    return { x, token };
}