export default function ({app, route, redirect}){
  if (route.path !== '/login' ) {
    if(!app.$fire.auth.currentUser) {
      //take them to log in page
      return redirect('/login')
      console.log('not authenticated')
    }
  } 
}
