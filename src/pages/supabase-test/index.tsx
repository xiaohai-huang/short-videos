import supabase from "@api/supabase";
import { useUser } from "@src/contexts/UserContext";
import { useEffect, useId, useRef, useState } from "react";

export default function SupabaseTest() {
  const [user] = useUser();
  const [file, setFile] = useState<File | null>(null);
  const bucketName = "my-test-bucket";
  const [prefix, setPrefix] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [folders, setFolders] = useState<string[]>([]);
  const [folder, setFolder] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputId = useId();
  const [fileDataURL, setFileDataURL] = useState<string>("");

  useEffect(() => {
    (async () => {
      const objs = await supabase.storage.from("my-test-bucket").list();
      const names =
        objs.data
          ?.filter((item) => item.id === null)
          .map((item) => item.name) ?? [];
      setFolders(names);
      setFolder(names[0] ?? "");
    })();
  }, []);

  useEffect(() => {
    let fileReader: FileReader;

    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (!e.target) return;
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    const test = async () => {
      if (folder === "") return;
      const objs = await supabase.storage.from("my-test-bucket").list(folder);

      const urls: string[] = [];
      objs.data?.forEach((item) => {
        const url = supabase.storage
          .from("my-test-bucket")
          .getPublicUrl(folder + "/" + item.name).data.publicUrl;
        urls.push(url);
      });
      setUrls(urls);
    };
    test();
  }, [user, folder, loading]);

  return (
    <div>
      <div style={{ marginTop: "100px" }} />
      <h1>hello {user?.user_name}</h1>
      <p>
        bucketName: <strong style={{ fontWeight: "bold" }}>{bucketName}</strong>
      </p>
      <select onChange={(e) => setFolder(e.target.value)}>
        {folders.map((folder) => (
          <option key={folder}>{folder}</option>
        ))}
      </select>
      <div style={{ marginTop: "100px" }} />

      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return;
            setLoading(true);
            const { data, error } = await supabase.storage
              .from("my-test-bucket")
              .upload(prefix + "/" + file.name, file);
            setLoading(false);
            if (inputRef.current) {
              console.log(inputRef.current);
              inputRef.current.value = "";
            }
            if (!error) {
              setFile(null);
            }
            console.log(data, error);
          }}
        >
          <div>
            <label>
              Prefix:
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor={fileInputId}>
              <div
                style={{
                  width: "70px",
                  height: "80px",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                My image
              </div>

              <input
                ref={inputRef}
                id={fileInputId}
                hidden
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  const f = files ? files[0] : null;
                  setFile(f);
                }}
              />
            </label>
            {fileDataURL ? (
              <div>
                <img src={fileDataURL} />
              </div>
            ) : null}
          </div>

          <button type="submit">
            Upload {file !== null && `to ${bucketName}/${prefix}/${file.name}`}
          </button>
          {loading && <div>loading...</div>}
        </form>
      </div>
      <ol>
        {urls.map((url, i) => (
          <li key={url}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>{i + 1}.</span>
              <img src={url} alt="hh" width={100} height={100} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
