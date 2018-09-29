/**
 * env.ts
 *
 * Created by jake
 * Created on 2/24/18
 *
 * Holds necessary environment variables.
 */


class Env {
  static REST_API_ROOT:string = process.env.REST_API_ROOT;
  static GA_ENV: string = process.env.GA_ENV;
  static GA_TRACKING: string = process.env.GA_TRACKING;
}

export default Env;
