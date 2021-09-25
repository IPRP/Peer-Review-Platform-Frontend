export default class AuthHelper {
  /**
   *
   * @param vue {Component}
   * @constructor
   */
  static Authenticated(vue) {
    return vue.$store.getters.isAuthenticated;
  }

  /**
   *
   * @param vue {Component}
   * @constructor
   */
  static Login(vue) {
    vue.$store.commit("setReturnRoute", vue.$router.currentRoute.path);
    vue.$router.push("/login");
  }
}
