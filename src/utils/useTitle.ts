import { useEffect } from "react";

export default function useTitle(title: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
