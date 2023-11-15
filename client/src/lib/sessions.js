const endpoint = '/users/tokens'

let accessToken;
let refreshToken;
let resource_owner;

const signUp = async () => {
    let email
    let pwd
    let pwd_confirm

    if (pwd !== pwd_confirm) return

    const res = await fetch(`${endpoint}/sign_up`, {
        method: 'POST',
        body: JSON.stringify({email, pwd}),
        headers: { "Content-Type": "application/json" },
    });

    await handleAuthRes(res)
    userSession()
}

const handleAuthRes = async(res) => {
    const data = await res.json();
    //localstorage
    accessToken = data.token
    refreshToken = data.refresh_token
    resource_owner = data.resource_owner
}

const userSession = async() => {
    await refreshToken()
    await requestToken()
    window.access_token = access_token

    if (!access_token) return
    //login
    getUser()
}

const signIn = async () => {
    let email
    let password

    const res = await fetch(`${endpoint}/sign_in`, {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { "Content-Type": "application/json" },
    });

    await handleAuthRes(res)
    userSession()
}

const signOut = () => {
    //reset local st
    accessToken = null
    refreshToken = null
    resource_owner = null
}

const refreshToken = async () => {
    //if refrest token -- null
    let refresh_token

    try {
        let res = await fetch(`${endpoint}/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refresh_token}`
            }
        })

        if (!res.ok) {
            if (res.status === 401) {
                //redirect to login
            }else{
                throw new Error(res.status.message)
            }
        }

        let data = await res.json()
        accessToken = data.token
        refreshToken = data.refresh_token
        resource_owner = data.resource_owner
    }catch(err) {
        console.log(err)
        resetToken()
        userSession()
    }
}

const requestToken = () => {
    if (!refreshToken || accessToken ) return

    try {
        let res = await fetch(`${endpoint}/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refresh_token}`
            }
        })
        handleAuthRes(res)
    }catch(err){
        console,log(err)
        resetToken()
        userSession()
    }
}