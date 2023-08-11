import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ValidationSuccess from "./Success/ValidationSuccess";

function Payment() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showSuccessCard, setShowSuccessCard] = useState();

  const onSubmit = () => {
    setShowSuccessCard(true);
  };

  const validateCardNumber = async (value) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/validateCardNumber`,{
          cardNumber: value
        });
        return response.data.validate;
    }catch(err){
        return false;
    }
  };

  const validateExpirationDate = (value) => {
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value)) {
      return false;
    }

    const [month, year] = value.split('/');
    if (isNaN(month) || isNaN(year)) {
      return false;
    }

    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      return false;
    }

    const currentDate = new Date();
    const cardExpirationDate = new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);
    return cardExpirationDate > currentDate;
  };

  const validateCVV = (value) => {
    return /^[0-9]{3,4}$/.test(value);
  };

  const validateNameOnCard = (value) => {
    return /^[A-Za-z\s.]*[A-Za-z\s][A-Za-z\s.]*$/.test(value);
  };

return (
    <> 
      <form onSubmit={handleSubmit(onSubmit)} className={showSuccessCard? 'filter blur-sm' : null}>
        <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
          <div className="bg-blue-600 text-white p-4 flex justify-between">
              <div className="font-bold text-lg">Credit Card</div>
              <div className="text-lg"><i className="fab fa-cc-visa"></i></div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="card_number">
                  Card Number*
              </label>
              <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.card_number ? 'border-red-600' : null}`}
                  id="card_number" type="number" name="card_number" placeholder="xxxx xxxx xxxx xxxx" {...register("card_number", { required: true, validate: validateCardNumber})}/>
                  {errors.card_number?.type === "validate" && (<p className="pt-2 font-light text-[12px] tracking-wide text-red-600">Please provide valid card number</p>)}
            </div>
            <div className="mb-4 flex justify-between">
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="expiration_date">
                    Expiration Date*
                </label>
                <input
                    className={`shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.expiration_date ? 'border-red-600' : null}`}
                    id="expiration_date" type="text" name="expiration_date" placeholder="MM/YY" {...register("expiration_date", { required: true, validate: validateExpirationDate})}/>
                    {errors.expiration_date?.type === "validate" && (<p className="pt-2 font-light text-[12px] tracking-wide text-red-600">Invalid Expiration Date</p>)}
              </div>
              <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                      CVV*
                  </label>
                  <input
                      className={`shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.cvv ? 'border-red-600' : null}`}
                      id="cvv" type="text" name="cvv" placeholder="XXX"  {...register("cvv", { required: true, validate: validateCVV})}/>
                      {errors.cvv?.type === "validate" && (<p className="pt-2 font-light text-[12px] tracking-wide text-red-600">Invalid cvv</p>)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name_on_card">
                  Name on Card*
              </label>
              <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name_on_card ? 'border-red-600' : null}`}
                  id="name_on_card" type="text" name="name_on_card" placeholder="John Doe"  {...register("name_on_card", { required: true, validate: validateNameOnCard,})}/>
                  {errors.name_on_card?.type === "validate" && (<p className="pt-2 font-light text-[12px] tracking-wide text-red-600">Please enter valid name</p>)}
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >Validate Card
            </button>
          </div>
        </div>
      </form>
      {showSuccessCard && <ValidationSuccess setShowSuccessCard={setShowSuccessCard}/>}
    </>
  );
}

export default Payment;
