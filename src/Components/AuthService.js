class AuthService
{
    login(user, pass)
    {
     if(user==='user1'&&pass==='Pass1234@')
     {
        localStorage.setItem('user','user1');
        return true;
     }
     else
     {
        return false;
     }     
    }

    isLoggedIn()
    {
        if(localStorage.getItem('user')===null)
        return false;
        else
        return true;
    }

    logout()
    {
        localStorage.removeItem('user');
    }
}

export default new AuthService();