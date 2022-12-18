import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const routerProtectAuth = to.matched.some(
    (record) => record.meta.auth
  );
  const jwtToken = JSON.parse(localStorage.getItem("jwt_token")!);
  if (routerProtectAuth && !jwtToken) {
    next({ name: "login" });
  } else if (!routerProtectAuth && jwtToken) {
    next({ name: "index" });
  } else {
    next();
  }
});


export default router
