import { useState } from "react";

function Comment({ comments }) {
  const [showAllComments, setShowAllComments] = useState(false);

  return (
    <div className="mt-2">
      {comments
        .slice(0, showAllComments ? comments.length : 1)
        .map((cmt, index) => (
          <p
            key={index}
            className="text-sm text-gray-700 dark:text-gray-300 mt-1"
          >
            <strong>{cmt.username}:</strong> {cmt.content}
          </p>
        ))}

      {comments.length > 1 && !showAllComments && (
        <button
          onClick={() => setShowAllComments(true)}
          className="text-blue-500 text-sm mt-2"
        >
          Show more comments ({comments.length - 1} more)
        </button>
      )}
    </div>
  );
}

export default Comment;
