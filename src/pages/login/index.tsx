import supabase from "@api/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={async () => {
          await supabase.auth.signInWithPassword({
            email: "867914890@qq.com",
            password: "xiaohai123",
          });
          navigate(-1);
        }}
      >
        Sign In
      </button>
    </div>
  );
}
