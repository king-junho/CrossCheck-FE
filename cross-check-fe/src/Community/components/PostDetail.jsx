import React, { useState } from "react";
import { Heart, Share } from "lucide-react";
import { useParams } from "react-router-dom";
import "../css/postdetail.css";
import Sidebar from "../../Sidebar/components/Sidebar";

const currentUser = {
      id: 1,
      name: "Me",
};

const posts = [
      {
            id: 1,
            title: "집 계약할 때 무엇을 먼저 봐야하나요?",
            writer: "집돌이",
            date: "2024.11.02",
            views: 112,
            likes: 30,
            content: `계약 전 필수 확인사항

• 등기부등본 확인: 소유권, 근저당권, 가압류 등 권리관계 파악
• 건축물대장 확인: 불법 증축이나 용도변경 여부 확인
• 실제 소유자와 계약자가 동일한지 확인 (신분증 대조)
• 중개사 자격증 및 사무소 등록증 확인

계약서 작성 시 중요사항

• 계약금, 중도금, 잔금 지급 일정과 금액
• 정확한 주소와 면적 (전용면적/공용면적)
• 등기이전 비용 부담 주체
• 각종 관리비, 수도/전기 등 미납금 정산 방법
• 계약 해제 조건과 위약금 규정
• 인도 조건과 시기
• 하자보수 책임 관련 사항`,
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
      const [liked, setLiked] = useState(false);

      if (!post) {
            return <div>해당 게시물을 찾을 수 없습니다.</div>;
      }
      const handleLike = () => {
            if (liked) {
                  setLikes(likes - 1);
            } else {
                  setLikes(likes + 1);
            }
            setLiked(!liked);
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
            <div className="frame">
                  <Sidebar />

                  {/* Title */}
                  <div className="title-container">
                        <h1 className="text-wrapper">{post.title}</h1>
                        <div className="action-buttons">
                              <button onClick={handleLike} className="heart-button">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill={likes > post.likes ? "#FF8FAB" : "none"} stroke="#FF8FAB" strokeWidth="2">
                                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                              </button>
                              <button className="share-button">
                                    <Share size={24} color="#FF8FAB" />
                              </button>
                        </div>
                  </div>

                  {/* Info Bar */}
                  <div className="navbar">
                        <div className="div">작성자: {post.writer}</div>
                        <div className="text-wrapper-4">작성일: {post.date}</div>
                        <div className="text-wrapper-3">조회수: {post.views}</div>
                        <div className="text-wrapper-2">좋아요: {likes}</div>
                  </div>

                  {/* Content Title */}
                  <div className="text-wrapper-6">
                        내용
                  </div>

                  {/* Main Content */}
                  <div className="overlap">
                        <p className="p">
                              {post.content.split('\n').map((line, index) => (
                                    <span key={index} className={line.startsWith('•') ? 'text-wrapper-5' : 'span'}>
                                          {line}
                                          <br />
                                    </span>
                              ))}
                        </p>
                  </div>

                  {/* Comments Section */}
                  <div className="text-wrapper-7">댓글</div>

                  {/* Comments */}
                  <div className="comments-container">
                        {comments.map((comment) => (
                              <div key={comment.id} className="div-2">
                                    <div className="comment-content">
                                          <span className="text-wrapper-10">{comment.user}</span>
                                          <span className="text-wrapper-11"> : {comment.comment}</span>
                                    </div>

                                    <div className="comment-actions">
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

                                    {/* Replies */}
                                    {comment.replies.map((reply) => (
                                          <div key={reply.id} className="div-3">
                                                <div className="comment-content">
                                                      <span className="text-wrapper-10">{reply.user}</span>
                                                      <span className="text-wrapper-11"> : {reply.comment}</span>
                                                </div>
                                                <div className="comment-actions">
                                                      <button
                                                            className="delete-button"
                                                            onClick={() => handleDeleteReply(comment.id, reply.id)}
                                                      >
                                                            삭제
                                                      </button>
                                                </div>
                                          </div>
                                    ))}

                                    {/* Reply Form */}
                                    {replyTo === comment.id && (
                                          <form
                                                className="reply-form"
                                                onSubmit={(e) => handleAddReply(e, comment.id)}
                                          >
                                                <input
                                                      type="text"
                                                      value={replyInput}
                                                      onChange={(e) => setReplyInput(e.target.value)}
                                                      placeholder="답글 작성하기"
                                                />
                                                <button type="submit">답글 추가</button>
                                          </form>
                                    )}
                              </div>
                        ))}
                  </div>

                  {/* Comment Form */}
                  <div className="group">
                        <form onSubmit={handleAddComment} className="comment-form">
                              <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder="댓글 작성하기..."
                                    className="comment-input"
                              />
                              <button type="submit" className="submit-button">
                                    보내기
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default PostDetail;