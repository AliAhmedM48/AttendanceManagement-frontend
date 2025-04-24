import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../shared/contexts/AuthContext";
import { formatDate } from "../../shared/utils";
import { patchEmployeeSignature } from "../../shared/services/employeeService";
import { getProfile } from "../../shared/services/authenticatedEmployeeService";
import { Spinner } from "../../shared/components/Spinner";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { auth } = useAuth();

  console.log("rendering profile page");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(await getProfile(auth?.token));
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [auth?.token]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !auth?.token || !profile?.id) return;
    setUploading(true);

    try {
      const updatedProfile = await patchEmployeeSignature(
        profile.id,
        file,
        auth.token
      );
      setProfile({ ...profile, signaturePath: URL.createObjectURL(file) });
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return <Spinner />;

  return (
    <div className="min-h-full md:bg-gradient-to-br md:from-[#1e165c] md:to-[#3d2c91]  md:rounded-xl md:shadow-lg flex flex-col xl:flex-row justify-center items-center pb-8 xl:pb-0 gap-8 p-4 md:p-6">
      <motion.div
        className="max-w-4xl md:w-fit mx-auto p-8 bg-white rounded-2xl shadow-xl xl:basis-3xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#3d2c91]">
          Welcome, {profile.fullName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="xl:col-span-2">
            <ProfileItem label="Email" value={profile.email} />
          </div>
          <ProfileItem label="Phone Number" value={profile.phoneNumber} />
          <ProfileItem label="National ID" value={profile.nationalId} />
          <ProfileItem label="Governorate" value={profile.governorate} />
          <ProfileItem
            label="Birth Date"
            value={formatDate(profile.birthDate, "dd-yyyy-MM")}
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

        {profile?.signaturePath && (
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-2">Signature:</p>
            <img
              src={
                profile?.signaturePath
                  ? profile?.signaturePath
                  : "https://placehold.co/600x400.png"
              }
              alt="User Signature"
              className="w-48 h-auto border rounded-md shadow-md"
            />
          </div>
        )}
      </motion.div>

      <motion.div
        className="max-w-4xl w-full md:w-fit mx-auto p-8 pt-0 md:pt-8  bg-white rounded-2xl shadow-xl xl:basis-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-[#3d2c91]">
          {profile?.signaturePath
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
            {profile?.signaturePath
              ? "You have already uploaded your signature. Click here to update it."
              : "No signature found. Click here to upload your signature."}
          </p>
        </div>

        {file && (
          <div className="mt-4 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Preview</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-48 h-auto mx-auto border rounded shadow"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-[#3d2c91] text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer hover:scale-110"
            >
              {uploading ? "Uploading..." : "Upload Signature"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className=" w-full overflow-ellipsis">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 ">{value}</p>
    </div>
  );
}
