import React, { useState, useEffect, useContext, createContext } from "react";
import { type User as SupabaseUser } from "@supabase/supabase-js";

import supabase from "@api/supabase";
import { Database } from "@api/supabase/types";

interface UserContextValue {
  user: (SupabaseUser & Database["public"]["Tables"]["profiles"]["Row"]) | null;
  loading: boolean;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextValue["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const id = data.user?.id;
      const { data: myUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", id)
        .single();
      // @ts-ignore
      setUser({ ...data.user, ...myUser });
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const id = session?.user.id;
        const { data: myUser } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", id)
          .single();
        // @ts-ignore
        setUser({ ...session?.user, ...myUser });

        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, loading } = useContext(UserContext);
  return [user, loading] as const;
};
