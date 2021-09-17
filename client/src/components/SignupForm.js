import React from "react"

const SignupForm = () => {
  return (
    <form className="form">
      <fieldset>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Password"
          />
        </div><div className="form-group">
        <label htmlFor="confirmPasswordInput">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPasswordInput"
          placeholder="Password"
        />
      </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </fieldset>
      <small class="form-text text-muted">
        Already registered? <a href="/login"> Log in!</a>
      </small>
    </form>
  )
}

export default SignupForm
