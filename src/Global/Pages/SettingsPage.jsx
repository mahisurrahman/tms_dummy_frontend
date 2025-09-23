import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Bell,
  Palette,
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReports: true,

    // Appearance Settings
    theme: "dark",
    language: "english",
    fontSize: "medium",

    // Privacy Settings
    profileVisibility: "public",
    showOnlineStatus: true,
    allowMessages: true,

    // Data Settings
    autoBackup: true,
    backupFrequency: "weekly",
    exportData: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  const SettingSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );

  const ToggleSetting = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
      <div>
        <div className="text-white font-medium">{label}</div>
        <div className="text-white/60 text-sm">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const SelectSetting = ({ label, value, options, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
      <div className="text-white font-medium">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-800"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <button
            onClick={saveSettings}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Notification Settings */}
        <SettingSection title="Notifications" icon={Bell}>
          <ToggleSetting
            label="Email Notifications"
            description="Receive updates via email"
            value={settings.emailNotifications}
            onChange={(value) =>
              handleSettingChange("emailNotifications", value)
            }
          />
          <ToggleSetting
            label="Push Notifications"
            description="Get browser notifications"
            value={settings.pushNotifications}
            onChange={(value) =>
              handleSettingChange("pushNotifications", value)
            }
          />
          <ToggleSetting
            label="Task Reminders"
            description="Remind me about upcoming tasks"
            value={settings.taskReminders}
            onChange={(value) => handleSettingChange("taskReminders", value)}
          />
          <ToggleSetting
            label="Weekly Reports"
            description="Send weekly progress reports"
            value={settings.weeklyReports}
            onChange={(value) => handleSettingChange("weeklyReports", value)}
          />
        </SettingSection>

        {/* Appearance Settings */}
        <SettingSection title="Appearance" icon={Palette}>
          <SelectSetting
            label="Theme"
            value={settings.theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "auto", label: "Auto" },
            ]}
            onChange={(value) => handleSettingChange("theme", value)}
          />
          <SelectSetting
            label="Language"
            value={settings.language}
            options={[
              { value: "english", label: "English" },
              { value: "spanish", label: "Spanish" },
              { value: "french", label: "French" },
            ]}
            onChange={(value) => handleSettingChange("language", value)}
          />
          <SelectSetting
            label="Font Size"
            value={settings.fontSize}
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            onChange={(value) => handleSettingChange("fontSize", value)}
          />
        </SettingSection>

        {/* Privacy Settings */}
        <SettingSection title="Privacy" icon={Shield}>
          <SelectSetting
            label="Profile Visibility"
            value={settings.profileVisibility}
            options={[
              { value: "public", label: "Public" },
              { value: "team", label: "Team Only" },
              { value: "private", label: "Private" },
            ]}
            onChange={(value) =>
              handleSettingChange("profileVisibility", value)
            }
          />
          <ToggleSetting
            label="Show Online Status"
            description="Let others see when you're online"
            value={settings.showOnlineStatus}
            onChange={(value) => handleSettingChange("showOnlineStatus", value)}
          />
          <ToggleSetting
            label="Allow Messages"
            description="Allow team members to message you"
            value={settings.allowMessages}
            onChange={(value) => handleSettingChange("allowMessages", value)}
          />
        </SettingSection>

        {/* Data Settings */}
        <SettingSection title="Data & Storage" icon={Database}>
          <ToggleSetting
            label="Auto Backup"
            description="Automatically backup your data"
            value={settings.autoBackup}
            onChange={(value) => handleSettingChange("autoBackup", value)}
          />
          <SelectSetting
            label="Backup Frequency"
            value={settings.backupFrequency}
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
            onChange={(value) => handleSettingChange("backupFrequency", value)}
          />
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-white font-medium">Export Data</div>
              <div className="text-white/60 text-sm">
                Download all your data
              </div>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
              Export
            </button>
          </div>
        </SettingSection>

        {/* Danger Zone */}
        <div className="bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/20 p-6">
          <h2 className="text-xl font-semibold text-red-300 mb-4">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-red-300 font-medium">Delete Account</div>
                <div className="text-red-300/60 text-sm">
                  Permanently delete your account and all data
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
