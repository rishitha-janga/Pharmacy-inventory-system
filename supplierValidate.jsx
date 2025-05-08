const Validate = (values) => {
    console.log("dddddddddddd", values);
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }

    return errors;
  };

    export default Validate;