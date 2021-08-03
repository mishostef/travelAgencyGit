import{ITrip} from './interfaces/trip';

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
    // console.log(`token is:${token}`);
    const data = JSON.parse(atob(token.split('.')[1]));
    const email = data.email;
    return email;
}

export function getPropFromResponse(res, name) {
    const x = res['_body'];
    const token = JSON.parse(x)[name];
    return { x, token };
}

export function splitIntoThree(all) {
    const length = all.length;
    const n = Math.ceil(length / 3);
    const left = all.slice(0, n);
    const center = (length % 3 == 2) || (length % 3 == 0) ? all.slice(n, 2 * n) : all.slice(n, 2 * n - 1);
    const right = all.slice(n + center.length);
    return { left, center, right };
}

export function getTripsFromResponse(res) {
    const excursions = (JSON.parse(res['_body']) as ITrip[])
        .map(x => {
            x.img = x.img.includes(`https`) ? x.img : `../../../assets/${x.img}.jpg`;
            return x;
        });

    return excursions;
}