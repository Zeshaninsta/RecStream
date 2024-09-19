import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { uploadProfilePicture } from "./uploadProfilePicture";
import { AiOutlineCamera, AiOutlineEdit } from "react-icons/ai";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "../assets/profile-user.png";

const UserImageProfile = () => {
  const { currentUser } = useAuth(); // Get the current authenticated user 
  const userRef = doc(db, "userdb", currentUser.uid); // Reference to the user's document in Firestore
  const fileInputRef = useRef(null); // Ref for the file input element to allow programmatically triggering it
  const [newProfilePicture, setNewProfilePicture] = useState(null); // State for storing the new profile picture file
  const [newBios, setNewBios] = useState(""); // State for the new bio input value
  const [oldBios, setOldBios] = useState(""); // State for the current bio from Firestore
  const [userData, setUserData] = useState(null); // State to store the full user data fetched from Firestore
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [editingBios, setEditingBios] = useState(false); // State to track if the bio is in edit mode
  const navigate = useNavigate(); // Hook for navigating between routes

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        // Ensure the user is authenticated before attempting to fetch data
        try {
          const userSnapshot = await getDoc(userRef); // Fetch user data from Firestore
          if (userSnapshot.exists()) {
            const userDataFromFirestore = userSnapshot.data(); // Get the data from the snapshot
            setUserData(userDataFromFirestore); // Store user data in state
            setOldBios(userDataFromFirestore.bios || ""); // Set the current bio for display
          } else {
            navigate("/login"); // Redirect to login if user document is not found
            setError("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [currentUser, userRef, navigate]); // Dependencies include currentUser, userRef, and navigate

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input click when profile picture is clicked
  };

  const handlePictureChange = async (e) => {
    setNewProfilePicture(e.target.files[0]); // Set the new profile picture file
    await handlePictureUpload(e.target.files[0]); // Upload the new profile picture
  };

  const handlePictureUpload = async (file) => {
    try {
      await uploadProfilePicture(currentUser, file); // Call the function to upload the picture
      setSuccessMessage("Profile picture updated successfully.");
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      setError("Failed to update profile picture.");
    }
  };

  const handleSaveBios = async () => {
    try {
      await setDoc(userRef, { bios: newBios }, { merge: true }); // Update bio in Firestore with merge option
      setSuccessMessage("Bios updated successfully.");
      setEditingBios(false); // Exit edit mode
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      console.log(error);
      setError("Failed to update bios.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-[80%] flex justify-center items-center gap-5 flex-col p-5 mt-10">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer relative"
          onClick={handleImageClick} // Trigger image click event
        >
          <img
            src={
              userData
                ? userData.profileImage || defaultUserIcon
                : defaultUserIcon
            }
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border border-gray-200"
          />
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureChange} // Handle picture file selection
            ref={fileInputRef} // Associate the input with the file input ref
            className="hidden" // Hidden input field for file selection
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <AiOutlineCamera className="text-blue-500 w-6 h-6 cursor-pointer" />
          </div>
        </label>
        <div className="mt-5 flex items-center text-white">
          {!editingBios ? (
            <div className="flex flex-col justify-center items-center">
              <p>Bio</p>
              <div className="flex justify-center items-center gap-1">
                <p className="text-sm italic text-gray-400">
                  {userData ? userData.bios : ""} {/* Display the current bio */}
                </p>
                <button
                  onClick={() => setEditingBios(true)} // Enable editing mode
                  className="ml-2 text-blue-500"
                >
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around items-center m-auto gap-2">
              <input
                type="text"
                className="border p-2 border-gray-300 text-black rounded mt-2 resize-none"
                value={newBios} // Bind input to the new bio state
                placeholder={oldBios} // Show current bio as placeholder
                onChange={(e) => setNewBios(e.target.value)} // Update new bio state on input change
              />
              <button
                onClick={handleSaveBios} // Save new bio when button is clicked
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error messages */}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div> {/* Display success messages */}
        )}
      </div>
    </div>
  );
};

export default UserImageProfile;
