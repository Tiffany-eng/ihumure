# Profile Display Name Fix - UI Solution

## Problem
Dashboard shows "welcome back, Friend" instead of user's actual name because:
1. Profile `display_name` is null or "Friend" 
2. Hardcoded names in SQL are bad practice
3. Need a user-friendly way to update display names

## Solution: Add Profile Edit to Dashboard

### Option 1: Add Profile Edit Button (Recommended)

Add this to the dashboard header:

```tsx
// In Dashboard.tsx header section
<div className="flex items-center gap-3">
  <Link to="/profile">
    <Button variant="outline" size="sm" className="gap-2">
      <User className="w-4 h-4" />
      Edit Profile
    </Button>
  </Link>
  <Link to="/profile">
    <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
</Link>
</div>
```

### Option 2: Add Inline Edit (Quick Fix)

Add an edit button next to the name:

```tsx
// In the welcome header
<h1 className="text-3xl md:text-4xl font-bold text-foreground">
  Welcome back, {profile?.display_name || "Friend"}! 👋
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={() => navigate('/profile')}
    className="ml-2 text-sm"
  >
    Edit Name
  </Button>
</h1>
```

### Option 3: Create Profile Page

Create `/src/pages/Profile.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          setDisplayName(data?.display_name || "");
        });
    }
  }, [user]);

  const updateProfile = async () => {
    if (!user || !displayName.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your display name has been updated.",
      });
    }
    setLoading(false);
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                maxLength={50}
              />
            </div>
            
            <Button 
              onClick={updateProfile}
              disabled={loading || !displayName.trim()}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Recommendation

**Use Option 1** (Inline Edit) for the quickest fix - just add the edit button to dashboard header.

**Use Option 3** (Profile Page) for the best user experience - dedicated profile management page.
