import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../appwrite/auth'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useForm is a custom hook from the react-hook-form library.
    // It helps in managing forms in React more efficiently.
    // It returns an object with several useful properties and methods.
    // Here, we are destructuring two of them: register and handleSubmit.
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);

    // This is the function that will be called when the form is submitted.
    // It takes the form data as an object.
    // The data object will have properties that match the names of the registered inputs.
    // For example, data.email and data.password.
    const login = async (data) => {
        // We clear any previous errors.
        setError("");
        try {
            // We call the login method from our authService, passing the form data.
            const session = await authService.login(data);
            // If the login is successful, a session object will be returned.
            if (session) {
                // We then get the current user's data.
                const userData = await authService.getCurrentUser();
                // If we get the user data, we dispatch the authLogin action to update our redux store.
                if (userData) dispatch(authLogin(userData));
                // Finally, we navigate the user to the home page.
                navigate("/")
            }
        } catch (error) {
            // If there is an error during login, we set the error message to be displayed to the user.
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* 
                    The handleSubmit function is passed to the form's onSubmit event.
                    It's a helper from react-hook-form that handles the form submission.
                    You pass your own submission handler function (in this case, `login`) to it.
                    handleSubmit will first run validation on your inputs.
                    If validation is successful, it will call your `login` function with the form data.
                    If validation fails, it will not call the `login` function.
                */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            /*
                                The `register` function is used to connect the input to the react-hook-form.
                                The spread operator (`...`) is used to pass all the necessary props that react-hook-form needs to manage this input, like `onChange`, `onBlur`, `ref`, etc.
                                The first argument to `register` is the name of the input, which will be the key in the form data object.
                                The second argument is an options object for validation rules.
                                Here, we are making the email field required and adding a regex pattern to validate the email format.
                            */
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login