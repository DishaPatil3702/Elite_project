import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/button";
import Switch from "../components/ui/switch";
import Input from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useTheme } from "../context/ThemeContext"; 
import { Loader2 } from "lucide-react";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  });

  // Preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
      console.log("Saved:", {
        profile,
        preferences: {
          darkMode,
          emailNotifications,
          inAppNotifications,
        },
      });
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Profile Settings */}
      <Card className="shadow-md">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Profile</h2>

          <div className="grid gap-4 max-w-md">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="shadow-md">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Preferences</h2>

          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>In-App Notifications</span>
            <Switch
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Section */}
      <Card className="shadow-md">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Integrations</h2>
          <p className="text-gray-500">Coming soon...</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Data Management</h2>
          <p className="text-gray-500">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
