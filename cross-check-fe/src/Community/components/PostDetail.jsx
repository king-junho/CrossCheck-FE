import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/postdetail.css";
import Sidebar from "../../Sidebar/components/Sidebar";
const currentUser = {
  id: 1,
  name: "로그인된 사용자",
};

const posts = [
  {
    id: 1,
    title: "집 계약할 때 뭐 먼저 봐야하나요?",
    writer: "집돌이",
    date: "2024.11.02",
    views: 112,
    likes: 30,
    content: "집을 계약할 때는 계약서 내용을 꼼꼼히 확인하세요.",
    comments: [
      {
        id: 1,
        user: "테스트 유저",
        comment: "정말 유용한 정보네요!",
        replies: [
          { id: 1, user: "다른 유저", comment: "저도 그렇게 생각해요!" },
        ],
      },
    ],
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));
  const [likes, setLikes] = useState(post ? post.likes : 0);
  const [comments, setComments] = useState(post ? post.comments : []);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  if (!post) {
    return <div>해당 게시물을 찾을 수 없습니다.</div>;
  }

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      user: currentUser.name,
      comment: commentInput,
      replies: [],
    };
    setComments([...comments, newComment]);
    setCommentInput("");
  };

  const handleAddReply = (e, commentId) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { id: Date.now(), user: currentUser.name, comment: replyInput },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setReplyInput("");
    setReplyTo(null);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== replyId),
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="post-detail-container">
              <Sidebar/>

      <div className="post-content-container">

        <h1>{post.title}</h1>
        <div className="write-user-and-date">
          <p>
            <strong>작성자:</strong> {post.writer}
          </p>
          <p>
            <strong>작성일:</strong> {post.date}
          </p>
        </div>
        <div className="views-and-likes">
          <p>
            <strong>조회수:</strong> {post.views}
          </p>
        </div>
        <div className="post-content">
          <h3>내용</h3>
          <p>{post.content}</p>
        </div>
      </div>

      <div className="comments-and-likes-container">
        <div className="likes-section">
          <p>
            <strong>좋아요:</strong> {likes}{" "}
            <button className="like-button" onClick={handleLike}>
              👍
            </button>
          </p>
        </div>

        <div className="comments-section">
          <h3>댓글</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-content">
                  <strong>{comment.user}:</strong> {comment.comment}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </button>
                  <button
                    className="reply-button"
                    onClick={() => setReplyTo(comment.id)}
                  >
                    답글
                  </button>
                </div>
                <ul className="reply-list">
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <strong>{reply.user}:</strong> {reply.comment}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
                {replyTo === comment.id && (
                  <form
                    className="reply-form"
                    onSubmit={(e) => handleAddReply(e, comment.id)}
                  >

                    <div className="comment-form"></div>
                    <input
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="답글 작성하기"
                    />
                    <button type="submit">답글 추가</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="comment-form" onSubmit={handleAddComment}>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글 작성하기"
        />
        <button type="submit">댓글 추가</button>
      </form>
    </div>
  );
};

export default PostDetail;
