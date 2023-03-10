import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from "../Authentication/AuthenticateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFish,
  faBreadSlice,
  faLeaf,
  faCarrot,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

export default function UpdateDietaryNeeds() {
  const [seafood, setSeafood] = useState("");
  const [gluten_free, setGluten] = useState("");
  const [vegan, setVegan] = useState("");
  const [vegetarian, setVegetarian] = useState("");
  const [halal, setHalal] = useState("");
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [cancelEdit, setCancelEdit] = useState(false);
  const [setAccount] = useState({});
  const [, , , , , updateallergy, updatedietrestrict] = useToken();

  const [allergy, setAllergy] = useState({});
  const [diet_restrict, setDiet] = useState({});

  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_PLATEMATE_API_HOST}/api/accounts/me`;
    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await result.json();
    setAccount(data);
  };

  const fetchAllergies = async () => {
    const url = `${process.env.REACT_APP_PLATEMATE_API_HOST}/api/allergies/me`;
    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await result.json();
    setAllergy(data);
    setSeafood(data.seafood);
    setGluten(data.gluten_free);
  };

  const fetchDietRestrict = async () => {
    const url = `${process.env.REACT_APP_PLATEMATE_API_HOST}/api/diet_restricts/me`;
    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await result.json();
    setDiet(data);
    setVegan(data.vegan);
    setVegetarian(data.vegetarian);
    setHalal(data.halal);
  };

  const seafoodChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      setSeafood(true);
    } else {
      setSeafood(false);
    }
  };

  const glutenChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      setGluten(true);
    } else {
      setGluten(false);
    }
  };

  const veganChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      setVegan(true);
    } else {
      setVegan(false);
    }
  };

  const vegetarianChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      setVegetarian(true);
    } else {
      setVegetarian(false);
    }
  };

  const halalChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      setHalal(true);
    } else {
      setHalal(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    updateallergy(seafood, gluten_free, allergy.account_id);
    updatedietrestrict(vegan, vegetarian, halal, diet_restrict.account_id);
    setSeafood("");
    setGluten("");
    setVegan("");
    setVegetarian("");
    setHalal("");

    navigate("platemate/me");
  };

  const handleCancelEdit = () => {
    setCancelEdit(!cancelEdit);
    navigate("platemate/me");
  };

  useEffect(() => {
    if (token) {
      fetchAccount();
      fetchAllergies();
      fetchDietRestrict();
    }
  }, [token]);

  return (
    <>
      <h2 className="text-center font-bold mt-10 text-xl mb-8">
        Edit Allergies & Dietary Restrictions
      </h2>

      <div className="bg-[#EEE5DD] rounded-lg p-10 max-w-screen-sm mx-auto mb-16 w-[400px] ">
        <form onSubmit={handleFormSubmit}>
          <div className="font-bold text-center mb-2 text-[#a24d4a]">
            <FontAwesomeIcon icon={faFish} className="mr-2" />
            Seafood
          </div>
          <select
            required
            id="seafood"
            onChange={seafoodChange}
            className="border border-gray-300 text-sm rounded-lg block w-32 p-2.5 bg-[#D9D9D9] text-black font-bold mb-6 mx-auto"
          >
            <option>No Change</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <div>
            <div className="font-bold text-center mb-2 text-[#a24d4a]">
              <FontAwesomeIcon icon={faBreadSlice} className="mr-2" />
              Gluten-Free
            </div>
            <select
              required
              id="gluten"
              onChange={glutenChange}
              className="border border-gray-300 text-sm rounded-lg block w-32 p-2.5 bg-[#D9D9D9] text-black font-bold mb-6 mx-auto"
            >
              <option>No Change</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="font-bold text-center mb-2 text-[#a24d4a]">
            <FontAwesomeIcon icon={faLeaf} className="mr-2" />
            Vegan
          </div>
          <select
            required
            id="vegan"
            onChange={veganChange}
            className="border border-gray-300 text-sm rounded-lg block w-32 p-2.5 bg-[#D9D9D9] text-black font-bold mb-6 mx-auto"
          >
            <option>No Change</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div>
            <div className="font-bold text-center mb-2 text-[#a24d4a]">
              <FontAwesomeIcon icon={faCarrot} className="mr-2" />
              Vegetarian
            </div>
            <select
              required
              id="vegetarian"
              onChange={vegetarianChange}
              className="border border-gray-300 text-sm rounded-lg block w-32 p-2.5 bg-[#D9D9D9] text-black font-bold mb-6 mx-auto"
            >
              <option>No Change</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <div className="font-bold text-center mb-2 text-[#a24d4a]">
              <FontAwesomeIcon icon={faBowlFood} className="mr-2" />
              Halal
            </div>
            <select
              required
              id="halal"
              onChange={halalChange}
              className="border border-gray-300 text-sm rounded-lg block w-32 p-2.5 bg-[#D9D9D9] text-black font-bold mb-6 mx-auto"
            >
              <option>No Change</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="p-2 flex">
            <button
              className="font-bold mx-auto mt-12 flex p-2.5 bg-[#BB5855] rounded-xl hover:rounded-3xl hover:bg-[#823e3d] transition-all duration-300 text-black"
              type="submit"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className="font-bold mx-auto mt-12 flex p-2.5 bg-[#97D06B] rounded-xl hover:rounded-3xl hover:bg-[#6a934c] transition-all duration-300 text-black"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
