import router from '@/router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineStore } from "pinia";


const { mutate: login } = useMutation(gql`
mutation login($loginInfo: LoginInput!){
  login(loginInfo:$loginInfo){
  	success
    response{
      code
      type
      message
     	error
    }
    user{
      originalId
      email
      universalId
      language
      jwtToken
    }
  }
}
`)

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),

  actions: {
    login(email: string, password: string) {
        login({
          "loginInfo": {
            "email": email,
            "password": password
          }
        }).then((result)=>{
          console.log(result!.data.login.user.jwtToken)
          localStorage.setItem('jwt_token', JSON.stringify(result!.data.login.user.jwtToken));
          router.push("/")
        }).catch((error)=>{
          console.log(error)
        })

    },

    // logout(){
    //   localStorage.setItem('jwt_token', JSON.stringify(false));
    //   router.push("/login");
    // }


  },
});
