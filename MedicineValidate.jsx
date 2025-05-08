const Validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.price) {
    errors.price = "Price is required";
  }

  // if (!values.quantity) {
  //   errors.quantity = "Quantity is required";
  // }

  if (!values.category) {
    errors.category = "Category is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if(!values.expiryDate){
    errors.expiryDate = "Expiry Date is required";
    }
    
  return errors;
};

export default Validate;
