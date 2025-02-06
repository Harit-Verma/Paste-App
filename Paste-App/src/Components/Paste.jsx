import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Paste.css";
import toast from "react-hot-toast";
import { removeFromPastes } from "../redux/Pasteapp";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  }
  return (
    <div className="Paste-main-cont">
      <input
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="paste-list">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="card" key={paste?._id}>
                <div className="Title">{paste.title}</div>
                <div className="Content">{paste.content}</div>
                <div>
                  <button onClick={() => navigate(`/?pasteId=${paste._id}`)}>
                    Edit
                  </button>
                  <button onClick={() => navigate(`/pastes/${paste?._id}`)}>
                    View
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  {/* See documentation for share logic */}
                  <button>Share</button>
                </div>
                <div>Created At:{formatDate(paste.createdAt)}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
