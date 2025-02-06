import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/Pasteapp";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div>
      <div className="home-main-div">
        <input
          className="Input"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button onClick={createPaste} id="Optionbtn">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}

        <div>
          <textarea
            id="text-area"
            value={paste.content}
            placeholder="Enter content here"
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
