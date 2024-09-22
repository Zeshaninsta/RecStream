import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase/firebase"; // Import storage
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-quill/dist/quill.snow.css"; // Import the full Quill CSS
import { useAuth } from "../contexts/AuthContext";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import PageTransition from "./PageTransition";
import { toast } from "react-toastify"; // Import react-toastify

const SinglePosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [sidebarPosts, setSidebarPosts] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for file
  const [filePreview, setFilePreview] = useState(""); // State for file preview
  const [loading, setLoading] = useState(false); // State for loading
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "userposts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          setPost(postData);
          if (postData.answers) {
            setAnswers(postData.answers);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchSidebarPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "userposts"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredPosts = postsData.filter((post) => post.id !== id);
        setSidebarPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching sidebar posts:", error);
      }
    };

    fetchSidebarPosts();
  }, [id]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "userdb", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUserData(userData);
          } else {
            console.log("No such user document!");
          }
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, [currentUser]);

  const handleBack = () => {
    window.history.back();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setFilePreview("");
    }
  };

  // if (!currentUser) {
  //   navigate("/login");
  // }
  const handleAnswerSubmit = async () => {
    setLoading(true); // Start loading

    try {
      if (answer.trim() !== "") {
        let fileURL = "";
        if (selectedFile) {
          const storageRef = ref(storage, `answers/${selectedFile.name}`);
          await uploadBytes(storageRef, selectedFile);
          fileURL = await getDownloadURL(storageRef);
        }

        const postRef = doc(db, "userposts", id);
        const newAnswer = {
          answerText: answer,
          answeredAt: new Date(),
          userId: currentUser.uid,
          userName: currentUserData?.Name || "Unknown User",
          userProfile: currentUserData?.profileImage || "",
          fileURL, // Add the file URL to the answer
        };

        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const postData = postSnap.data();
          const currentAnswers = postData.answers || [];

          const updatedAnswers = [...currentAnswers, newAnswer];

          await setDoc(postRef, { answers: updatedAnswers }, { merge: true });

          setAnswers(updatedAnswers);

          setAnswer("");
          setSelectedFile(null); // Clear file input
          setFilePreview(""); // Clear file preview
          toast.success("Answer submitted successfully!"); // Show success notification
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Error submitting answer. Please try again."); // Show error notification
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen z-10">
        <button
          onClick={handleBack}
          className="px-2 py-5 w-full lg:w-[70%] items-center gap-2 mx-auto mb-2 flex justify-start text-md font-rubik font-semibold text-gray-300 hover:text-gray-900 duration-200"
        >
          <IoMdArrowRoundBack className="text-gray-900" />
          Back
        </button>
        <div className="flex flex-col md:flex-row justify-normal items-start mt-10 w-full lg:w-[80%] mx-auto relative z-10">
          <div className="p-5 w-full text-gray-900 m-auto flex flex-col justify-start items-start md:min-h-screen border-r border-white z-10">
            {post ? (
              <div className="w-full flex flex-col">
                <div className="flex items-center mb-2 ">
                  {post.ownerProfileImage ? (
                    <img
                      src={post.ownerProfileImage}
                      alt={post.ownerName}
                      className="w-6 h-6 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500" />
                  )}
                  <p className="text-gray-900 text-sm font-rubik font-light border-b border-yellow-600">
                    {post.PostsOwner || "Unknown User"}
                  </p>
                    </div>
                    <div className="w-full flex justify-between items-center overflow-hidden">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-rubik ml-2 overflow-x-auto"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div
                  className="mb-2 text-lg font-rubik font-bold p-2 text-start w-full"
                  dangerouslySetInnerHTML={{ __html: post.PostsName }}
                />
                <div className="w-full h-[2px] bg-gradient-to-t from-transparent via-slate-700 to-transparent"></div>
                <div
                  className="ql-editor text-gray-900 p-5 overflow-scroll"
                  dangerouslySetInnerHTML={{ __html: post.PostsDescription }}
                />
                <div className="mt-8">
                  <h1 className="text-lg text-gray-900 mb-4">Answers</h1>
                  <ul>
                    {answers.map((ans, index) => (
                      <li key={index} className="text-gray-900">
                        <div className="flex flex-col justify-start items-start gap-2 m-2">
                          <div className="object-cover rounded-full text-sm flex gap-2 justify-center items-center">
                            <img
                              src={ans.userProfile}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <p className="border-b border-yellow-600">
                              {ans.userName}
                            </p>
                          </div>
                          <p className="w-full p-2 text-sm rounded-md whitespace-pre-wrap text-start">
                            {ans.answerText}
                          </p>
                          {ans.fileURL && (
                            <img
                              src={ans.fileURL}
                              alt="Uploaded File"
                              className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentUser && (
                  <div className="md:my-8">
                    <h1 className="text-lg text-gray-900 mb-4">
                      Submit Your Answer
                    </h1>
                    <div className="flex items-start justify-start w-full">
                      <label className="relative inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition duration-300 mb-10">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <span className="text-sm font-medium">Choose File</span>
                      </label>
                      {filePreview && (
                        <div className="ml-4">
                          <img
                            src={filePreview}
                            alt="File Preview"
                            className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows="4"
                      className="w-full bg-transparent p-2 border border-gray-300 rounded-md"
                      placeholder="Write your answer here..."
                      style={{ whiteSpace: "pre-wrap" }} // This ensures spaces and line breaks are preserved
                    />

                    <button
                      onClick={handleAnswerSubmit}
                      disabled={loading} // Disable button when loading
                      className={`w-full mt-4 p-2 ${
                        loading ? "bg-gray-500" : "bg-gray-800"
                      } text-white rounded-md hover:bg-gray-700 transition duration-300`}
                    >
                      {loading ? "Submitting..." : "Submit Answer"}{" "}
                      {/* Show loading state */}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-900">Loading...</div>
            )}
          </div>
          <div className="w-[2px] md:h-screen bg-gray-500"></div>
          <div className="px-5 md:px-0 lg:w-[20%] w-full lg:ml-10 mt-10 lg:mt-0">
            <h1 className="text-lg text-gray-900 mb-4">More Posts</h1>
            <div className="flex flex-col items-start justify-start cursor-pointer">
              {sidebarPosts.map((post) => (
                <div
                  key={post.id}
                  className="mb-5 p-3 border border-gray-300 rounded-md"
                >
                  <h2 className="text-sm font-bold">{post.PostsName}</h2>
                  <p className="text-xs text-gray-700">
                    {post.PostsDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SinglePosts;
