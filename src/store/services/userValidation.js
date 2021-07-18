export function userValidation(user){

    const {first_name, second_name, email, password} = user;

    //user name validation
    const regName = /^[a-zA-Z]*$/
    const firstNameTrue = regName.test(String(first_name).toLowerCase())
    const secondNameTrue = regName.test(String(second_name).toLowerCase())

    //user email validation
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const emailTrue = regEmail.test(String(email).toLowerCase())

    //user password validation
    const passwordTrue = (password.length >= 6 && password.length <= 10)

    return {
        firstNameTrue,
        secondNameTrue,
        emailTrue,
        passwordTrue
    }
}