import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/Pasteapp";
import toast from "react-hot-toast";
import "./Home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, pastes]);

  // If pasteId exists, find the paste to pre-fill data
  React.useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find((p) => p._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setValue(existingPaste.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully");
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("pasteId");
    setSearchParams(newParams);

    // Clear input fields after operation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="home-main-div">
      <input
        className="Input"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createPaste} id="Optionbtn">
        {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>

      <div>
        <textarea
          id="text-area"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
