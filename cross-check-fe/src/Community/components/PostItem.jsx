import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/postitem.css'; // 기존 스타일 유지

const PostItem = ({ id, number, title, writer, date, views, likes, comments }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  return (
    <tr
      className="post-item"
      onClick={() => navigate(`/post/${id}`)} // 게시물을 클릭하면 상세 페이지로 이동
      style={{ cursor: 'pointer' }} // 클릭 가능하다는 것을 나타내기 위한 스타일
    >
      <td className="post-item-number">{number}</td>
      <td className="post-item-title">{title}</td>
      <td className="post-item-writer">{writer}</td>
      <td className="post-item-date">{date}</td>
      <td className="post-item-views">{views}</td>
      <td className="post-item-likes">{likes}</td>
      <td className="post-item-comments">{comments}</td>
    </tr>
  );
};

export default PostItem;
