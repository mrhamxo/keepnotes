import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: '', email: '', password: '', conpassword: ''});
    let navigate = useNavigate();
    
    const handleSubmit = async(e) => {
      const {name, email, password} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            //   save auth token in local storage and redirect to dashboard
            localStorage.setItem('token', json.token);
            props.showAlert("Account Created Successfully", 'success');
            navigate('/');
          }
          else{
            //   show error message
            props.showAlert("Invalid Details", 'danger');
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="conpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="conpassword" name='conpassword' onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup