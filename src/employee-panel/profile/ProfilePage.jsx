import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../shared/contexts/AuthContext";
import { formatDate } from "../../shared/utils";
import { patchEmployeeSignature } from "../../shared/services/employeeService";
import {
  getProfile,
  getSignature,
} from "../../shared/services/authenticatedEmployeeService";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { auth } = useAuth();

  useEffect(() => {
    const token = auth?.token || localStorage.getItem("token");
    if (!token) {
      setError("No token found.");
      return;
    }

    getProfile(token)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const fetchSignature = async () => {
      if (profile?.signaturePath && auth?.token) {
        try {
          const blobUrl = await getSignature(auth.token, profile.signaturePath);
          setSignatureUrl(blobUrl);
        } catch (err) {
          console.error("Failed to fetch signature:", err);
        }
      }
    };

    fetchSignature();
  }, [profile, auth]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };
  console.log("rendering profile page");

  const handleUpload = async () => {
    if (!file || !auth?.token || !profile?.id) return;
    setUploading(true);

    try {
      const updatedProfile = await patchEmployeeSignature(
        profile.id,
        file,
        auth.token
      );
      setProfile(updatedProfile);
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (error)
    return (
      <p className="text-red-500 text-center text-lg mt-8 font-semibold">
        Error: {error}
      </p>
    );

  if (!profile)
    return <p className="text-center text-gray-500 mt-8 text-lg">Loading...</p>;

  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          Welcome, {profile.fullName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Phone Number" value={profile.phoneNumber} />
          <ProfileItem label="National ID" value={profile.nationalId} />
          <ProfileItem label="Governorate" value={profile.governorate} />
          <ProfileItem
            label="Birth Date"
            value={formatDate(profile.birthDate)}
          />
          <ProfileItem label="Gender" value={profile.gender} />
          <ProfileItem
            label="Created At"
            value={formatDate(profile.createdAt)}
          />
          <ProfileItem
            label="Updated At"
            value={profile.updatedAt ? formatDate(profile.updatedAt) : "—"}
          />
        </div>

        {signatureUrl && (
          <div className="mt-8">
            <p className="font-semibold text-gray-600 mb-2">Signature:</p>
            <img
              src={signatureUrl ?? URL.createObjectURL(file)}
              alt="User Signature"
              className="w-48 h-auto border rounded-md shadow-md"
            />
          </div>
        )}
      </motion.div>

      {/* Signature Upload Card */}
      <motion.div
        className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          {profile.signaturePath
            ? "Update Your Signature"
            : "Upload Your Signature"}
        </h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current.click()}
          className="flex justify-center items-center h-40 text-gray-500 bg-gray-50 border border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <p className="text-center text-md px-4">
            {profile.signaturePath
              ? "You have already uploaded your signature. Click here to update it."
              : "No signature found. Click here to upload your signature."}
          </p>
        </div>

        {file && (
          <div className="mt-4 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-48 h-auto mx-auto border rounded shadow"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer hover:scale-110"
            >
              {uploading ? "Uploading..." : "Upload Signature"}
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}
