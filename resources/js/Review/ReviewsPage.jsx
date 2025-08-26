import React, { useState } from "react";
import { Calendar, ThumbsUp, MessageSquare, Clock } from "lucide-react";

const ReviewsPage = () => {
  const initialReviews = [
    {
      id: 1,
      name: "Brian",
      avatar: "../girl1.png",
      comment:
        "If several languages coalesce, the grammar of the resulting language.",
      time: "5 hrs ago",
      hasReply: true,
    },
    {
      id: 2,
      name: "Denver",
      avatar: "/girl2.png",
      comment:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge",
      time: "07 Oct, 2019",
      hasReply: true,
    },
    {
      id: 3,
      name: "Henry",
      avatar: "../men.png",
      comment: "Their separate existence is a myth. For science, music, sport, etc.",
      time: "08 Oct, 2019",
      hasReply: true,
    },
    {
      id: 4,
      name: "Neal",
      avatar: "/man2.png",
      comment: "Everyone realizes why a new common language would be desirable.",
      time: "05 Oct, 2019",
      hasReply: true,
    },
  ];

  const [reviews, setReviews] = useState(
    initialReviews.map((r) => ({
      ...r,
      liked: false,
      likes: 0,
      showReplyBox: false,
      replyText: "",
      replies: [],
    }))
  );

  // Like for main review
  const handleLike = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  // Like for reply
  const handleReplyLike = (reviewId, replyId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              replies: r.replies.map((rep) =>
                rep.id === replyId
                  ? {
                      ...rep,
                      liked: !rep.liked,
                      likes: rep.liked ? rep.likes - 1 : rep.likes + 1,
                    }
                  : rep
              ),
            }
          : r
      )
    );
  };

  const toggleReplyBox = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, showReplyBox: !r.showReplyBox } : r
      )
    );
  };

  const handleReplyChange = (id, value) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, replyText: value } : r))
    );
  };

  const submitReply = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              replies: [
                ...r.replies,
                {
                  id: Date.now(),
                  name: "You",
                  avatar: "/default-avatar.png",
                  comment: r.replyText,
                  time: "Just now",
                  liked: false,
                  likes: 0,
                },
              ],
              showReplyBox: false,
              replyText: "",
            }
          : r
      )
    );
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Reviews:</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            {/* Review Content */}
            <div className="flex-grow">
              <div className="mb-2">
                <h3 className="font-medium text-gray-900 mb-1">{review.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Meta Actions */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-blue-500">
                  {review.time.includes("hrs") ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <Calendar className="w-4 h-4" />
                  )}
                  <span className="text-gray-500">{review.time}</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Facebook-style Like Button */}
                  <button
                    onClick={() => handleLike(review.id)}
                    className="flex items-center gap-1 transition-transform duration-200 transform hover:scale-110"
                  >
                    <ThumbsUp
                      className={`w-4 h-4 transition-colors duration-200 ${
                        review.liked ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        review.liked ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      Like {review.likes > 0 && `(${review.likes})`}
                    </span>
                  </button>

                  {review.hasReply && (
                    <button
                      onClick={() => toggleReplyBox(review.id)}
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{review.showReplyBox ? "Cancel" : "Reply"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Reply Box */}
              {review.showReplyBox && (
                <div className="mt-3">
                  <textarea
                    value={review.replyText}
                    onChange={(e) =>
                      handleReplyChange(review.id, e.target.value)
                    }
                    placeholder="Write your reply..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    rows="2"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => submitReply(review.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* Display Replies */}
              {review.replies.length > 0 && (
                <div className="mt-4 space-y-3">
                  {review.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex gap-3 pl-10 border-l border-gray-300"
                    >
                      <img
                        src={reply.avatar}
                        alt={reply.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{reply.name}</h4>
                        <p className="text-gray-600 text-sm">{reply.comment}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                          <span>{reply.time}</span>
                          <button
                            onClick={() => handleReplyLike(review.id, reply.id)}
                            className="flex items-center gap-1 transition-transform duration-200 transform hover:scale-110"
                          >
                            <ThumbsUp
                              className={`w-3 h-3 transition-colors duration-200 ${
                                reply.liked ? "text-blue-600" : "text-gray-500"
                              }`}
                            />
                            <span
                              className={`transition-colors duration-200 ${
                                reply.liked ? "text-blue-600" : "text-gray-700"
                              }`}
                            >
                              Like {reply.likes > 0 && `(${reply.likes})`}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
