import React from "react";
import "../css/posting.css";
import Sidebar from "../../Sidebar/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Posting = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    alert("등록이 되었습니다."); // 팝업 메시지
    navigate("/Community") // CommunityBoard.jsx로 이동
  };

  return (
    <div className="posting">
      <Sidebar />
      <div className="posting-container">
        <form className="posting-form" onSubmit={handleSubmit}>
          {/* 제목 */}
          <div className="form-group">
            <label htmlFor="title" className="label">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="input"
              placeholder="제목을 입력해주세요"
              required
            />
          </div>
          {/* 내용 */}
          <div className="form-group">
            <label htmlFor="content" className="label">
              내용
            </label>
            <textarea
              id="content"
              className="textarea"
              placeholder="내용을 입력해주세요"
              required
            ></textarea>
          </div>

          <button type="submit" className="posting-submit-button">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Posting;
