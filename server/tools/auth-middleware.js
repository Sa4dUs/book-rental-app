import { Strategy, ExtractJwt } from "passport-jwt"
import passport from "passport"
import { doesNotMatch } from "assert"

const init = () => {
  const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.SECRET_KEY,
  }
  passport.use(
    new Strategy(opt, (decoded, done) => {
      return done(null, decoded)
    })
  )
}

const protectWithJwt = (req, res, next) => {
  // const protectedRoutes = ["/auth/update", "/book/create", "/book/rent"]
  const protectedRoutes = []
  if (protectedRoutes.includes(req.path)) {
    return passport.authenticate("jwt", { session: false })(req, res, next)
  }

  return next()
}

export { init, protectWithJwt }
