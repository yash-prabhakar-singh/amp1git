import { useMsal } from "@azure/msal-react";

class AuthService
{
    //const { instance } = useMsal();

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

     canBid(roles)
    {
        for(let i=0;i<roles.size();i++)
        {
            if(roles[i].substring(0,3).equals("Bid"))
            return true;
        }
        return false;
    }

    canWatch(roles)
    {
        for(let i=0;i<roles.size();i++)
        {
            if(roles[i].substring(0,3).equals("Watch"))
            return true;
        }
        return false;
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
     loginEst(user, pass)
    {
     if(user==='Namekart'&&pass==='India@123')
     {
        localStorage.setItem('userest','Namekart');
        return true;
     }
     else
     {
        return false;
     }     
    }

     isLoggedInEst()
    {
        if(localStorage.getItem('userest')===null)
        return false;
        else
        return true;
    }

     logout()
    {
        localStorage.removeItem('userest');
    }
}

export default new AuthService();