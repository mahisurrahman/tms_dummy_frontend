import React, { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Mahisur Rahman",
    title: "Junior Frontend Developer",
    email: "mahisur@example.com",
    phone: "+1 (555) 123-4567",
    location: "Dhaka, Bangladesh",
    joinDate: "January 15, 2024",
    bio: "Passionate frontend developer with expertise in React, JavaScript, and modern web technologies. Love creating beautiful and functional user interfaces.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
          >
            {isEditing ? (
              <Save className="w-4 h-4" />
            ) : (
              <Edit3 className="w-4 h-4" />
            )}
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="text-3xl font-bold bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-2 w-full"
                />
              ) : (
                <h2 className="text-3xl font-bold text-white mb-2">
                  {userData.name}
                </h2>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={userData.title}
                  onChange={(e) =>
                    setUserData({ ...userData, title: e.target.value })
                  }
                  className="text-xl text-blue-300 bg-white/20 border border-white/30 rounded-lg px-3 py-1 mb-4 w-full"
                />
              ) : (
                <p className="text-xl text-blue-300 mb-4">{userData.title}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-white/60 text-sm">Total Tasks</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">12</div>
                  <div className="text-white/60 text-sm">Completed</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">8</div>
                  <div className="text-white/60 text-sm">In Progress</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">4</div>
                  <div className="text-white/60 text-sm">Overdue</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">About Me</h3>
            {isEditing ? (
              <textarea
                value={userData.bio}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                rows="3"
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white resize-none"
              />
            ) : (
              <p className="text-white/80 leading-relaxed">{userData.bio}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white"
                  />
                ) : (
                  <span className="text-white/80">{userData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white"
                  />
                ) : (
                  <span className="text-white/80">{userData.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.location}
                    onChange={(e) =>
                      setUserData({ ...userData, location: e.target.value })
                    }
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white"
                  />
                ) : (
                  <span className="text-white/80">{userData.location}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-white/80">
                  Joined {userData.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "JavaScript",
                "TypeScript",
                "HTML/CSS",
                "Tailwind",
                "Node.js",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/20 rounded-full text-white text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
